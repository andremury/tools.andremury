<template>
    <div class="">
        <BButton @click="importJSON">Import JSON</BButton>
        <BButton class="mx-2" @click="exportJSON">Export JSON</BButton>
        <BButton @click="print">Imprimir</BButton>
        <BRow>
            <BCol cols="6" v-for="i in [0, 1]">
                <BButton variant="success" @click="addTable(i)" class="my-3">
                    <FaIcon icon="table" /> Nova Seção
                </BButton>
                <section v-for="(table, tblIdx) in tables[i]" :key="tblIdx"
                    class="border rounded p-3 position-relative">
                    <BFormGroup>
                        <BButton variant="success" @click="addField(i, tblIdx)" class="my-3">
                            <FaIcon icon="plus-circle" /> Novo Campo
                        </BButton>

                        <BButton variant="link-danger" @click="removeTable(i, tblIdx)"
                            class="my-3 position-absolute trash-btn">
                            <FaIcon icon="trash" />
                        </BButton><br />
                        <legend>{{ table.name || `Section ${tblIdx + 1}` }}</legend>
                        <label>Título</label><br />
                        <BInput type="text" v-model="table.name" class="mb-2" />
                        <div v-for="(field, fieldIdx) in table.fields" :key="fieldIdx" class="d-flex">
                            <div class="fields my-1 py-0">
                                <BInput type="text" v-model="field.name" placeholder="Exercício"
                                    @keydown="isLastField(table, fieldIdx) ? nextField($event, i, tblIdx) : null" />
                                <div class="d-flex">
                                    <BInput type="number" placeholder="Séries" v-model="field.sets" />
                                    <BInput type="number" placeholder="Reps" v-model="field.reps" />
                                </div>
                            </div>
                            <div class="d-flex">
                                <BButton class="p-0 m-0" variant="link-danger" @click="removeField(i, tblIdx, fieldIdx)" tabindex="-1">
                                    <FaIcon icon="trash" />
                                </BButton>
                                <BButton class="p-0 m-0" variant="link-danger" @click="moveFieldDown(i, tblIdx, fieldIdx)"
                                    tabindex="-1">
                                    <FaIcon icon="chevron-down" />
                                </BButton>
                                <BButton class="p-0 m-0" variant="link-danger" @click="moveFieldUp(i, tblIdx, fieldIdx)" tabindex="-1">
                                    <FaIcon icon="chevron-up" />
                                </BButton>
                            </div>
                        </div>
                    </BFormGroup>
                </section>
            </BCol>
        </BRow>
    </div>
</template>

<script lang="ts" setup>
import type { Table } from '~/shared/types';

const emit = defineEmits<{
    (e: 'update', table: [Table[], Table[]]): void;
}>();

const tables = ref<[Table[], Table[]]>([[], []]);
watch(tables.value, () => {
    emit('update', tables.value);
});

const isLastField = (table: Table, idx: number) => table?.fields.length - 1 === idx;

const nextField = (event: KeyboardEvent, side: number, idx: number) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
        const target = event.target as HTMLInputElement;
        if (!target) return;

        if (event.key === 'Tab') {
            addField(side, idx);
        }

        target.blur();
        target.select();

    }
};

const addTable = (idx: number) => {
    if (!tables.value[idx]) return;
    tables.value[idx].push({
        name: `Título`,
        fields: [
            {
                name: `Exercício 1`,
            },
            {
                name: `Exercício 2`,
            }
        ],
    });
};

const removeTable = (side: number, idx: number) => {
    if (!tables.value[side]?.[idx]) return;
    tables.value[side].splice(idx, 1);
};

const addField = (side: number, idx: number) => {
    if (!tables.value[side]?.[idx]) return;
    tables.value[side][idx].fields.push({
        name: `Exercício ${tables.value[side][idx].fields.length + 1}`,
    });
};

const removeField = (side: number, idx: number, fieldIdx: number) => {
    if (!tables.value[side]?.[idx]) return;
    tables.value[side][idx].fields.splice(fieldIdx, 1);
};

const moveFieldUp = (side: number, idx: number, fieldIdx: number) => {
    if (!tables.value[side]?.[idx]) return;
    if (fieldIdx === 0) return;
    const tmp = tables.value[side][idx].fields[fieldIdx];
    tables.value[side][idx].fields[fieldIdx] = tables.value[side][idx].fields[fieldIdx - 1];
    tables.value[side][idx].fields[fieldIdx - 1] = tmp;
};

const moveFieldDown = (side: number, idx: number, fieldIdx: number) => {
    if (!tables.value[side]?.[idx]) return;
    if (fieldIdx === tables.value[side][idx].fields.length - 1) return;
    const tmp = tables.value[side][idx].fields[fieldIdx];
    tables.value[side][idx].fields[fieldIdx] = tables.value[side][idx].fields[fieldIdx + 1];
    tables.value[side][idx].fields[fieldIdx + 1] = tmp;
};

const print = () => {
    const sheetPage = window.open(`/gym-sheet?json=${encodeURIComponent(JSON.stringify(tables.value))}`, '', 'height=1123,width=793');
    if (sheetPage) {
        sheetPage.focus();
        sheetPage.onload = () => {
            sheetPage.print();
            sheetPage.onafterprint = () => {
                sheetPage.close();
            };
        };
    }

};
const importJSON = () => {
    const json = prompt('Paste JSON here');
    if (!json) return;
    try {
        tables.value = JSON.parse(json);
        emit('update', tables.value);
    } catch (err) {
        alert('Invalid JSON');
    }
};

const exportJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(tables.value));
    alert('JSON copied to clipboard');
};
</script>

<style lang="scss" scoped>
.trash-btn {
    right: 1em;
    top: 0;
}

input {
    border-radius: 0;
}
</style>
