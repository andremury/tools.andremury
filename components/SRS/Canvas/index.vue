<template>
    <div class="srs-canvas">
        <div class="srs-section d-flex gap-5 flex-wrap position-relative">
            <SRSCanvasItem :requirement="item" v-for="(item, index) in data.requirements.functional" :key="item._key"
                @click="selectItem(item)" role="button" :id="item._key" @mouseenter="highlightDeps(item)"
                @mouseleave="removeHighlights" />
        </div>
        <SRSCanvasLinks :requirements="data.requirements.functional" :key="data.id" />
        <SRSRequirementsDetailModal v-model="isOpen" @close="closeModal" :requirement="selectedItem" />
    </div>
</template>

<script setup lang="ts">
import { type SRS } from '~/shared/types';
const { data } = defineProps<{
    data: SRS.Specification;
}>();
const { isOpen, toggle } = useDisclosure();

const selectedItem = ref<SRS.Requirement>();


const selectItem = (item: SRS.Requirement) => {
    console.log('opening modal');
    if (selectedItem.value?.id === item.id)
        selectedItem.value = undefined;
    else {
        selectedItem.value = item;
        toggle();
    };
};

const closeModal = () => {
    toggle();
    selectedItem.value = undefined;
};

const highlightDeps = (item: SRS.Requirement) => {
    if (item.dependencies.length < 1) return;
    const curEl = document.getElementById(item._key);
    if (!curEl) return;

    item.dependencies.forEach(dep => {
        if (!dep) return;
        const reqEl = document.getElementById(dep._key);
        reqEl?.classList.add('ref-highlight');
        console.log(`req-dep-link-${dep._key}`);
    });

    const wrapper = document.getElementById(`req-dep-link-${item._key}`);
    if (!wrapper) return;
    console.log(wrapper.children[0]);
    Object.values(wrapper.children).forEach(svg => {
        if (svg.children[0]) {
            svg.children[0].classList.add('ref-highlight');
        }
    });

};

const removeHighlights = () => {
    if (typeof document === 'undefined') return;
    Object.values(document.getElementsByClassName('ref-highlight')).forEach(el => {
        el.classList.remove('ref-highlight');
    });
};



</script>

<style lang="scss" scoped>
.srs-rf {
    width: 200px;
    word-break: break-all;
    user-select: none;
    transition: all 200ms;
}

.rf-content {
    text-shadow: 1px 0 0 white;
}

.srs-section {
    z-index: 1;
}

.dependency-links path {
    stroke-width: 2;
    transition: all 200ms;
}

.svg-container {
    z-index: 0;
}

.ref-highlight {
    filter: drop-shadow(0 0 0.5em rgb(255, 253, 124)) !important;
    stroke-width: 10px !important;
}
</style>
