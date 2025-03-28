<template>
    <div class="srs-requirement-editor position-relative">
        <h2>Functional Requirements</h2>
        <BRow>
            <TransitionGroup name="fade" v-if="model && model?.requirements.functional.length > 0">
                <BCol cols="12" lg="6" v-for="(requirement, index) in model?.requirements.functional"
                    :key="requirement._key">
                    <div class="py-2">
                        <div class="d-flex justify-content-between align-content-center gap-4">
                            <label for="key" class="w-100">[{{ requirement.id }}]
                                <input :name="requirement.id" v-model="requirement.title" :placeholder="'Keep Users'"
                                    class="req-input w-100 bg-transparent text-white" />
                            </label>
                            <div class="color-btn text-danger">
                                <input class="req-color-input pointer" type="color" v-model="requirement.color" :style="{
                                    backgroundColor: requirement.color
                                }" />
                            </div>
                            <div class="remove-one-btn text-danger">
                                <FaIcon icon="minus-circle" class="" role="button"
                                    @click="splice('functional', index)" />
                            </div>
                        </div>
                        <!-- Description Box -->
                        <div class="req-description my-2">
                            <QuillEditor v-model:content="requirement.text" theme="bubble" content-type="html" />
                        </div>
                        <div class="data-table"></div>
                        <!-- Dependencies Management -->
                        <div class="deps border p-3">
                            <h5 role="button" class="pointer user-select-none"
                                v-b-toggle="`collapse-${requirement._key}`">Dependencies</h5>
                            <BCollapse :id="`collapse-${requirement._key}`">
                                <div class="dep d-flex justify-content-between align-items-center gap-4"
                                    v-for="(dep, idx) in requirement.dependencies">
                                    <select class="form-select req-description mb-2 text-white" required
                                        v-model="requirement.dependencies[idx]">
                                        <option class="text-dark" :value="null" selected disabled>Select</option>
                                        <option class="text-dark"
                                            v-for="option in dependencies.functional.filter(opt => opt._key !== requirement._key)"
                                            :value="option"
                                            :disabled="!!requirement.dependencies.find(d => option._key === d?._key) || willCircularDepend(option, requirement)">
                                            [{{ option.id }}] {{ option.title }} {{ willCircularDepend(option,
                                                requirement) ? '(circular)' : '' }}
                                        </option>
                                    </select>
                                    <div class="remove-one-btn text-danger">
                                        <FaIcon icon="minus-circle" class="" role="button"
                                            @click="requirement.dependencies.splice(idx, 1)" />
                                    </div>
                                </div>
                                <div class="add-one-btn text-warning text-center gap-2 py-2 mt-3 bor" v-if="
                                    model.requirements.functional.length > 1
                                    && requirement.dependencies.length < model.requirements.functional.length - 1">
                                    <FaIcon icon="plus-circle" class="pointer  fa-2x" role="button"
                                        @click="requirement.dependencies.push(null)" />
                                </div>
                                <span class="text-secondary" v-else>Not enough requirements to add more deps, add at
                                    least one more.</span>
                            </BCollapse>
                        </div>
                    </div>
                </BCol>
            </TransitionGroup>
            <BCol cols="12" v-else>
                No requirements added yet. Click "+" button to create your first one.
            </BCol>
            <BCol cols="12">
                <div class="add-one-btn text-success fa-3x text-center">
                    <FaIcon icon="plus-circle" class="pointer" role="button" @click="pushRequirement('functional')" />
                </div>
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
    const { functional, nonFunctional } = model.value.requirements;
    return {
        functional, nonFunctional
    };
});

const willCircularDepend = (from: SRS.Requirement, to: SRS.Requirement) => {
    return !!from.dependencies.find(d => d?.id === to.id);
};

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
        color: "#FFFFFF"
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
.add-one-btn {
    svg {
        transition: all 200ms;
    }

    svg:hover {
        filter: brightness(1.2);
        transform: rotateZ(90deg)
    }
}

.req-color-input {
    height: 20px;
    width: 20px;
    border: none;
}

.req-input {
    z-index: 1;
    border: none;
    border-bottom: 1px dashed grey;
    transition: all 200ms;

    &:hover {
        background-color: rgba(255, 255, 255, 0.125) !important;
    }

}

select>option {
    &:disabled {
        color: grey !important
    }
}

.req-description {
    background-color: rgba(255, 255, 255, 0.125);
}
</style>
