<template>
    <BContainer class="w-100">
        <h1 class="text-center my-5">Software Requirement Specification Studio</h1>
        <BInputGroup class="mb-2 d-flex justify-content-center">
            <BButton @click="save">Save</BButton>
            <BDropdown text="Load doc">
                <div class="d-flex flex-column gap-1 p-3">
                    <span v-if="Object.values(savedDocs).length < 1">
                        No documents found.
                    </span>
                    <div class="d-flex justify-content-between" v-for="item of savedDocs">
                        <BButton @click="load(item.id)" :variant="item.id === doc.id ? 'success' : 'secondary'">
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
        <SRSEditor v-model="doc" class="z1" />
        <!-- <SRSDocument :data="doc" class="z1" /> -->
        <hr />
        <SRSCanvas :data="doc" class="position-relative z0 mt-3 mb-5" :key="doc.id" />
    </BContainer>
</template>

<script setup lang="ts">
import { LocalStorage } from '~/shared/SafeLocalStorage';
import { type SRS } from '~/shared/types';
import { toast } from 'vue3-toastify';

const emptySection = (title = '', content = '') => <SRS.Section>{
    content,
    title
};

const emptyObj = () => <SRS.Specification>({
    id: Math.floor(Math.random() * 999),
    name: "My New Document",
    version: 1,
    audits: [],
    revision: [],
    sections: {
        introduction: emptySection('Introduction', 'Introduction to my requirements.'),
        productOverview: emptySection('Product Overview', 'The overview of my product.'),
        restrictions: emptySection('Restrictions', 'The restrictions of this document'),
        functionalRequirements: emptySection('Functional Requirements (FR)', 'Brief explanation of what are functional requirements in this section.'),
        nonFunctionalRequirements: emptySection('Non Functional Requirements (NF)', 'Brief explanation of what are non functional requirements in this section.'),
        trackability: emptySection('Trackability', 'The trackability strategy of this requirements.'),
        modifications: emptySection('Modifications', 'The rules for modifying this piece of software.'),
        developmentStrategy: emptySection('Development Strategy', 'How will this software be developed? Methodologies, strategies, etc.'),
        completionCriteria: emptySection('Completion Criteria', 'All the terms needed to consider this product completed and delivered.'),
    },
    requirements: {
        functional: [],
        nonFunctional: []
    },
});

const doc = ref<SRS.Specification>({ ...emptyObj() });

type SavedDocsDict = Record<number, SRS.Specification>;
const savedDocs = ref<SavedDocsDict>({});

const saved = ref(true);

const createNewDoc = () => {
    if (!saved.value && confirm('Save current document?')) {
        save();
    }

    doc.value = { ...emptyObj() };

    toast.success(`New document created.`);
};

const remove = (docId: number) => {
    const docs = LocalStorage.get<SavedDocsDict>('documents') || {};
    const docName = docs[docId]?.name;
    delete docs[docId];

    LocalStorage.set('documents', docs);
    savedDocs.value = docs;

    toast.success(`Document ${docName} removed.`);
};

const save = () => {
    if (!doc.value.name) {
        const name = prompt('Please, set a name for this document:');
        if (!name) {
            alert('You must set a name in order to save.');
            return;
        }
        doc.value.name = name;
    }
    const docs = LocalStorage.get<SavedDocsDict>('documents') || {};

    docs[doc.value.id] = JSON.parse(JSON.stringify({ ...doc.value }));

    LocalStorage.set('documents', docs);
    savedDocs.value = docs;
    setTimeout(() => {
        saved.value = true;
    }, 100);

    toast.success(`Document ${doc.value.name} saved.`);
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

    doc.value = loadedDoc;
    setTimeout(() => {
        saved.value = true;
    }, 100);

    toast.success(`Document ${loadedDoc.name} loaded.`);

};

const exportJson = () => {
    if (typeof document === 'undefined') return;

    const docFileName = `SRS-${doc.value.name}-${new Date().getTime()}.json`;

    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(doc.value))}`;
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

    doc.value = importedDoc;

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

onMounted(() => {
    const docs = LocalStorage.get<SavedDocsDict>('documents');
    if (docs) {
        savedDocs.value = docs;
    }

    setTimeout(() => {
        saved.value = true;
    }, 100);

    if (window?.document)
        window.document.onkeydown = saveOnKey;
});

watch(doc, (v) => {
    saved.value = false;
}, { deep: true })

</script>

<style>
.z1 {
    z-index: 1;
}

.z0 {
    z-index: 0;
}
</style>
