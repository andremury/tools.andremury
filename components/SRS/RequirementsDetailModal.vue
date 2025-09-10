<template>
    <BModal 
        id="details-modal" 
        v-model="model" 
        :cancel-title="requirement?.implemented ? 'Mark as undone' : 'Mark as done'" 
        @close="emit('close')"
        @cancel="() => {emit('set-done');emit('close')}"
        @ok="emit('close')"
        @backdrop="emit('close')"
        :ok-only="!requirement?.done"
        size="lg"
    >

        <template #header>
            <h3><b>[{{ requirement?.id }}] {{ requirement?.title }}</b></h3>
        </template>

        <SRSRequirement :requirement="requirement" v-if="requirement" @click-ref="switchRequirement" />
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
    (e: 'switch', key: string): void;
}>();

const switchRequirement = (key: string) =>{
    emit('switch', key);
}

</script>
