<template>
    <div class="srs-canvas">
        {{ selectedItem }}
        <div class="srs-section d-flex gap-3 flex-wrap" v-for="type in types">
            <div class="srs-rf rounded border shadow-sm text-dark p-3 d-flex align-items-center justify-content-center pointer"
                v-for="(item, index) in data.requirements[type]" :key="item._key" :style="{
                    backgroundColor: item.color || 'blanchedalmond'
                }" @click="selectItem(item)" role="button">
                {{ item.title }}
                <small v-for="dep in item.dependencies">
                    {{ dep }}
                </small>
            </div>
        </div>
        <BModal id="details-modal" v-model="isOpen">
            <template #header-close>
                <div class="close" @click="toggle()" role="button">&times;</div>
            </template>
            <template #header>
                <h3><b>[{{ selectedItem?.id }}] {{ selectedItem?.title }}</b></h3>
            </template>

            {{ selectedItem?.text }}<br />
            {{ selectedItem?.priority }}<br />
            {{ selectedItem?.color }}<br />
            {{ selectedItem?.dependencies }}<br />
            {{ selectedItem?.entities }}
        </BModal>
    </div>
</template>

<script setup lang="ts">
import { type SRS } from '~/shared/types';
defineProps<{
    data: SRS.Specification;
}>();

const { isOpen, toggle } = useDisclosure();

const selectedItem = ref<SRS.Requirement>();

const selectItem = (item: SRS.Requirement) => {
    if (selectedItem.value?.id === item.id)
        selectedItem.value = undefined;
    else {
        selectedItem.value = item;
        toggle();
    };


};

const types: (keyof SRS.Specification['requirements'])[] = ['functional', 'nonFunctional']

</script>

<style lang="scss" scoped>
.srs-rf {
    width: 200px;
    word-break: break-all;
    user-select: none;
}
</style>
