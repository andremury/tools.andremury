<template>
<!-- {{ data }} -->
</template>

<script setup lang="ts">
import type { SRS } from '~/shared/types';

defineProps<{
    data: SRS.Specification;
}>();
</script>
