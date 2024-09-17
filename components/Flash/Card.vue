<template>
    <div class="flash-card" @click="turnIt">
        <div class="title">
            {{ title }}
        </div>
        <div class="description">
            {{ description }}
        </div>
    </div>
</template>

<script lang="ts" setup>

function turnIt() {
    alert('card turned');
}

const { title } = defineProps<{
    title: string;
    description: string;
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
}

</style>
