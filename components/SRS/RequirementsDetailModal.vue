<template>
    <BModal id="details-modal" v-model="model" @ok="emit('close')" ok-title="Close" ok-only size="lg">

        <template #header>
            <h3><b>[{{ requirement?.id }}] {{ requirement?.title }}</b></h3>
        </template>

        <SRSRequirement :requirement="requirement" v-if="requirement" />
    </BModal>
</template>

<script setup lang="ts">
import type { SRS } from '~/shared/types';

const model = defineModel({
    default: false
});

defineProps<{
    requirement?: SRS.Requirement;
}>();

const emit = defineEmits<{
    (e: 'close'): void;
}>();
</script>
