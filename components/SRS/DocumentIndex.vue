<template>
  <div
    class="text-dark req-summary-index bg-white rounded position-relative"
    :class="{ 'open border': isOpen }"
  >
    <div>
      <Transition :name="isOpen ? 'fade' : ''">
        <div class="summary p-3" v-if="isOpen">
          <BInputGroup>
            <BInputGroupText><faIcon icon="search" /></BInputGroupText>
            <BFormInput v-model="search" />
          </BInputGroup>
          <div class="summary-list py-3">
            <div
              class="summary-item"
              v-for="item in requirements"
              v-if="requirements.length > 0"
            >
              <faIcon
                :icon="item.done ? 'check-circle' : 'times-circle'"
                :class="item.done ? 'text-success' : 'text-danger'"
              />
              <a
                @click="highlight(`${getRequirementId(currentTab, item._key)}`)"
                :href="`#${getRequirementId(currentTab, item._key)}`"
                >[{{ item.id }}] {{ item.title }}</a
              >
            </div>
            <div v-else class="text-center p-4">Nothing to show.</div>
          </div>
        </div>
      </Transition>
      <div class="action-buttons position-absolute">
        <FaIcon
          v-if="isOpen"
          icon="times"
          class="pointer fa-2x pt-1 pl-2 text-dark"
          @click="toggle"
        />
        <FaIcon
          icon="table"
          v-else
          class="pointer fa-2x pt-1 pl-2 text-dark"
          @click="toggle"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { SRS } from '~/shared/types';
import { getRequirementId } from '~/shared/getRequirementKey';

const { data } = defineProps<{
  data: SRS.ShortRequirement[];
}>();

const { isOpen, toggle } = useDisclosure();

const search = ref('');

const currentTab = useCurrentSRSTab();

const requirements = computed(() =>
  data.filter((r) => {
    const keyFilters = search.value.match(/is:(done|undone|FR|NF)/);
    const conditions = [];
    if (keyFilters?.includes('is:done')) conditions.push(r.done === true);
    else if (keyFilters?.includes('is:undone')) conditions.push(!r.done);
    if (keyFilters?.includes('is:FR')) conditions.push(r.id.startsWith('FR'));
    if (keyFilters?.includes('is:NF')) conditions.push(r.id.startsWith('NF'));
    let textSearch = search.value;
    if (keyFilters) {
      textSearch = search.value
        .split(' ')
        .filter((item) => !keyFilters.includes(item))
        .join(' ');
    }

    conditions.push(
      `${r.id.toLowerCase()} ${r.title.toLowerCase()}`.includes(
        textSearch.toLowerCase()
      )
    );
    console.log(textSearch, conditions);
    return conditions.every((c) => c);
  })
);

const highlight = (elId: string) => {
  if (typeof document === 'undefined') return;

  const el = document.getElementById(elId);
  if (!el) return;

  setTimeout(() => {
    el.classList.add('highlight');
  }, 100);

  setTimeout(() => {
    el.classList.remove('highlight');
  }, 2000);
};
</script>

<style lang="scss">
.req-summary-index {
  width: 50px;
  height: 50px;
  transition: all 200ms;
  &.open {
    height: 50dvh;
    width: 300px;
  }

  .summary-list {
    height: 40dvh;
    overflow-y: auto;
  }

  .action-buttons {
    bottom: 5px;
    right: 9px;
  }
}
</style>
