<template>
  <div>
    <BRow class="row-gap-5">
      <BCol
        cols="12"
        v-for="(tree, idx) in trees"
        class="d-flex flex-row gap-3 mb-5"
      >
        <div class="h-100 d-flex align-items-center" style="width: max-content">
          TREE {{ idx + 1 }} ->
          <!-- <FaIcon
            :icon="isOpen(idx) ? 'chevron-left' : 'chevron-right'"
            role="button"
            @click="toggle(idx)"
          /> -->
        </div>
        <SRSCanvasDAG :data="tree" @click="emit('click', $event)" hide-links />
      </BCol>
    </BRow>
  </div>
</template>
<script setup lang="ts">
import type { SRS } from '~/shared/types';
import { getIndependentTrees } from '~/shared/srs/getPrecedenceTrees';

const props = defineProps<{
  data: SRS.Requirement[];
}>();

// const openedTrees = ref(new Map<number, boolean>());

// const isOpen = (idx: number) => openedTrees.value.get(idx) ?? true;

// const toggle = (idx: number) => {
//   console.log(idx, isOpen(idx));
//   openedTrees.value.set(idx, !isOpen(idx));
// };

const trees = computed(() => getIndependentTrees(props.data));

const emit = defineEmits<{
  (e: 'click', data: SRS.Requirement): void;
}>();
</script>
