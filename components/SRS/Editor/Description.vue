<template>
    <div>
        <div class="d-flex justify-content-between align-content-center gap-4">
            <label for="key" class="w-100">[{{ requirement.id }}]
                <input :name="requirement.id" v-model="requirement.title" :placeholder="'Keep Users'"
                    class="req-input w-75 bg-transparent text-white" />
            </label>
            <div class="color-btn text-danger">
                <input class="req-color-input pointer" type="color" v-model="requirement.color" :style="{
                    backgroundColor: requirement.color
                }" />
            </div>
            <div class="remove-one-btn text-danger">
                <FaIcon icon="minus-circle" class="" role="button" @click="emit('delete')" />
            </div>
        </div>
        <label for="key" class="w-100">Actors:
            <input name="actors" v-model="requirement.actors" :placeholder="'User, Admin, System'"
                class="req-input w-75 bg-transparent text-white" />
        </label>

        <!-- Description Box -->
        <div class="req-description my-2">
            <QuillEditor v-model:content="requirement.text" theme="bubble" content-type="html" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { SRS } from '~/shared/types';

const { requirement } = defineProps<{ requirement: SRS.Requirement }>()
const emit = defineEmits<{
    (e: 'delete'): void
}>()
</script>