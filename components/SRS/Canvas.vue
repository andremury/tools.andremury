<template>
    <div class="srs-canvas">
        {{ selectedItem }}
        <div class="srs-section d-flex gap-3 flex-wrap position-relative">
            <div class="srs-rf  rounded border shadow-sm text-dark p-3 d-flex flex-column align-items-center justify-content-center pointer"
                v-for="(item, index) in allRequirements" :key="item._key" :style="{
                    backgroundColor: item.color || 'blanchedalmond'
                }" @click="selectItem(item)" role="button" :id="item.id">
                <div class="rf-content">
                    <p><b>{{ item.title }}</b></p>
                    <small v-if="item.dependencies.length">
                        <{{ item.dependencies.join(', ') }}>
                    </small>
                </div>
               
            </div>
        </div>
         <div class="svg-container position-absolute w-100 h-100 top-0 start-0" ref="svgContainer">
            <div class="svg-req-links" v-for="item in allRequirements" :id="`req-dep-link-${item.id}`">
                <svg data-v-8ea6e3ef="" class="dependency-links w-100 h-100 position-absolute top-0 start-0" v-for="dep in item.dependencies">
                    <path data-v-8ea6e3ef="" :stroke="item.color" stroke-width="2" fill="none" :d="generateDependencyLink(item.id, dep)"></path>
                </svg>
            </div>
        </div>
        <BModal id="details-modal" v-model="isOpen">
            <template #header-close>
                <div class="close" @click="toggle()" role="button">&times;</div>
            </template>
<template #header>
                <h3><b>[{{ selectedItem?.id }}] {{ selectedItem?.title }}</b></h3>
            </template>

{{ selectedItem?.text }}<br />
{{ selectedItem?.priority }}<br />
{{ selectedItem?.color }}<br />
{{ selectedItem?.dependencies }}<br />
{{ selectedItem?.entities }}
</BModal>
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
    if (selectedItem.value?.id === item.id)
        selectedItem.value = undefined;
    else {
        selectedItem.value = item;
        toggle();
    };
};

const generateDependencyLink = (from: string, target: string) => {
    if (!from || !target) return '';

    const startNode = document.getElementById(from);
    const endNode = document.getElementById(target);
    if (!startNode || !endNode) return '';

    console.log(from, startNode, target, endNode);

    // Starts on the very middle of the first box
    const fromX = (startNode.offsetWidth / 2) + (startNode.offsetLeft);
    const fromY = (startNode.offsetHeight / 2) + (startNode.offsetTop);
    console.log(fromX, fromY);
    const toX = (endNode.offsetWidth / 2) + (endNode.offsetLeft);
    const toY = (endNode.offsetHeight / 2) + (endNode.offsetTop);

    return `M ${fromX} ${fromY} L ${toX} ${toY}`;
};

watch(data, (val) => {
    console.log(val);
});

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
