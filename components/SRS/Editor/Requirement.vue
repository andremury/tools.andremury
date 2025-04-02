<template>
    <div class="srs-requirement-editor position-relative">
        <h2 class="my-3 text-center"><span v-if="nonFunctional">Non-</span>Functional Requirements</h2>
        <p class="text-secondary text-center" v-if="nonFunctional">💡 Non-Functional Requirements define how your system should work – like performance,
            security, or usability.</p>
        <p class="text-secondary text-center" v-else>💡 Functional Requirements define what your system needs to accomplish -  like CRUDs, forms, tasks, and so on.</p>
        <BRow class="bg-dark p-3">
            <TransitionGroup name="fade" v-if="model && requirements.length > 0">
                <BCol cols="12" lg="6" v-for="(requirement, index) in requirements" :key="requirement._key">
                    <div class="py-2">
                        <!-- Description -->
                        <SRSEditorDescription :requirement="requirement" @delete="splice('functional', index)" />
                        <!-- Dependencies -->
                        <SRSEditorDependencies v-if="!nonFunctional" :requirement="requirement"
                            :dependencies="dependencies" />
                        <!-- Entities -->
                        <SRSEditorEntities v-if="!nonFunctional" :requirement="requirement" />

                        <!-- Priority -->
                        <select class="form-select req-description my-2 text-white" required
                            v-model="requirement.priority" v-if="!nonFunctional">
                            <option class="text-dark" value="Essential">Essential</option>
                            <option class="text-dark" value="Important" selected>Important</option>
                            <option class="text-dark" value="Desirable">Desirable</option>
                        </select>
                    </div>
                </BCol>
            </TransitionGroup>
            <BCol cols="12" v-else>
                No requirements added yet. Click "+" button to create your first one.
            </BCol>
            <BCol cols="12">
                <div class="add-one-btn text-success fa-3x text-center">
                    <FaIcon icon="plus-circle" class="pointer" role="button"
                        @click="pushRequirement(nonFunctional ? 'nonFunctional' : 'functional')" />
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

const { nonFunctional } = defineProps<{
    nonFunctional?: boolean;
}>();

type ReqType = keyof SRS.Specification['requirements'];

const requirements = computed((): SRS.Requirement[] => model.value.requirements[nonFunctional ? 'nonFunctional' : 'functional']);

const dependencies = computed(() => {
    const { functional, nonFunctional } = model.value.requirements;
    return {
        functional, nonFunctional
    };
});



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
        priority: 'Essential',
        text: 'Requirement Description',
        title: 'My Requirement ' + len,
        entities: [],
        _key: "key-" + Math.floor(Math.random() * 99999),
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
<style lang="scss">
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
