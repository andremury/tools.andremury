<template>
    <BTabs>
        <BTab title="Content Editor">
            <SRSEditorContent v-model="model" />
        </BTab>
        <BTab title="Requirement Editor" active>
            <SRSEditorRequirement v-model="model" />
        </BTab>
    </BTabs>

</template>

<script setup lang="ts">
import type { SRS } from '~/shared/types';

const model = defineModel<SRS.Specification>({ required: true });

</script>

<style lang="scss" scoped></style>
