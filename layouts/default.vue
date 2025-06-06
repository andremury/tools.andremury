<template>
  <div id="main" class="px-lg-5">
    <HomeButton />
    <slot></slot>
    <div class="copyright text-secondary bottom-0 text-center px-3">
      <small
        >This platform is free to use and distribute according to MIT License.
        Version {{ version }}.</small
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { version } from '~/package.json';

useHead({
  title: 'SRS, Flash Cards, Fake Chat and more - Andre Mury',
});
</script>

<style>
body {
  padding: 0;
  margin: 0;
  background-color: black;
}

#main {
  color: white;
  background-color: black;
  min-height: calc(100dvh - 25px);
}

.copyright {
  height: 25px;
}
</style>
