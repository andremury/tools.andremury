<template>
    <div class="main">
        <div class="trade-card border p-3 m-3">
            <TradingCardHeader :title="title" />
            <TradingCardImage />
            <TradingCardAttributes />
        </div>
    </div>
</template>
<script lang="ts" setup>

defineProps<{
    title: string;
}>()

</script>

<style scoped>
.trade-card {
    width: 360px;
    height: 650px;
}
</style>
