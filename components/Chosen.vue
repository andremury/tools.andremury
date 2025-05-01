<template>
  <div class="chosen-select user-select-none position-relative w-100 pb-1">
    <div
      class="selected-value px-3 border pointer"
      role="button"
      @click="toggle"
      @mouseenter="emit('mouseenter')"
    >
      {{ initialValue?.label || selected?.label || 'Select an option' }}
    </div>
    <Transition mode="out-in" name="fade">
      <div
        class="chosen-options bg-light-glass shadow-sm position-absolute p-3 border d-flex flex-column gap-1"
        v-if="isOpen"
      >
        <BInputGroup>
          <BInputGroupText>Filter</BInputGroupText>
          <BFormInput v-model="search"></BFormInput>
        </BInputGroup>
        {{ selected?.label }}
        <div
          class="chosen-option px-3 border pointer"
          v-for="(option, idx) in filteredOptions"
          :key="option.key"
          v-if="options.length > 0"
          :class="{ disabled: option.disabled || selected?.key === option.key }"
          @click="!option.disabled && select(idx, option)"
          @mouseover="emit('hover', idx, option)"
        >
          {{ option.label }}
        </div>
        <div v-else class="text-center mt-4 py-2">
          <span class="text-muted">
            <small>Nothing to show.</small>
          </span>
        </div>
      </div>
    </Transition>
  </div>
</template>
<script setup lang="ts">
import type { ChosenOption } from '~/shared/types';

const { isOpen, toggle, onClose } = useDisclosure();

const emit = defineEmits<{
  (e: 'select', optionIdx: number, data: ChosenOption): void;
  (e: 'clear', data: ChosenOption): void;
  (e: 'hover', optionIdx: number, data: ChosenOption): void;
  (e: 'mouseenter'): void;
}>();

const props = defineProps<{
  options: ChosenOption[];
  initialValue?: ChosenOption;
}>();

const model = defineModel({
  required: false,
});
const selected = ref<ChosenOption | undefined>(props.initialValue);
const search = ref<string>('');

const filteredOptions = computed(() =>
  search.value.length > 0
    ? props.options.filter((o) =>
        o.label.toLowerCase().includes(search.value.toLowerCase())
      )
    : props.options
);

const select = (idx: number, option: ChosenOption) => {
  selected.value = option;
  emit('select', idx, option);
  if (model?.value) {
    model.value = option.value;
  }
  toggle();
};
</script>

<style lang="scss" scoped>
.chosen-select {
  .chosen-options {
    overflow-y: auto;
    min-height: 10rem;
    height: fit-content;
    width: fit-content;
    max-width: 20rem;
    max-height: 25rem;
    z-index: 9999;
  }

  .chosen-option {
    transition: all 200ms;

    &.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &:hover {
      &:not(.disabled) {
        filter: opacity(0.6);
      }
    }
  }
}
</style>
