<template>
    <div class="a4 text-black" ref="a4Ref">
        <span class="text-muted text-uppercase">Nome:
            ____________________________________________________________________________________________________________________________________________</span>
        <BRow>
            <BCol v-for="(col, idx) in sections" :key="idx">
                <BRow no-gutters>
                    <BCol v-for="(section, sidx) in col" :key="sidx" cols="12"
                        class="border border-dark rounded section overflow-hidden">
                        <div class="d-flex justify-content-start px-3 py-1 border-bottom border-dark">
                            <div class="box border border-dark px-4 py-2"></div>
                            <div class="h5 ml-3 my-0"><b>{{ section.name }}</b></div>
                        </div>
                        <BTable :items="section.fields" :fields="fields" class="tbl" tbody-tr-class="tbl-row"
                            border-variant="dark" thead-class="tbl-row text-center" />
                    </BCol>
                </BRow>
            </BCol>
        </BRow>
        <section class="recommendations border border-dark rounded">
            <legend>Recomendações</legend>
        </section>
    </div>
</template>

<script lang="ts" setup>
import type { Table } from '~/shared/types';

const a4Ref = ref<HTMLDivElement>();

const fields = [
    '#',
    { key: 'name', label: 'Exercício' },
    { key: 'sets', label: 'Séries' },
    { key: 'reps', label: 'Reps.' },
    'Carga',
];

const { sections } = defineProps<{
    sections: [Table[], Table[]];
    cols?: number;
}>();

</script>

<style scoped lang="scss">
.section {
    margin: 2px 0;
}

.a4 {
    >span {
        font-size: 0.7em;
    }

    position: relative;
    // transform: scale(1) translateY(-10%);
    background-color: white;
    width: 21cm;
    height: 29.7cm;
    padding: 1em 1.5em;
    box-shadow: 0 0 0.3em 0.1em rgba(255, 255, 255, 0.5);
}

.recommendations {
    legend {
        font-size: 0.8em;
        font-weight: bold;
        position: absolute;
        background-color: white;
        top: -15px;
        left: 10px;
        width: fit-content;
    }

    height: 62px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    // make lines in the background like a notebook
    background-color: white;
    z-index: 2;
    opacity: 0.8;
    background-size: 20px 16px;
    background-image: repeating-linear-gradient(0deg, #000000, #000000 1px, rgba(0, 0, 255, 0) 1px, #e5e5f700);
    margin: 1em 1.5em;
}


.tbl {
    font-size: 0.7em;

    th {
        font-size: 0.9em;
    }

    margin-bottom: 0;
}
</style>

<style lang="scss">
.tbl-row {
    &:last-child {
        border: transparent;
    }

    td,
    th {
        font-weight: bold;
        &:nth-child(1) {
            padding: 0 15px;
        }

        &:nth-child(2) {
            width: 60%;
        }

        padding: 1px 5px;

        &:not(:first-child) {
            border-left: 1px solid black !important
        }

        &:last-child {
            border-right: none
        }
    }
}
</style>
