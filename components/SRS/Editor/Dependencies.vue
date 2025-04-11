<template>
    <!-- Dependencies Management -->
    <div class="deps border p-3">
        <h5 role="button" class="pointer user-select-none" v-b-toggle="`collapse-${requirement._key}`"
            @click="setOptions">Dependencies</h5>
        <BCollapse :id="`collapse-${requirement._key}`">
            <div class="dep d-flex justify-content-between align-items-center gap-4"
                v-for="(dep, idx) in selectedDependencies">

                <LazyChosen v-model="selectedDependencies[idx]" :options="options"
                    :initial-value="options.find((o) => o.key === selectedDependencies[idx]?._key)"
                    @mouseenter="setOptions"
                    :key="JSON.stringify(options.map(o => o.key)) + selectedDependencies[idx]?._key" />

                <div class="remove-one-btn text-danger">
                    <FaIcon icon="minus-circle" class="" role="button" @click="selectedDependencies.splice(idx, 1)" />
                </div>
            </div>
            <div class="add-one-btn text-warning text-center gap-2 py-3" v-if="
                dependencies.length > 1
                && selectedDependencies.length < dependencies.length - 1">
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
import type { ChosenOption, SRS } from '~/shared/types';
const { requirement, dependencies } = defineProps<{
    requirement: SRS.Requirement,
    dependencies: SRS.Requirement[];
}>();

type ReqWNull = typeof requirement.dependencies;
const { updateKey, tick } = useSrsUpdateKey();

const emit = defineEmits<{
    (e: 'set-dependencies', data: ReqWNull): void;
}>();

const selectedDependencies = ref<ReqWNull>([]);

const options = ref<ChosenOption[]>([]);

const setOptions = () => {
    options.value = dependencies
        .filter(opt => opt._key !== requirement._key)
        .map((opt) => {
            const isCircular = willCircularDepend(opt, requirement);
            return {
                label: `${opt.id} ${opt.title}${isCircular ? ' (circular)' : ''}`,
                key: opt._key,
                value: opt,
                disabled: !!selectedDependencies.value.find(d => opt._key === d?._key) || isCircular
            };
        });
    console.log(options.value);
};

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
