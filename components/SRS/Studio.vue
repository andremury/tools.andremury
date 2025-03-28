<template>
    <BContainer class="w-100">
        <h1 class="text-center">Software Requirement Specification Studio</h1>
        <SRSEditor v-model="doc" class="z1" />
        <!-- <SRSDocument :data="doc" class="z1" /> -->
        <hr />
        <SRSCanvas :data="doc" class="position-relative z0 mt-3 mb-5" />
    </BContainer>
</template>

<script setup lang="ts">

import { type SRS } from '~/shared/types';

const emptySection = (title = '', content = '') => <SRS.Section>{
    content,
    title
};

const emptyObj = () => <SRS.Specification>({
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
</script>

<style>
.z1 {
    z-index: 1;
}

.z0 {
    z-index: 0;
}
</style>
