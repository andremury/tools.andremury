<template>
  <div class="to-top d-flex align-items-center justify-content-center bg-white rounded text-dark">
    <FaIcon
      icon="chevron-up"
      class="fa-2x pointer"
      role="button"
      @click="scrollTop"
    />
  </div>
</template>

<script lang="ts" setup>
const scrollTop = () => {
  window?.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
</script>

<style scoped lang="scss">
.to-top {
  height: 50px;
  width: 50px;
}
</style>
