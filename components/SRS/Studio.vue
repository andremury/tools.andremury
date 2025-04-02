<template>
    <BContainer class="w-100">
        <h1 class="text-center my-5">Software Requirement Specification Studio</h1>
        <SRSToolbar :current-doc="doc" @create-new="onCreateNewDoc" @load-doc="onLoadDoc" />
        <div class="settings border p-3" v-if="false">
            <h5 role="button" class="pointer" v-b-toggle="'collapse-settings'">
                Settings
            </h5>
            <BCollapse id="collapse-settings">
                <div class="section-visibility">
                    <BTable v-bind="tableOpts">
                        <template #cell(key)="{ item }">
                            <input type="checkbox" v-model="item.invisible" />
                        </template>
                    </BTable>
                </div>
            </BCollapse>
        </div>

        <SRSEditor v-model="doc" class="z1" />
        <!-- <SRSDocument :data="doc" class="z1" /> -->
        <SRSCanvas :data="doc" class="position-relative" :key="doc.id" />
    </BContainer>
</template>

<script setup lang="ts">
import { type SRS } from '~/shared/types';
import { toast } from 'vue3-toastify';
import type { TableField } from 'bootstrap-vue-next';
import startCase from 'lodash.startcase';

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
    subtitle: "Software Requirement Specification",
    sections: {
        introduction: emptySection('Introduction', 'Introduction to my requirements.'),
        productOverview: emptySection('Product Overview', 'The overview of my product.'),
        constraints: emptySection('Constraints', 'The restrictions of this document'),
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

const onCreateNewDoc = () => {
    doc.value = { ...emptyObj() };

    toast.success(`New document created.`);
};

const onLoadDoc = (spec: SRS.Specification) => {
    doc.value = spec;
};

const tableOpts = computed(() => {
    const fields: TableField<SRS.Section>[] = [
        {
            key: 'hide',
            label: 'Hide',
        }, {
            key: 'sectionName',
            label: 'Section Name',
            formatter: (_1, _2, section) => startCase(section.title)
        }
    ];

    const items = Object.entries(doc.value.sections).map(([key, value]) => ({
        sectionName: key,
        ...value
    }));

    return { fields, items };
})

</script>

<style>
.z1 {
    z-index: 1;
}

.z0 {
    z-index: 0;
}
</style>
