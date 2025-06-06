<template>
  <div class="bg-white py-5 d-flex justify-content-center">
    <BRow class="a4-sheet shadow-sm">
      <!-- <BCol> PRODUCT LOGO - PRODUCT NAME - PRODUCT CODE </BCol> -->
      <div class="heading-title text-center w-100" v-if="content">
        <h2>
          {{ content.name }}
        </h2>
        <span v-if="content.subtitle" class="text-center text-muted w-100">{{
          content.subtitle
        }}</span>
      </div>
      <BCol
        cols="12"
        v-for="(value, key, index) in visibleSections"
        class="d-flex flex-column py-3"
        v-if="mounted"
      >
        <label for="key" class="w-100">
          <h5>{{ index + 1 }}. {{ value.title }}</h5>
        </label>
        <div class="editor srs-input">
          <div
            class="content ql-editor"
            v-html="value.content"
            :id="`quill-${key}`"
          />
        </div>
        <div class="requirement-specifications" v-if="content?.requirements">
          <div
            class="d-flex flex-column gap-4"
            v-if="key === 'functionalRequirements'"
          >
            <SRSRequirement
              :requirement="item"
              v-for="item in content?.requirements.functional"
              :key="item._key"
            />
          </div>
          <div v-else-if="key === 'nonFunctionalRequirements'">
            <SRSRequirement
              :requirement="item"
              v-for="item in content?.requirements.nonFunctional"
              :key="item._key"
              nonFunctional
            />
          </div>
        </div>
      </BCol>
    </BRow>
  </div>
</template>
<script setup lang="ts">
import type { SRS } from '~/shared/types';
const mounted = ref(false);

const { content } = defineProps<{
  content: SRS.Specification;
}>();

const visibleSections = computed(() =>
  Object.entries(content?.sections || {})
    .filter(([_, value]) => !value.invisible)
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {} as Record<string, SRS.Section>)
);

onMounted(async () => {
  if (typeof document !== 'undefined') {
    mounted.value = true;
  }
});
</script>

<style lang="scss" scoped>
.a4-sheet {
  color: black;
  background: white;

  @media screen and (min-width: 599px) {
    padding: 1cm 2cm;
  }

  border: 1px dashed rgba(0, 0, 0, 0.125);
  width: 100%;
  max-width: 297mm;
}
.ql-editor {
  h2 {
    font-size: 2em;
  }
  h3 {
    font-size: 1.5em;
  }
}
</style>
