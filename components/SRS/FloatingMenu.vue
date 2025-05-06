<template>
  <div class="floating-menu-wrapper position-fixed d-flex flex-column align-items-end gap-2">
    <slot />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.floating-menu-wrapper {
  width: fit-content;
  right: 0;
  bottom: 0px;
  z-index: 999;
  padding: 10px
}
</style>
