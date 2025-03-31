<template>
    <BTabs class="mt-5" nav-wrapper-class="d-flex justify-content-center" nav-item-class="px-2">
        <BTab title="Content" active>
            <SRSEditorContent v-model="model" />
        </BTab>
        <BTab title="Functional">
            <SRSEditorRequirement v-model="model" />
        </BTab>
        <BTab title="Non-Functional">
            <SRSEditorRequirement v-model="model" non-functional />
        </BTab>
    </BTabs>

</template>

<script setup lang="ts">
import type { SRS } from '~/shared/types';

const model = defineModel<SRS.Specification>({ required: true });

</script>

<style lang="scss" scoped></style>
