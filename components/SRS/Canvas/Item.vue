<template>
  <div
    class="srs-rf canvas-item rounded border shadow-sm p-3 d-flex flex-column align-items-center justify-content-center pointer position-relative"
    :class="[textColor]"
    :style="{
      backgroundColor: requirement.color || 'blanchedalmond',
    }"
  >
    <div class="icon-completed position-absolute text-dark" v-if="requirement.done">
      <FaIcon icon="align-left" />
    </div>
    <div 
      class="icon-implemented position-absolute"  
      v-if="requirement.done"
    >
      <FaIcon icon="check-circle" :class=" requirement.implemented ? 'text-success' : 'text-secondary'" />
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
    left: 2px;
    top: -2px;
}
.icon-implemented {
    right: 2px;
    top: -2px;
}
</style>
