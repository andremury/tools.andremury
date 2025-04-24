<template>
  <div class="srs-summary bg-white text-dark p-3 rounded d-flex gap-3">
    <div>
      FR Done: {{ functionalDone }}/{{ doc.requirements.functional.length }}
    </div>
    <div>
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
  position: fixed;
  z-index: 3;
  width: fit-content;
  right: 80px;
  bottom: 20px;
  transition: all 200ms;
}
</style>
