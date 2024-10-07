<template>
    <div class="home-btn">
        <BButton variant="link" @click="goHome" id="back-btn" v-b-tooltip.right="'Home'">
            <FaIcon icon="home" />
        </BButton>
    </div>
</template>

<script lang="ts" setup>
const router = useRouter();

const goHome = () => {
    router.push({ path: "/" });
};
</script>

<style lang="scss" scoped>
#back-btn {
    position: fixed;
    top: 1em;
    left: 1em;
}
</style>
