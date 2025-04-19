<template>
  <div class="srs-requirement-definition">
    <div class="d-flex justify-content-between align-content-center gap-4">
      <label for="key" class="w-100"
        >[{{ requirement.id }}]
        <input
          :name="requirement.id"
          v-model="requirement.title"
          :placeholder="'Keep Users'"
          class="req-input w-75 bg-transparent text-white"
        />
      </label>
      <div class="color-btn text-danger">
        <input
          class="req-color-input pointer"
          type="color"
          v-model="requirement.color"
          :style="{
            backgroundColor: requirement.color,
          }"
        />
      </div>
      <div class="remove-one-btn text-danger">
        <FaIcon
          icon="minus-circle"
          class=""
          role="button"
          @click="emit('delete')"
        />
      </div>
    </div>
    <div class="d-flex justify-content-between align-content-center gap-4">
      <label for="key" class="w-100"
        >Actors:
        <input
          name="actors"
          v-model="requirement.actors"
          :placeholder="'User, Admin, System'"
          class="req-input w-75 bg-transparent text-white"
        />
      </label>
      <div class="remove-one-btn text-danger">
        <FaIcon
          icon="chevron-down"
          class=""
          role="button"
          @click="opened = !opened"
          v-b-toggle="`collapse-requirement-${requirement._key}`"
          :class="{ 'upside-down': opened }"
        />
      </div>
      <div
        class="done-icon text-end pointer"
        @click="requirement.done = !requirement.done"
      >
        <FaIcon
          :icon="requirement.done ? 'check-circle' : 'times-circle'"
          :class="requirement.done ? 'text-success' : 'text-danger'"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { SRS } from '~/shared/types';

const { requirement } = defineProps<{ requirement: SRS.Requirement }>();
const emit = defineEmits<{
  (e: 'delete'): void;
}>();

const opened = ref(false);
</script>
<style scoped>
.done-icon {
  width: 30px;
}
</style>
