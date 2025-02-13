<template>
    <div class="text-center">
        <h1 class="mb-3">Flash Cards</h1>
        <small class="text-secondary">Press <span class="text-warning pointer" @click="turnitOrRandom">SPACE</span> to
            navigate</small>
        <Transition name="blur" mode="out-in">
            <div :key="card.id">
                <FlashCard :title="card.title" :description="card.description" :answer="card.answer" :turned="turned"
                    @turn="turnIt" />
            </div>
        </Transition>
        <div class="btn btn-outline-light mt-4" variant="outline-light" @click="randomCard">
            <FaIcon icon="random" />
        </div><br />
        <small class="text-secondary">Click this button <span class="fa-2x ml-3">👆</span> to get a new card.</small>
    </div>
</template>

<script setup lang="ts">

import { cards as mock } from '~/shared/data/flash-cards';


const card = ref(mock[1]);
const turned = ref(false);

function turnIt() {
    turned.value = !turned.value;
}

function turnitOrRandom() {
    if (!turned.value) turnIt();
    else randomCard();
}

onMounted(() => {
    window.addEventListener('keydown', (e) => {
        if (e.key === ' ') {
            turnitOrRandom();
        }
    });
});

function randomCard(e?: any) {
    const randomIndex = Math.floor(Math.random() * mock.length);
    card.value = mock[randomIndex];
    turned.value = false;
}
</script>
