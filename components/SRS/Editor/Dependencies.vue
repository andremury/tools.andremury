<template>
    <!-- Dependencies Management -->
    <div class="deps border p-3">
        <h5 role="button" class="pointer user-select-none" v-b-toggle="`collapse-${requirement._key}`">Dependencies</h5>
        <BCollapse :id="`collapse-${requirement._key}`">
            <div class="dep d-flex justify-content-between align-items-center gap-4"
                v-for="(dep, idx) in requirement.dependencies">
                <select class="form-select req-description mb-2 text-white" required
                    v-model="requirement.dependencies[idx]">
                    <option class="text-dark" :value="null" selected disabled>Select</option>
                    <option class="text-dark" v-for="option in options" :value="option"
                        :disabled="!!requirement.dependencies.find(d => option._key === d?._key) || willCircularDepend(option, requirement)">
                        [{{ option.id }}] {{ option.title }} {{ willCircularDepend(option, requirement) ? '(circular)' :
                        '' }}
                    </option>
                </select>
                <div class="remove-one-btn text-danger">
                    <FaIcon icon="minus-circle" class="" role="button"
                        @click="requirement.dependencies.splice(idx, 1)" />
                </div>
            </div>
            <div class="add-one-btn text-warning text-center gap-2 py-2 mt-3 bor" v-if="
                dependencies.functional.length > 1
                && requirement.dependencies.length < dependencies.functional.length - 1">
                <FaIcon icon="plus-circle" class="pointer  fa-2x" role="button"
                    @click="requirement.dependencies.push(null)" />
            </div>
            <span class="text-secondary" v-else>Not enough requirements to add more deps, add at
                least one more.</span>
        </BCollapse>
    </div>
    <!-- END Dependencies Management -->

</template>

<script setup lang="ts">
import type { SRS } from '~/shared/types';

const { requirement, dependencies } = defineProps<{
    requirement: SRS.Requirement,
    dependencies: {
        functional: SRS.Requirement[];
        nonFunctional: SRS.Requirement[];
    };
}>();

const options = computed(() => dependencies.functional.filter(opt => opt._key !== requirement._key));

const willCircularDepend = (from: SRS.Requirement, to: SRS.Requirement) => {
    return !!from.dependencies.find(d => d?.id === to.id);
};
</script>
