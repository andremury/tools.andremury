<template>
    <div>
        <h1 class="text-center">Gym Workout Creator</h1>
        <BRow>
            <BCol>
                <GymWorkoutCreator :sections="sections" @update="setSections" />
            </BCol>
            <BCol>
                <GymA4Printable :sections="sections" :cols="cols" :key="updatekey" />
            </BCol>
        </BRow>

    </div>
</template>

<script lang="ts" setup>
import type { Table } from '~/shared/types';

const cols = ref(2);
const sections = ref<[Table[], Table[]]>([[], []]);

const updatekey = ref(0);


const setSections = (event: [Table[], Table[]]) => {
    sections.value = event;
    updatekey.value++;
};
</script>
