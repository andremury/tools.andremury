<template>
    <div>
        <!-- Description Box -->
        <div class="req-description my-2">
            <QuillEditor v-model:content="requirement.text" theme="bubble" content-type="html" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { SRS } from '~/shared/types';

const { requirement } = defineProps<{ requirement: SRS.Requirement; }>();

</script>
