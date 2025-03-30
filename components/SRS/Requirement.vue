<template>
    <div class="doc-requirement w-100" :id="`doc-${requirement._key}`">
        <div class="title border text-center bg-primary text-white"><b>[{{ requirement.id }}] {{ requirement.title }}</b>
        </div>
        <div class="actors mt-3" v-if="requirement.actors || true">
            Actors: {{ requirement.actors }}
        </div>
        <div class="description mt-3 pt-3 border-top" v-html="requirement.text"></div>
        <div class="dependencies d-flex gap-2 flex-wrap" v-if="requirement.dependencies.filter(Boolean).length > 0">
            Depends on: <br />
            <span v-for="dep in requirement.dependencies" :key="dep?._key">
                <a :href="`#doc-${dep?._key}`">{{
                    dep?.id }}
                </a>
            </span>
        </div>
        <div class="entities" v-if="requirement.entities">
            <div class="entity" v-for="(entity, index) in requirement.entities" :key="+index">
                <h6>{{ entity?.name }}</h6>
                <div v-html="entity.description"></div>

                <BTable :fields="entityFields" :items="entity.fields" v-if="entity?.fields.length" />
            </div>
        </div>
        <div class="priority">
            <p class="text-center">Priority:</p>
            <div class="d-flex gap-4 justify-content-center">
                <div class="border rounded py-2 px-3 d-md-block"
                    :class="[requirement.priority === 'Essential' ? 'bg-success text-white d-block' : 'd-none']">
                    Essential</div>
                <div class="border rounded py-2 px-3 d-md-block"
                    :class="[requirement.priority === 'Important' ? 'bg-success text-white d-block' : 'd-none']">
                    Important</div>
                <div class="border rounded py-2 px-3 d-md-block"
                    :class="[requirement.priority === 'Desirable' ? 'bg-success text-white d-block' : 'd-none']">
                    Desirable</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { TableField } from 'bootstrap-vue-next';
import startCase from 'lodash.startcase';
import type { SRS } from '~/shared/types';

defineProps<{
    requirement: SRS.Requirement
}>()

const entityFields: TableField<SRS.FieldSpec>[] = [
    {
        key: 'name',
        formatter: (_1, _2, item) => `${item.required ? '*' : ''}${startCase(item.name)}`
    },
    {
        key: 'description'
    },
    {
        key: 'type'
    },

]
</script>