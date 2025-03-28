<template>
    <BModal id="details-modal" v-model="model" @ok="emit('close')" ok-title="Close" ok-only>

        <template #header>
            <h3><b>[{{ requirement?.id }}] {{ requirement?.title }}</b></h3>
        </template>

        <div class="description" v-html="requirement?.text"></div>
        {{ requirement?.priority }}<br />
        {{ requirement?.color }}<br />
        {{ requirement?.dependencies }}<br />
        {{ requirement?.entities }}
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
