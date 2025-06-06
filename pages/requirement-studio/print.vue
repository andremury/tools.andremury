<template>
  <div v-if="content">
    <SRSA4Printable :content="content" />
  </div>
  <div v-else>Content not found.</div>
</template>
<script setup lang="ts">
import { LocalStorage } from '~/shared/SafeLocalStorage';
import { SRS } from '~/shared/types';

definePageMeta({
  layout: 'print',
});

const router = useRouter();
const docId = router.currentRoute.value.query.docId as string;

const content = ref<SRS.Specification>();

const load = (docId: number) => {
  const docs = LocalStorage.get<SRS.SavedDocsDict>('documents');
  if (docs) {
    const doc = docs[docId];
    if (doc) {
      content.value = doc;
    } else {
      alert('Document not found.');
      window?.close();
    }
  }
};

onMounted(() => {
  if (window.history.state.back !== null) {
    alert('You cannot access this page.');
    window?.close();
  }
  if (docId) {
    load(parseInt(docId));
  }
});
</script>
