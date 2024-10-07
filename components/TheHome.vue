<template>
    <div id="home">
        <BRow class="justify-content-center">
            <BCol cols="12" class="mb-5">
                <h1 class="welcome text-center">Welcome to Tools</h1>
                <h3 class="subtitle text-secondary text-center">Make your choice</h3>
            </BCol>
            <BCol cols="4" v-for="(tool, idx) in tools" :key="idx + tool.name">
                <NuxtLink :to="tool.url" class="text-decoration-none">
                    <div
                        class="tool-card text-white border rounded shadow-sm p-5 d-flex justify-content-center align-items-center text-center">
                        {{ tool.name }}
                    </div>
                </NuxtLink>
            </BCol>
        </BRow>
    </div>
</template>

<script lang="ts" setup>

const tools = ref([
    {
        name: 'Flash Cards',
        url: '/flash-cards',
    }, {
        name: 'Gym Workout Creator',
        url: '/gym-workout-creator',
    }
]);
</script>

<style scoped lang="scss">
#home {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100dvh;
}

h1 {
    font-size: 2em;
}

.tool-card {
    height: 100%;
    transition: all 0.2s ease-in-out;
    user-select: none;
    cursor: pointer;

    &:hover {
        transform: rotate(3deg) scale(1.1);
    }
}

.welcome {
    animation: fade 2s;
    animation-fill-mode: forwards infinite;
}

.subtitle {
    animation: fade 2s;
    opacity: 0;
    animation-delay: 2s;
    animation-fill-mode: forwards;
}

@keyframes fade {
    0% {
        transform: translateY(-50px);
        opacity: 0;
    }

    100% {
        transform: translateY(0px);
        opacity: 1;
    }
}
</style>
