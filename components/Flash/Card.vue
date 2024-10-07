<template>
    <Transition name="flip" mode="out-in">
        <div class="flash-card " @click="turnIt" :key="+turned">
            <div v-if="turned">
                <div class="description text-secondary">
                    <small>{{ description }}</small>
                </div>
                <div class="answer">
                    {{ answer }}
                </div>
            </div>
            <div v-else>
                <div class="title">
                    {{ title }}
                </div>
                <div class="description">
                    {{ description }}
                </div>
            </div>
        </div>
    </Transition>
</template>

<script lang="ts" setup>

const turned = ref(false);

function turnIt() {
    turned.value = !turned.value;
}

const { title } = defineProps<{
    title: string;
    description: string;
    answer: string;
}>();

</script>


<style scoped lang="scss">
.flash-card {
    user-select: none;
    cursor: pointer;
    width: 5.7cm;
    height: 8.9cm;
    padding: 1em;
    border-radius: 0.5em;
    box-shadow: 0 0 0.3em 0.1em rgba(255, 255, 255, 0.5);
    margin: 1em;
    transition: all 0.3s ease-in-out;

    .title {
        text-align: center;
        font-size: 1.5em;
        font-weight: bold;
        margin-bottom: 0.5em;
        padding-bottom: 0.5em;
        border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    }
    
    .description {
        font-size: 1em;
    }

    &.turned {
        transform: rotateY(90deg);
    }
}
</style>
