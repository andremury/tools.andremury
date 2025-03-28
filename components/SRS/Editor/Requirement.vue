<template>
    <div class="srs-requirement-editor position-relative">
        <BRow>
            <BCol cols="6">
                <h2>Functional Requirements</h2>
                <div class=""></div>
                <TransitionGroup name="fade" v-if="model && model?.requirements.functional.length > 0">
                    <div class="py-2" v-for="(requirement, index) in model?.requirements.functional"
                        :key="requirement._key">
                        <div class="d-flex justify-content-between">
                            <label for="key" class="w-100">[{{ requirement.id }}]
                                <input :name="requirement.id" v-model="requirement.title" :placeholder="'Keep Users'"
                                    class="req-editor w-50 bg-transparent text-white" />
                            </label>
                            <div class="remove-one-btn">
                                <FaIcon icon="minus-circle" class="" role="button"
                                    @click="splice('functional', index)" />
                            </div>
                        </div>
                        <div class="deps">
                            <div class="dep" v-for="(dep, idx) in requirement.dependencies">
                                <select required v-model="requirement.dependencies[idx]">
                                    <option :value="''" selected disabled>Select</option>
                                    <option v-for="option in dependencies.functional.filter(i => i !== requirement.id)">
                                        {{ option }}
                                    </option>
                                </select>
                            </div>
                            <div class="add-one-btn text-warning pl-4 fa-2x"
                                v-if="model.requirements.functional.length > 1">
                                <FaIcon icon="plus-circle" class="pointer" role="button"
                                    @click="requirement.dependencies.push('')" />
                            </div>
                        </div>
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

const dependencies = computed(() => {
    const functional = model.value.requirements.functional.map(i => i.id);
    const nonFunctional = model.value.requirements.nonFunctional.map(i => i.id);

    return {
        functional, nonFunctional
    } as Record<ReqType, string[]>;
});

function randomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    return `rgb(${red}, ${green}, ${blue})`;
}

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
        _key: "key-" + Math.random() * 99999,
        color: randomColor()
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
    z-index: 1;
    border: none;
    border-bottom: 1px dashed grey;
    transition: all 200ms;

    &:hover {
        background-color: rgba(255, 255, 255, 0.125) !important;
    }
}
</style>
