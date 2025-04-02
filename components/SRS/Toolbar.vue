<template>
    <BInputGroup class="mb-2 d-flex justify-content-center">
        <BButton @click="save">Save</BButton>
        <BDropdown text="Load doc">
            <div class="d-flex flex-column gap-1 p-3">
                <span v-if="Object.values(savedDocs).length < 1">
                    No documents found.
                </span>
                <div class="d-flex justify-content-between" v-for="item of savedDocs">
                    <BButton @click="load(item.id)" :variant="item.id === currentDoc.id ? 'success' : 'secondary'">
                        {{ item.name }}
                    </BButton>
                    <BButton variant="link" @click="remove(item.id)">
                        <FaIcon icon="minus-circle" class="text-danger" />
                    </BButton>
                </div>
            </div>
        </BDropdown>
        <BButton @click="exportJson">Export</BButton>
        <BButton @click="importJson">Import</BButton>
        <BButton @click="createNewDoc">New document</BButton>
        <BButton variant='primary'>
            <span v-if="saved">✅ Saved</span>
            <span v-else>❌ Not Saved</span>
        </BButton>
    </BInputGroup>
</template>

<script lang="ts" setup>
import { toast } from 'vue3-toastify';
import { LocalStorage } from '~/shared/SafeLocalStorage';
import type { SRS } from '~/shared/types';

const { currentDoc } = defineProps<{
    currentDoc: SRS.Specification;
}>();

const emit = defineEmits<{
    (e: 'export'): void;
    (e: 'import'): void;
    (e: 'create-new'): void;
    (e: 'load-doc', doc: SRS.Specification): void;
}>();

const savedDocs = ref<SRS.SavedDocsDict>({});
const saved = ref(true);

const createNewDoc = () => {
    if (!saved.value && confirm('Save current document?')) {
        save();
    }
    emit('create-new');
};

const remove = (docId: number) => {
    const docs = LocalStorage.get<SRS.SavedDocsDict>('documents') || {};
    const docName = docs[docId]?.name;
    delete docs[docId];

    LocalStorage.set('documents', docs);
    savedDocs.value = docs;

    toast.success(`Document ${docName} removed.`);
};

const save = () => {
    if (!currentDoc.name) {
        const name = prompt('Please, set a name for this document:');
        if (!name) {
            alert('You must set a name in order to save.');
            return;
        }
        currentDoc.name = name;
    }
    const docs = LocalStorage.get<SRS.SavedDocsDict>('documents') || {};

    docs[currentDoc.id] = JSON.parse(JSON.stringify({ ...currentDoc }));

    LocalStorage.set('documents', docs);
    savedDocs.value = docs;
    setTimeout(() => {
        saved.value = true;
    }, 100);

    toast.success(`Document ${currentDoc.name} saved.`);
};

const load = (docId: number) => {
    if (Object.values(savedDocs).length < 1) {
        toast.info("No documents saved yet");
        return;
    }

    if (!saved.value && confirm('Save current document?')) {
        save();
    }

    const loadedDoc = savedDocs.value[docId];
    if (!loadedDoc) {
        toast.error('Invalid Document ID.');
        return;
    }

    emit('load-doc', loadedDoc);

    setTimeout(() => {
        saved.value = true;
    }, 100);

    toast.success(`Document ${loadedDoc.name} loaded.`);

};

const exportJson = () => {
    if (typeof document === 'undefined') return;

    const docFileName = `SRS-${currentDoc.name}-${new Date().getTime()}.json`;

    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(currentDoc))}`;
    const downloadAnchorNode = document.createElement('a');

    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', docFileName);

    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();

    toast.info(`Download of ${docFileName} started.`);

};


const importJson = () => {
    const data = prompt('Insert the json here:');

    if (data === undefined || data === null) {
        toast.error('This JSON seems invalid.');
        return;
    }

    const importedDoc: SRS.Specification = JSON.parse(data);
    if (!importedDoc.id || /\D/g.test(String(importedDoc.id))) {
        toast.error('This JSON seems invalid.');
        return;
    }

    emit('load-doc', importedDoc);

    setTimeout(() => {
        saved.value = true;
    }, 100);
};

const saveOnKey = (e: KeyboardEvent) => {
    if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        save();
    }
};

watch(currentDoc, (v) => {
    saved.value = false;
}, { immediate: true, deep: true });

onMounted(() => {
    const docs = LocalStorage.get<SRS.SavedDocsDict>('documents');
    if (docs) {
        savedDocs.value = docs;
    }

    setTimeout(() => {
        saved.value = true;
    }, 100);

    if (window?.document)
        window.document.onkeydown = saveOnKey;
});


</script>
