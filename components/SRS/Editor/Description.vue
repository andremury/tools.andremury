<template>
  <div class="description border p-3 mt-2">
    <h5
      role="button"
      class="pointer user-select-none"
      v-b-toggle="`collapse-description-${requirement._key}`"
    >
      Description
    </h5>
    <BCollapse :id="`collapse-description-${requirement._key}`">
      <!-- Description Box -->
      <div class="req-description">
        <QuillEditor
          v-model:content="requirement.text"
          theme="bubble"
          content-type="html"
          :toolbar="quillToolbarOptions"
        />
      </div>
    </BCollapse>
  </div>
</template>

<script setup lang="ts">
import { quillToolbarOptions } from '~/shared/configs/quillToolbarOptions';
import type { SRS } from '~/shared/types';

const { requirement } = defineProps<{ requirement: SRS.Requirement }>();
</script>
