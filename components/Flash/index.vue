<template>
    <div class="text-center">
        <h1 class="mb-3">Flash Cards</h1>
        <Transition name="blur" mode="out-in">
            <div :key="card.id">
                <FlashCard :title="card.title" :description="card.description" :answer="card.answer" />
            </div>
        </Transition>
        <BButton variant="outline-light" @click="randomCard">
            <FaIcon icon="random" />
        </BButton>
    </div>
</template>

<script setup lang="ts">

import { cards as mock } from '~/shared/data/flash-cards';


const card = ref(mock[1]);



function randomCard() {
    const randomIndex = Math.floor(Math.random() * mock.length);
    card.value = mock[randomIndex];
}
</script>
