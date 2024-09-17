<template>
    <div>
        <h1 class="welcome">Welcome to Flashcards</h1>
        <div class="flex">
            <FlashCard :title="card.title" :description="card.description" :key="card.id.toString(16)"/>
        </div>
        <button @click="randomCard">Random Card</button>
    </div>
</template>

<script lang="ts" setup>
const elapsed1s = ref(false);

const cards = [
    {
        id: 1,
        title: 'Card 1',
        description: 'This is the first card'
    },
    {
        id: 2,
        title: 'Card 2',
        description: 'This is the second card'
    },
    {
        id: 3,
        title: 'Card 3',
        description: 'This is the third card'
    }
];

const card = ref(cards[1]);

function randomCard() {
    const randomIndex = Math.floor(Math.random() * cards.length);
    card.value = cards[randomIndex];
}


setTimeout(() => {
    elapsed1s.value = true;
}, 1000);
</script>

<style scoped>
h1 {
    font-size: 2em;
    text-align: center;
}

.welcome {
    animation: fade 1s;
    opacity: 0;
    animation-fill-mode: forwards;
}

@keyframes fade {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}
</style>
