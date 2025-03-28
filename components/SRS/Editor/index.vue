<template>
    <BTabs>
        <BTab title="Content Editor">
            <SRSEditorContent v-model="model" />
        </BTab>
        <BTab title="Requirement Editor">
            Requirement Editor
        </BTab>

    </BTabs>

</template>

<script setup lang="ts">
import type { SRS } from '~/shared/types';

const model = defineModel<SRS.Specification>();

</script>

<style lang="scss" scoped>

</style>
