<template>
    <div class="">
        <h4>Workout Creator</h4>
        <BButton @click="importJSON">Import JSON</BButton>
        <BButton @click="exportJSON">Export JSON</BButton>

        <BRow>
            <BCol cols="6" v-for="i in [0, 1]">
                <BButton variant="success" @click="addTable(i)" class="my-3">
                    <FaIcon icon="table" /> Nova Seção
                </BButton>
                <section v-for="(table, tblIdx) in tables[i]" :key="tblIdx"
                    class="border rounded p-3 position-relative">
                    <BFormGroup>
                        <BButton variant="link-danger" @click="removeTable(i, tblIdx)"
                            class="my-3 position-absolute trash-btn">
                            <FaIcon icon="trash" />
                        </BButton><br />
                        <legend>{{ table.name || `Section ${tblIdx + 1}` }}</legend>
                        <label>Título</label><br />
                        <BInput type="text" v-model="table.name" />
                        <div v-for="(field, fieldIdx) in table.fields" :key="fieldIdx">
                            <label>name</label><br />
                            <BInput type="text" v-model="field.name" /><br />
                        </div> <br />

                        <BButton variant="success" @click="addField(i, tblIdx)" class="my-3">
                            <FaIcon icon="plus-circle" /> Novo Campo
                        </BButton>
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

const addTable = (idx: number) => {
    console.log(idx);
    if (!tables.value[idx]) return;
    tables.value[idx].push({
        name: `Título`,
        fields: [
            {
                name: `Field 1`,
            },
            {
                name: `Field 2`,
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
        name: `Field ${tables.value[side][idx].fields.length + 1}`,
    });
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
    console.log(JSON.stringify(tables.value));
};
</script>

<style lang="scss" scoped>
.trash-btn {
    right: 1em;
    top: 0;
}
</style>
