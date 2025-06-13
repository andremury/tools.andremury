<template>
  <div>
    <BRow class="row-gap-5">
      <BCol cols="12" v-for="tree in trees" class="d-flex flex-row gap-3 mb-5">
        <SRSCanvasDAG :data="tree" @click="emit('click', $event)" />
      </BCol>
    </BRow>
  </div>
</template>
<script setup lang="ts">
import type { SRS } from '~/shared/types';
import { getLayeredDevelopmentPlan } from '~/shared/srs/getLayeredDevelopmentPlan';

const props = defineProps<{
  data: SRS.Requirement[];
}>();

const trees = computed(() => getLayeredDevelopmentPlan(props.data));

const emit = defineEmits<{
  (e: 'click', data: SRS.Requirement): void;
}>();
</script>
