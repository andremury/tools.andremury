<template>
    <!-- Entities Management -->
    <div class="deps border p-3 my-2">
        <h5 role="button" class="pointer user-select-none" v-b-toggle="`collapse-entity-${requirement._key}`">Entities
        </h5>
        <BCollapse :id="`collapse-entity-${requirement._key}`">
            <div class="entities-form-wrap">
                <div class="entity-form d-flex flex-column w-100" v-for="(entity, index) in requirement.entities"
                    :key="index + 1">
                    <div class="w-100 d-flex justify-content-between">
                        <input class="req-input w-75 bg-transparent text-white" v-model="entity.name"
                            placeholder="Entity Name" />
                        <div class="remove-one-btn text-danger">
                            <FaIcon icon="minus-circle" class="" role="button"
                                @click="requirement.entities.splice(index, 1)" />
                        </div>
                    </div>

                    <div class="req-description my-2">
                        <QuillEditor v-model:content="entity.description" theme="bubble" content-type="html" />
                    </div>

                    <div class="fields-wrap border p-2 d-flex flex-column gap-3">
                        Entity Fields
                        <div class="field" v-for="(field, fIdx) in entity.fields" :key="fIdx">
                            <div class="d-flex flex-column justify-content-between">
                                <div class="d-flex justify-content-between">
                                    <BFormCheckbox type="checkbox" class="pointer bg-transparent text-white"
                                        name="field-required" v-model="field.required" placeholder="Field type">
                                        Required Field
                                    </BFormCheckbox>
                                    <div class="remove-one-btn text-danger text-center mt-2">
                                        <FaIcon icon="minus-circle" class="" role="button"
                                            @click="entity.fields.splice(fIdx, 1)" />
                                    </div>
                                </div>
                                <input class="req-input bg-transparent text-white" name="field-name"
                                    v-model="field.name" placeholder="Field Name" />
                                <input class="req-input bg-transparent text-white" name="field-description"
                                    v-model="field.description" placeholder="Field description" />
                                <input class="req-input bg-transparent text-white" name="field-type"
                                    v-model="field.type" placeholder="Field type" />
                            </div>
                        </div>
                        <div class="add-one-btn text-primary text-center gap-2 py-2 mt-3 bor">
                            <FaIcon icon="plus-circle" class="pointer" role="button"
                                @click="pushField(entity.fields)" />

                        </div>
                    </div>
                </div>
            </div>
            <div class="add-one-btn text-warning text-center gap-2 py-2 mt-3 bor">
                <FaIcon icon="plus-circle" class="pointer  fa-2x" role="button"
                    @click="pushEntity(requirement.entities)" />

            </div>
        </BCollapse>
    </div>
    <!-- END Entities Management -->
</template>

<script setup lang="ts">
import type { SRS } from '~/shared/types';

const { requirement } = defineProps<{
    requirement: SRS.Requirement
}>()

const pushField = (fields: SRS.FieldSpec[]) => {
    fields.push({
        description: '',
        name: '',
        required: false,
        type: '',
        id: Math.floor(Math.random() * 9999)
    })
}

const pushEntity = (entities: SRS.Entity[]) => {
    entities.push({
        fields: [],
        name: 'Entity Name',
        description: 'Entity description'
    })
}

</script>