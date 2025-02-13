<template>
    <h1> Clone Yu-Gi-Oh</h1>
    <div id="cards" class="d-flex flex-wrap justify-content-center gap-2 row-gap-2 ">
        <TradingCard v-for="card in cards" :key="card" :title="card" />
    </div>
</template>

<script setup lang="ts">
const cards = [
    'Carro do Braia',
    'Carro do Vin',
    'Carro do Vampiro',
    'Carro do Leite',
    'Carro do Ovo',
    'Carro do Jovem',
    'Carro do Véio'
];
</script>
