<template>
    <div class="bg-white py-5 d-flex justify-content-center">
        <BRow class="srs-editor shadow-sm">
            <!-- <BCol> PRODUCT LOGO - PRODUCT NAME - PRODUCT CODE </BCol> -->
            <div class="heading-title text-center" v-if="model">
                <h2>
                    <input class="srs-input text-center w-100" v-model="model.name" />
                </h2>
                <span class="w-100"><input class="srs-input text-center text-muted w-100"
                        v-model="model.subtitle" /></span>
            </div>
            <BCol cols="12" v-for="(value, key, index) in visibleSections" class="d-flex flex-column py-3"
                v-if="mounted">
                <label for="key" class="w-100">
                    <h4>{{ index + 1 }}.
                        <input :name="key" v-model="value.title" :placeholder="startCase(key)" class="srs-input w-75" />
                    </h4>
                </label>
                <div class="editor srs-input">
                    <QuillEditor v-model:content="value.content" theme="bubble" :id="`quill-${key}`" content-type="html"
                        :toolbar="toolbarOptions" />
                </div>
                <div class="requirement-specifications" v-if="model?.requirements">
                    <div class="d-flex flex-column gap-4" v-if="key === 'functionalRequirements'">

                        <SRSRequirement :requirement="item" v-for="item in model?.requirements.functional"
                            :key="item._key" />
                    </div>
                    <div v-else-if="key === 'nonFunctionalRequirements'">

                        <SRSRequirement :requirement="item" v-for="item in model?.requirements.nonFunctional"
                            :key="item._key" nonFunctional />
                    </div>
                </div>
            </BCol>
        </BRow>
    </div>
</template>
<script setup lang="ts">
import startCase from 'lodash.startcase';
import type { SRS } from '~/shared/types';
import type { QuillEditor } from '@vueup/vue-quill';

const mounted = ref(false);
const model = defineModel<SRS.Specification>();

const visibleSections = computed(() => Object.entries(model?.value?.sections || {}).filter(
    ([_, value]) => !value.invisible
).reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
}, {} as Record<string, SRS.Section>));

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    // ['blockquote', 'code-block'],
    ['link'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    // [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
    // [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    // [{ 'direction': 'rtl' }],                         // text direction

    // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    // [{ 'font': [] }],
    [{ 'align': [] }],

    // ['clean']                                         // remove formatting button
];

onMounted(() => {
    if (typeof document !== "undefined") {
        mounted.value = true;
    }
});
</script>

<style lang="scss" scoped>
.srs-editor {
    color: black;
    background: white;

    @media screen and (min-width: 599px) {
        padding: 1cm 2cm;
    }

    border: 1px dashed rgba(0, 0, 0, 0.125);
    width: 100%;
    max-width: 297mm
}

.srs-input {
    background-color: transparent;
    border: none;

    &:not(.text-muted) {
        color: black !important;
    }

    &:hover {
        background-color: rgba(0, 0, 0, .125) !important;
    }
}
</style>
