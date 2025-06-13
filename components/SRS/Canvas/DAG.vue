<template>
  <SRSCanvasItem
    :requirement="item"
    v-for="(item, index) in data"
    :key="item._key"
    @click="emit('click', item)"
    role="button"
    :id="item._key"
    @mouseenter="highlightDeps(item)"
    @mouseleave="removeHighlights"
  />
  <SRSCanvasLinks :requirements="data" :key="data.at(-1)?._key" />
</template>
<script setup lang="ts">
import type { SRS } from '~/shared/types';

const props = defineProps<{
  data: SRS.Requirement[];
}>();

const data = toRef(props.data);

const emit = defineEmits<{
  (e: 'click', data: SRS.Requirement): void;
}>();

const highlightDeps = (item: SRS.Requirement) => {
  if (item.dependencies.length < 1) return;
  const curEl = document.getElementById(item._key);
  if (!curEl) return;

  item.dependencies.forEach((dep) => {
    if (!dep) return;
    const reqEl = document.getElementById(dep._key);
    reqEl?.classList.add('ref-highlight');
  });

  const wrapper = document.getElementById(`req-dep-link-${item._key}`);
  if (!wrapper) return;
  Object.values(wrapper.children).forEach((svg) => {
    if (svg.children[0]) {
      svg.children[0].classList.add('ref-highlight');
    }
  });
};

const removeHighlights = () => {
  if (typeof document === 'undefined') return;
  Object.values(document.getElementsByClassName('ref-highlight')).forEach(
    (el) => {
      el.classList.remove('ref-highlight');
    }
  );
};
</script>
