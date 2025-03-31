<template>
    <BTabs>
        <BTab title="Content Editor">
            <SRSEditorContent v-model="model" />
        </BTab>
        <BTab title="Functional Requirements" active>
            <SRSEditorRequirement v-model="model" />
        </BTab>
        <BTab title="Non-Fuctional Requirements" active>
            <SRSEditorRequirement v-model="model" non-functional/>
        </BTab>
    </BTabs>

</template>

<script setup lang="ts">
import type { SRS } from '~/shared/types';

const model = defineModel<SRS.Specification>({ required: true });

</script>

<style lang="scss" scoped></style>
