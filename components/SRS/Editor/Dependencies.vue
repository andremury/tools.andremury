<template>
    <!-- Dependencies Management -->
    <div class="deps border p-3">
        <h5 role="button" class="pointer user-select-none" v-b-toggle="`collapse-${requirement._key}`">Dependencies</h5>
        <BCollapse :id="`collapse-${requirement._key}`">
            <div class="dep d-flex justify-content-between align-items-center gap-4"
                v-for="(dep, idx) in selectedDependencies">
                <select class="form-select req-description mb-2 text-white" required
                    @change="setDependency($event, idx)">
                    <option class="text-dark" :value="null" :selected="!dep" disabled>
                        Select
                    </option>
                    <option class="text-dark" v-for="(option, optionIdx) in options" :value="optionIdx"
                        :selected="option._key === dep?._key"
                        :disabled="!!selectedDependencies.find(d => option._key === d?._key) || willCircularDepend(option, requirement)">
                        [{{ option.id }}]
                        {{ option.title }}
                        {{ willCircularDepend(option, requirement) ? '(circular)' : '' }}
                    </option>
                </select>
                <div class="remove-one-btn text-danger">
                    <FaIcon icon="minus-circle" class="" role="button" @click="selectedDependencies.splice(idx, 1)" />
                </div>
            </div>
            <div class="add-one-btn text-warning text-center gap-2 py-3" v-if="
                dependencies.functional.length > 1
                && selectedDependencies.length < dependencies.functional.length - 1">
                <FaIcon icon="plus-circle" class="pointer  fa-2x" role="button"
                    @click="selectedDependencies.push(null)" />
            </div>
            <span class="text-secondary" v-else>Not enough requirements to add more deps, add at
                least one more.</span>
            <hr />
            <div class="related-deps-wrapper">
                <p>Related requirements</p>
                <p v-if="requirement.relatedRequirements?.length > 0">
                    <span class="related-item" v-for="item in requirement.relatedRequirements" :key="item._key"
                        v-b-tooltip.hover="item.title">
                        <a @click="highlight(`requirement-def-${item._key}`)"
                            :href="`#requirement-def-${item._key}`">[{{ item.id }}]</a>
                    </span>
                </p>
                <span class="text-secondary" v-else>No related requirements yet.</span>
            </div>
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

type ReqWNull = typeof requirement.dependencies;

const emit = defineEmits<{
    (e: 'set-dependencies', data: ReqWNull): void;
}>();

const selectedDependencies = ref<ReqWNull>([]);

const options = computed(() => dependencies.functional.filter(opt => opt._key !== requirement._key));

const willCircularDepend = (from: SRS.Requirement, to: SRS.Requirement, visited = new Set<string>()): boolean => {
    if (!from || !from.dependencies) return false;

    if (from.id === to.id) return true;

    if (visited.has(from.id)) return false;
    visited.add(from.id);

    for (const dep of from.dependencies) {
        if (!dep) break;
        if (dep.id === to.id) return true;
        if (willCircularDepend(dep, to, visited)) return true;
    }

    return false;
};


const highlight = (elId: string) => {
    if (typeof document === 'undefined') return;

    const el = document.getElementById(elId);
    if (!el) return;

    setTimeout(() => {
        el.classList.add('highlight');
    }, 100);

    setTimeout(() => {
        el.classList.remove('highlight');
    }, 2000);
};

const setDependency = (event: Event, idx: number) => {
    const optionIdx = Number((event.target as any).value);

    if (optionIdx !== null && !Number.isNaN(optionIdx)) {
        const item = options.value[optionIdx];
        if (item && idx < selectedDependencies.value.length) {
            selectedDependencies.value[idx] = item;
        }
    }
};

const setRelatedRequirements = (nValue: ReqWNull, oValue: ReqWNull) => {

    const add = nValue.filter(nu => !oValue.find(old => old?._key === nu?._key));
    const remove = oValue.filter(old => !nValue.find(nu => nu?._key === old?._key));

    add.forEach((dep) => {
        if (!dep) return;
        if (!dep.relatedRequirements)
            dep.relatedRequirements = [];

        dep.relatedRequirements.push({
            id: requirement.id,
            _key: requirement._key,
            title: requirement.title,
            color: requirement.color
        });
    });

    remove.forEach((dep, idx) => {
        if (!dep || !dep.relatedRequirements) return;

        const reqIdx = dep.relatedRequirements.findIndex(item => item._key === dep._key);
        if (reqIdx) dep.relatedRequirements.splice(reqIdx, 1);
    });

    if (add.length || remove.length) {
        emit('set-dependencies', nValue); // por exemplo
    }
};

let previousDeps: ReqWNull = [];

onMounted(() => {
    selectedDependencies.value = requirement.dependencies;
});

watch(selectedDependencies, (n) => {
    const currentDeps = n.filter(Boolean);
    const oldDeps = previousDeps;

    setRelatedRequirements(currentDeps, oldDeps);

    previousDeps = [...currentDeps]; // shallow copy
}, { deep: true });
</script>
