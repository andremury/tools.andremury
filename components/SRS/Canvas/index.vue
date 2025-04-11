<template>
    <div class="srs-canvas">
        <div class="canvas-content" :class="{ 'open bg-dark p-3 overflow-auto': isOpen, expanded }">
            <div class="icon border rounded-circle bg-white shadow-sm text-info d-flex align-items-center justify-content-center pointer"
                v-if="!isOpen" role="button" @click="toggle">
                <FaIcon icon="diagram-project" class="fa-2x mt-1" />
            </div>
            <Transition mode="out-in">
                <div v-if="isOpen">
                    <div class="headers w-100 mb-5">
                        <div class="d-flex gap-3 position-absolute top-0 end-0 pr-4 pt-2">
                            <div class="close pointer " role="button" @click="toggleExpand">
                                <FaIcon :icon="expanded ? 'minimize' : 'expand'" />
                            </div>
                            <div class="close pointer " role="button" @click="toggle">
                                <FaIcon icon="times" />
                            </div>
                        </div>
                        <h5 class="text-center">Requirement Map</h5>
                    </div>
                    <div class="srs-section d-flex gap-5 flex-wrap justify-content-center position-relative"
                        v-if="data.requirements.functional.length > 0">
                        <SRSCanvasItem :requirement="item" v-for="(item, index) in data.requirements.functional"
                            :key="item._key" @click="selectItem(item)" role="button" :id="item._key"
                            @mouseenter="highlightDeps(item)" @mouseleave="removeHighlights" />
                        <SRSCanvasLinks :requirements="data.requirements.functional"
                            :key="data.id + data.requirements.functional.length" />
                    </div>
                    <div v-else
                        class="text-secondary d-flex align-items-center justify-content-center h-100 w-100 mt-5">
                        No requirements to show. Add requirements on "Functional Requirements" tab to show the diagram.
                    </div>

                </div>
            </Transition>
            <SRSRequirementsDetailModal v-model="modalIsOpen" @close="closeModal" :requirement="selectedItem" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { type SRS } from '~/shared/types';
const { data } = defineProps<{
    data: SRS.Specification;
}>();

const { isOpen: modalIsOpen, toggle: toggleModal } = useDisclosure();
const { isOpen, toggle } = useDisclosure();
const { isOpen: expanded, toggle: toggleExpand } = useDisclosure();

const selectedItem = ref<SRS.Requirement>();


const selectItem = (item: SRS.Requirement) => {
    console.log('opening modal');
    if (selectedItem.value?.id === item.id)
        selectedItem.value = undefined;
    else {
        selectedItem.value = item;
        toggleModal();
    };
};

const closeModal = () => {
    toggleModal();
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

watch(isOpen, (open) => {
    if (open) {
        document.body.style.marginBottom = "49dvh";
    } else {
        document.body.style.marginBottom = "0";
    }
})

</script>

<style>
.ref-highlight {
    filter: drop-shadow(0 0 0.5em rgb(255, 253, 124)) !important;
    stroke-width: 10px !important;
}

.dependency-links path {
    stroke-width: 2;
    transition: all 200ms;
}

.canvas-item {
    width: 200px;
    word-break: normal;
    user-select: none;
    transition: all 200ms;
    z-index: 1;
}

.svg-container {
    z-index: 0;
}
</style>
<style lang="scss" scoped>
.rf-content {
    text-shadow: 1px 0 0 white;
}

.srs-section {
    z-index: 1;
}

.srs-canvas>.canvas-content {
    position: fixed;
    z-index: 3;
    height: 50px;
    width: 50px;
    right: 20px;
    bottom: 20px;
    transition: all 200ms;

    &.open {
        height: 50dvh;
        width: 100%;
        right: 0;
        bottom: 0;

        &.expanded {
            height: 100dvh !important;
        }
    }

    .close {
        z-index: 999;
    }

    .icon {
        height: 50px;
        width: 50px;
    }


}
</style>
