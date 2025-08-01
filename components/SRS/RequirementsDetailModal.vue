<template>
    <BModal 
        id="details-modal" 
        v-model="model" 
        :ok-title="requirement?.implemented ? 'Mark as undone' : 'Mark as done'" 
        @ok="() => {emit('set-done');emit('close')}"
        @close="emit('close')"
        @backdrop="emit('close')"
        size="lg"
    >

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

const props = defineProps<{
    requirement?: SRS.Requirement;
}>();


const emit = defineEmits<{
    (e: 'close'): void;
    (e: 'set-done'): void;
}>();
</script>
