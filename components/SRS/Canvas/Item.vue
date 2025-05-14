<template>
  <div
    class="srs-rf canvas-item rounded border shadow-sm p-3 d-flex flex-column align-items-center justify-content-center pointer position-relative"
    :class="[textColor]"
    :style="{
      backgroundColor: requirement.color || 'blanchedalmond',
    }"
  >
    <div class="icon-completed position-absolute text-success" v-if="requirement.done">
      <FaIcon icon="check-circle" />
    </div>
    <div class="rf-content text-center">
      <p>
        <small>[{{ requirement.id }}]</small><br /><b>
          {{ requirement.title }}</b
        >
      </p>
      <small v-if="requirement.dependencies.length">
        <{{
          requirement.dependencies
            .filter((d) => d)
            .map((d) => d?.id)
            .join(', ')
        }}>
      </small>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Colors } from '~/shared/colors';
import type { SRS } from '~/shared/types';

const { requirement } = defineProps<{
  requirement: SRS.Requirement;
}>();

const textColor = computed(() =>
  Colors.isDarkColor(Colors.hexToRgb(requirement.color || '#ffffff'))
    ? 'text-white'
    : 'text-dark'
);
</script>

<style lang="css" scoped>
.icon-completed {
    right: 1px;
    top: -4px;
}
</style>
