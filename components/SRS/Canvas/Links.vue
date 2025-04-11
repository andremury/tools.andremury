<template>
    <Transition name="fade" mode="out-in">
        <div class="svg-container position-absolute w-100 h-100 top-0 start-0" ref="svgContainer" v-if="mounted">
            <div class="svg-req-links" v-for="item in requirements" :id="`req-dep-link-${item._key}`">
                <svg data-v-8ea6e3ef="" class="dependency-links w-100 h-100 position-absolute top-0 start-0"
                    v-for="dep in item.dependencies" :key="item._key">
                    <path data-v-8ea6e3ef="" :stroke="item.color" stroke-width="2" fill="none"
                        :d="generateDependencyLink(item._key, dep._key)" v-if="dep" :key="wX"></path>
                </svg>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import type { SRS } from '~/shared/types';

const { requirements } = defineProps<{
    requirements: SRS.Requirement[];
}>();

const mounted = ref(false);
const wX = ref(0);
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

onMounted(() => {
    setTimeout(() => {
        mounted.value = true;
    }, 300);
    window && (window.onresize = (e) => {
        wX.value = wX.value++;
    });
});
</script>
