<template>
    <BRow class="d-flex justify-content-center flex-wrap align-items-center w-100 dvh-100">
        <BCol cols="12" class="d-flex gap-2 justify-content-center">
            <BButton variant="outline-primary" squared @click="importDesign">Import</BButton>
            <BButton variant="outline-primary" squared @click="exportDesign">Export</BButton>
            <BButton variant="outline-primary" squared @click="resetDesign">Reset</BButton>
            <BButton variant="outline-primary" squared @click="exportHtml">PDF</BButton>
            <BButton variant="outline-primary" squared @click="autosaveEnabled = !autosaveEnabled">Autosave: {{
                autosaveEnabled ? '✅' : '❌' }}</BButton>
        </BCol>
        <BCol cols="12" class="text-center">
            <small>Last Saved {{ lastSaved }}</small>
        </BCol>
        <BCol cols="12">
            <BInputGroup class="d-flex justify-content-center align-content-center">
                <form @submit.prevent="generatePlaceholders">
                    <BInputGroupText>
                        <BInputGroupText>
                            Placeholder data URL:
                        </BInputGroupText>
                        <BInput v-model="dataUrl" @keyup.enter="generatePlaceholders" />
                        <BButton variant="outline-primary" squared @click="generatePlaceholders">Generate Placeholders
                        </BButton>
                        <BInputGroupText v-if="generatedPlaceholders.length > 10">
                            Search placeholders
                        </BInputGroupText>
                        <BInput v-model="placeholderSearch" v-if="generatedPlaceholders.length > 10" />
                    </BInputGroupText>
                </form>
            </BInputGroup>
            <div class="placeholders-wrap py-3">
                <BButton variant="outline-primary" size="sm" class="placeholder-btn pointer m-1"
                    v-for="item in filteredPlaceholders" :key="item.key" @click="item.copy?.()"
                    v-html="`${item.key}=> ${item.val}`"></BButton>
            </div>
        </BCol>
        <BCol cols="12" id="eled" class="wrapper bg-white border" v-if="ready">
            <EmailEditor ref="emailEditorRef" @load="editorLoaded" class="editor" :options="{
                excludeTools: ['html', 'social', 'button'],
            }" />
        </BCol>
    </BRow>
</template>

<script lang="ts" setup>
import { EmailEditor } from 'vue-email-editor';

const emailEditorRef = ref<InstanceType<typeof EmailEditor>>();
const lastSaved = ref(new Date());
const ready = ref(false);
const editorLoaded = async () => {
    console.log('editor loaded dude');
    loadDesign();
    autosave();
};

const exportDesign = () => {
    emailEditorRef.value?.editor?.saveDesign((design: any) => {
        copy(JSON.stringify(design));
    });
};
const resetDesign = () => {
    if (confirm('Are you sure?')) {
        emailEditorRef.value?.editor?.loadBlank();
        localStorage.removeItem('design');
    }
};
const mountPlaceholders = (toReplace: Record<string, any>) => {
    let placeholders: Record<string, string> = {};

    Object.entries(toReplace).map(([key, value]) => {
        if (value instanceof Object) {
            Object.entries(mountPlaceholders(value)).map(([child, v]) => {
                placeholders[`${key}.${child}`] = v;
            });
        }
        else {
            placeholders[key] = value;
        }
    });

    return placeholders;
};

const { copy } = useCopyToClipboard();

const dataUrl = ref('/api/json-mockup?which=user');
const generatedPlaceholders = ref<{ key: string, val: string; copy: () => void; }[]>([]);
const placeholderSearch = ref('');

const filteredPlaceholders = computed(() => {
    if (placeholderSearch.value.length === 0) return generatedPlaceholders.value || [];
    return generatedPlaceholders.value.filter(
        item => Boolean(item) && [item.key, item.val].join(' ').toLowerCase().includes(placeholderSearch.value.toLowerCase())
    ).map(item => {
        const regex = new RegExp(placeholderSearch.value, 'igm');
        return {
            copy: item.copy,
            key: item.key.replace(regex, ($1) => `<mark>${$1}</mark>`),
            val: `${item.val}`.replace(regex, ($1) => `<mark>${$1}</mark>`),
        };
    });
});

const importDesign = () => {
    const json = prompt('Place json Unlayer design here:');
    try {
        if (!json) return;
        const design = JSON.parse(json);
        emailEditorRef.value?.editor?.loadDesign(design);
    } catch (error) {
        alert('Invalid JSON');
    }
};

const generatePlaceholders = async () => {
    const response = await fetch(dataUrl.value);
    const data = await response.json();
    toReplace.value = data;
    generatedPlaceholders.value = Object.entries(mountPlaceholders(toReplace.value)).reduce((acc, cur) => {
        const [key, val] = cur;
        acc.push({ key, val, copy: () => copy(`{{${key}}}`) });
        return acc;
    }, [] as typeof generatedPlaceholders.value);
};

const parseHtml = (html: string, toReplace: Record<string, any>) => {
    const placeholders = mountPlaceholders(toReplace);
    console.log(placeholders);
    let parsedHtml = html;

    Object.entries(placeholders).forEach(([key, value]) => {
        parsedHtml = parsedHtml.replaceAll(`{{${key}}}`, value);
    });

    return parsedHtml;
};


const toReplace = ref<Record<string, any>>({});

const exportHtml = () => {
    if (!emailEditorRef.value) return;
    emailEditorRef.value.editor?.exportHtml((data) => {
        // open print window
        const parsedHtml = parseHtml(data.html, toReplace.value);
        const sheetPage = window.open('', '', 'height=1123,width=793');
        if (sheetPage) {
            sheetPage.document.body.firstElementChild?.remove();
            sheetPage.document.body.innerHTML = parsedHtml;
            setTimeout(() => {
                sheetPage.print();
            }, 1000);
        }
    });
};

const loadDesign = () => {
    if (!emailEditorRef.value) return;
    emailEditorRef.value.editor?.loadDesign(JSON.parse(localStorage.getItem('design') || '{}'));
};

const saveDesign = () => {
    if (!emailEditorRef.value) return;
    emailEditorRef.value?.editor?.saveDesign((design: any) => {
        localStorage.setItem('design', JSON.stringify(design));
        lastSaved.value = new Date();
    });
};

const autosaveEnabled = ref<boolean>(true);
const autoSaveInterval = ref<NodeJS.Timeout | null>(null);
const autosave = () => {
    if (autosaveEnabled.value) {
        autoSaveInterval.value = setTimeout(() => {
            saveDesign();
            autosave();
        }, 5000);
    }
};
onMounted(() => {
    // if (document) {
    //     new Editor({
    //         document, elementId: 'eled', save: onSave
    //     });
    // }
    ready.value = true;
});

watch(autosaveEnabled, (v) => {
    if (v) {
        console.log('Enabling autosave...');
        autosave();
    } else {
        console.log('Disabling autosave...');

    }
});
</script>

<style scoped>
.wrapper {
    height: 100%;
    width: 100%;
}

.editor {
    height: calc(100dvh - 10rem);
    background-color: rgba(0, 0, 0, .05);
    display: flex;
    justify-content: center;
    align-items: center;
}

.placeholders-wrap {
    height: 100px;
    overflow-y: auto;
    resize: vertical;
}

.placeholder-btn {
    height: 50px;
    width: fit-content;
}
</style>
