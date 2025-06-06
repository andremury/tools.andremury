<template>
  <GymA4Printable :sections="sections" v-if="sections" />
</template>

<script lang="ts" setup>
import type { Table } from '~/shared/types';

const route = useRoute();

const content = route.query.json;

onMounted(() => {
  if (window.history.state.back !== null) {
    alert('You cannot access this page.');
    window.close();
  }
});

const sections = computed(
  () => (JSON.parse(content as string) as [Table[], Table[]]) || [[], []]
);
</script>

<style>
html,
body,
#main {
  width: 21cm;
  height: 29.7cm;
  margin: 0 auto !important;
  padding: 0 !important;
  background-color: white !important;
}
</style>
