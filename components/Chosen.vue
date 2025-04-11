<template>
    <div class="chosen-select user-select-none position-relative w-100 pb-1">
        <div class="selected-value px-3 border pointer" role="button" @click="toggle">
            {{ initialValue?.label || selected?.label || 'Select an option' }}
        </div>
        <Transition mode="out-in" name="fade">
            <div class="chosen-options bg-light-glass shadow-sm position-absolute p-3 border d-flex flex-column gap-1"
                v-if="isOpen">
                <BInputGroup>
                    <BInputGroupText>Filter</BInputGroupText>
                    <BFormInput v-model="search"></BFormInput>
                </BInputGroup>
                <div class="chosen-option px-3 border pointer" v-for="(option, idx) in filteredOptions"
                    :key="option.key" v-if="filteredOptions.length > 0" :class="{ disabled: option.disabled }"
                    @click="!option.disabled && select(idx, option)">
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
}>();

const { options } = defineProps<{
    options: ChosenOption[];
    initialValue?: ChosenOption;
}>();

const model = defineModel({
    required: true
});

const selected = ref<ChosenOption>();
const search = ref<string>('');

const filteredOptions = computed(() => search.value != '' ? options.filter(o => o.label.toLowerCase().includes(search.value.toLowerCase())) : options);

const select = (idx: number, option: ChosenOption) => {
    selected.value = option;
    emit('select', idx, option);
    model.value = option.value;
    toggle();
};

</script>

<style lang="scss" scoped>
.chosen-select {
    .selected-value {}

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
