<template>
  <div
    class="srs-summary user-select-none bg-white text-dark rounded d-flex px-2 gap-3 pointer justify-content-center align-items-center"
    role="button"
    :class="{ open: isOpen }"
    @click="toggle"
  >
    <FaIcon icon="check-circle" class="fa-2x" v-if="!isOpen" />
    <div v-if="isOpen">
      FR Done: {{ functionalDone }}/{{ doc.requirements.functional.length }}
    </div>
    <div v-if="isOpen">
      NF Done: {{ nFunctionalDone }}/{{ doc.requirements.nonFunctional.length }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { SRS } from '~/shared/types';

const props = defineProps<{
  data: SRS.Specification;
}>();

const { data: doc } = toRefs(props);

const { isOpen, toggle } = useDisclosure();

const functionalDone = computed(() =>
  doc.value.requirements.functional.reduce(
    (acc, cur) => (cur.done ? acc + 1 : acc),
    0
  )
);
const nFunctionalDone = computed(() =>
  doc.value.requirements.nonFunctional.reduce(
    (acc, cur) => (cur.done ? acc + 1 : acc),
    0
  )
);
</script>
<style lang="scss" scoped>
.srs-summary {
  z-index: 3;
  width: 50px;
  height: 50px;
  transition: all 200ms;

  &.open {
    width: fit-content;
  }
  transition: all 200ms;
}
</style>
