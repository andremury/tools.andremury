<template>
    <div>
        <FlashCard :title="card.title" :description="card.description" :key="card.id.toString(16)" />
        <button @click="randomCard">Random Card</button>
    </div>
</template>

<script setup lang="ts">

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
</script>
