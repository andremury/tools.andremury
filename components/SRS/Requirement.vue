<template>
  <div
    class="doc-requirement w-100"
    :id="`doc-${requirement._key}`"
    :class="{
      'd-flex flex-column gap-4': !nonFunctional,
      'pl-3': nonFunctional,
    }"
  >
    <div
      class="title"
      :class="[
        nonFunctional
          ? ''
          : 'border text-center bg-blue-grey text-white py-2 rounded',
      ]"
    >
      <b>[{{ requirement.id }}] {{ requirement.title }}</b>
    </div>
    <div>
      <div class="actors" v-if="!nonFunctional && requirement.actors">
        Actors: {{ requirement.actors }}
      </div>
      <div
        class="dependencies d-flex gap-2 flex-wrap"
        v-if="
          !nonFunctional && requirement.dependencies.filter(Boolean).length > 0
        "
        F
      >
        Depends on: <br />
        <span v-for="dep in requirement.dependencies" :key="dep?._key">
          <a
            :href="`#${getRequirementId(currentTab, dep?._key)}`"
            v-b-tooltip.hover="dep?.title"
          >
            {{ dep?.id }}
          </a>
        </span>
      </div>
      <div
        class="related-requirements d-flex gap-2 flex-wrap"
        v-if="!nonFunctional && requirement.relatedRequirements?.length > 0"
      >
        Mentioned by: <br />
        <span v-for="dep in requirement.relatedRequirements" :key="dep?._key">
          <a
            :href="`#${getRequirementId(currentTab, dep?._key)}`"
            v-b-tooltip.hover="dep?.title"
          >
            {{ dep?.id }}
          </a>
        </span>
      </div>
    </div>
    <div
      class="description ql-editor"
      :class="{ 'border p-3 rounded': !nonFunctional }"
      v-html="requirement.text"
    ></div>
    <div
      class="entities border p-3 rounded"
      v-if="!nonFunctional && requirement.entities.length > 0"
    >
      <h5>Entities</h5>
      <div
        class="entity mb-5"
        v-for="(entity, index) in requirement.entities"
        :key="+index"
      >
        <hr />
        <h6>
          {{ index + 1 }}. <b>{{ entity?.name }}</b>
        </h6>
        <div v-html="entity.description"></div>

        <BTable
          :fields="entityFields"
          striped
          :items="entity.fields"
          v-if="entity?.fields.length"
        />
      </div>
    </div>
    <div class="priority py-2" v-if="!nonFunctional">
      <p class="text-center">Priority:</p>
      <div class="d-flex gap-4 justify-content-center">
        <div
          class="border rounded py-1 px-3 d-md-block"
          :class="[
            requirement.priority === 'Essential'
              ? 'bg-success text-white d-block'
              : 'd-none',
          ]"
        >
          Essential
        </div>
        <div
          class="border rounded py-1 px-3 d-md-block"
          :class="[
            requirement.priority === 'Important'
              ? 'bg-success text-white d-block'
              : 'd-none',
          ]"
        >
          Important
        </div>
        <div
          class="border rounded py-1 px-3 d-md-block"
          :class="[
            requirement.priority === 'Desirable'
              ? 'bg-success text-white d-block'
              : 'd-none',
          ]"
        >
          Desirable
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TableField } from 'bootstrap-vue-next';
import startCase from 'lodash.startcase';
import { getRequirementId } from '~/shared/getRequirementKey';
import type { SRS } from '~/shared/types';

defineProps<{
  requirement: SRS.Requirement;
  nonFunctional?: boolean;
}>();
const currentTab = useCurrentSRSTab();
const entityFields: TableField<SRS.FieldSpec>[] = [
  {
    key: 'name',
    formatter: (_1, _2, item) =>
      `${item.required ? '*' : ''}${item.name}`,
  },
  {
    key: 'type',
  },
  {
    key: 'description',
  },
];
</script>

<style lang="scss" scoped>
.bg-blue-grey {
  background-color: rgb(92, 92, 131);
}

.doc-requirement {
  &:not(:first-of-type) {
    margin-top: 2rem;
    border-top: 1px dashed rgb(219, 219, 219);
    padding-top: 4rem;
  }
}
</style>
