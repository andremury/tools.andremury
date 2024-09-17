<template>
    <div class="a4 text-black" ref="a4Ref">
        <BRow>
            <BCol v-for="(col, idx) in sections" :key="idx">
                <BRow no-gutters>
                    <BCol v-for="(section, sidx) in col" :key="sidx" cols="12" class="border rounded section my-1">
                        <div class="d-flex justify-content-start px-3 py-2 border-bottom">
                            <div class="box border px-4 py-2"></div>
                            <div class="h4 ml-3 my-0">{{ section.name }}</div>
                        </div>
                        <BTable :items="section.fields" :fields="fields" class="tbl" />
                    </BCol>
                </BRow>
            </BCol>
        </BRow>
    </div>
</template>

<script lang="ts" setup>
import { chunkify } from '~/shared/chunkify';
import type { Table } from '~/shared/types';

const a4Ref = ref<HTMLDivElement>();

const fields = [
    'Ordem',
    { key: 'name', label: 'Exercício' },
    'Séries',
    'Reps.',
    'Carga',
];

const { sections } = defineProps<{
    sections: [Table[], Table[]];
    cols?: number;
}>();

</script>

<style scoped lang="scss">
.a4 {
    position: relative;
    transform: scale(0.8) translateY(-10%);
    background-color: white;
    width: 21cm;
    height: 29.7cm;
    padding: 1em 2em;
    box-shadow: 0 0 0.3em 0.1em rgba(255, 255, 255, 0.5);
    margin: 1em;
}

.tbl {
    font-size: 0.9em;

    th {
        font-size: 0.9em;
    }
    tr td {
        border-width: 1px  !important;
    }
}
</style>
