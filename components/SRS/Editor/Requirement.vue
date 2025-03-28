<template>
    <div class="srs-requirement-editor">
        <BRow>
            <BCol cols="12">
                <h2>Functional Requirements</h2>
                <div class=""></div>
                <TransitionGroup name="fade" v-if="model && model?.requirements.functional.length > 0">
                    <div class="py-2" v-for="(requirement, index) in model?.requirements.functional"
                        :key="requirement._key">
                        <label for="key" class="w-100">[{{ requirement.id }}]
                            <input :name="requirement.id" v-model="requirement.title" :placeholder="'Keep Users'"
                                class="req-editor w-50 bg-transparent text-white" />
                            <div class="remove-one-btn">
                                <FaIcon icon="minus-circle" class="" role="button"
                                    @click="splice('functional', index)" />
                            </div>
                        </label>
                    </div>
                </TransitionGroup>
                <div v-else>
                    No requirements added yet. Click "+" button to create your first one.
                </div>
                <div class="add-one-btn text-success fa-2x">
                    <FaIcon icon="plus-circle" class="pointer" role="button" @click="pushRequirement('functional')" />
                </div>
            </BCol>
            <BCol cols="12">
                <h2> Non-Functional Requirements</h2>
            </BCol>
        </BRow>
    </div>
</template>
<script setup lang="ts">

import type { SRS } from '~/shared/types';

const model = defineModel<SRS.Specification>({
    required: true
});
type ReqType = keyof SRS.Specification['requirements'];

const getId = (type: ReqType, index?: number) => {
    const len = index || (model.value.requirements[type].length + 1);
    const reqId = `${type === 'functional' ? 'FR' : 'NF'}${(len).toString().padStart(3, '0')}`;
    return { len, id: reqId };
};

const pushRequirement = (type: ReqType) => {
    const { len, id } = getId(type);
    model.value.requirements[type].push({
        id,
        dependencies: [],
        priority: 'Important',
        text: 'Requirement Description',
        title: 'My Requirement ' + len,
        entities: [],
        _key: "key-" + Math.random() * 99999
    });
};

const resetIds = (type: ReqType, requirements: SRS.Requirement[]) => {
    console.log(requirements);
    return requirements.map((item, index) => {
        const { id } = getId(type, index + 1);
        item.id = id;
        return item;
    });
};

const splice = (type: ReqType, index: number) => {
    model.value.requirements[type] = resetIds(type, model.value.requirements[type].filter((_, idx) => idx !== index));
}

</script>
<style lang="scss" scoped>
.req-editor {
    border: none;
    border-bottom: 1px dashed grey;
    transition: all 200ms;

    &:hover {
        background-color: rgba(255, 255, 255, 0.125) !important;
    }
}
</style>
