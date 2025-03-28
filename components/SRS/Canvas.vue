<template>
    <div class="srs-canvas">
        <div class="srs-section d-flex gap-3 flex-wrap position-relative">
            <div class="srs-rf  rounded border shadow-sm text-dark p-3 d-flex flex-column align-items-center justify-content-center pointer"
                v-for="(item, index) in allRequirements" :key="item._key" :style="{
                    backgroundColor: item.color || 'blanchedalmond'
                }" @click="selectItem(item)" role="button" :id="item._key">
                <div class="rf-content text-center">
                    <p><b>{{ item.title }}</b></p>
                    <small v-if="item.dependencies.length">
                        <{{item.dependencies.filter(d => d).map(d => d?.id).join(', ')}}>
                    </small>
                </div>

            </div>
        </div>
        <div class="svg-container position-absolute w-100 h-100 top-0 start-0" ref="svgContainer">
            <div class="svg-req-links" v-for="item in allRequirements" :id="`req-dep-link-${item._key}`">
                <svg data-v-8ea6e3ef="" class="dependency-links w-100 h-100 position-absolute top-0 start-0"
                    v-for="dep in item.dependencies">
                    <path data-v-8ea6e3ef="" :stroke="item.color" stroke-width="2" fill="none"
                        :d="generateDependencyLink(item._key, dep._key)" v-if="dep"></path>
                </svg>
            </div>
        </div>
        <SRSRequirementsDetailModal v-model="isOpen" @close="closeModal" :requirement="selectedItem" />
    </div>
</template>

<script setup lang="ts">
import { type SRS } from '~/shared/types';
const { data } = defineProps<{
    data: SRS.Specification;
}>();
type ReqType = (keyof SRS.Specification['requirements']);
const { isOpen, toggle } = useDisclosure();

const selectedItem = ref<SRS.Requirement>();
const svgContainer = ref<HTMLDivElement>();
const types: ReqType[] = ['functional', 'nonFunctional'];

const allRequirements = computed(() => [data.requirements.functional, data.requirements.nonFunctional].flat());

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
const generateDependencyLink = (from: string, target: string) => {
    if (!from || !target) return '';

    const startNode = document.getElementById(from);
    const endNode = document.getElementById(target);
    if (!startNode || !endNode) return '';


    // Starts on the very middle of the first box
    const fromX = (startNode.offsetWidth / 2) + (startNode.offsetLeft);
    const fromY = (startNode.offsetHeight / 2) + (startNode.offsetTop);

    // Ends in the very middle of the second box
    const toX = (endNode.offsetWidth / 2) + (endNode.offsetLeft);
    const toY = (endNode.offsetHeight / 2) + (endNode.offsetTop);

    return `M ${fromX} ${fromY} L ${toX} ${toY}`;
};

</script>

<style lang="scss" scoped>
.srs-rf {
    width: 200px;
    word-break: break-all;
    user-select: none;
}

.rf-content {
    text-shadow: 1px 0 0 white;
}

.srs-section {
    z-index: 1;
}

.dependency-links path {
    stroke-width: 2;
}

.svg-container {
    z-index: 0;
}
</style>
