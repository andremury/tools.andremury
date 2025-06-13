<template>
  <div class="srs-canvas">
    <div
      class="canvas-content overflow-hidden"
      :class="{ 'open bg-dark p-3 overflow-auto': isOpen, expanded }"
      @wheel="setPan"
    >
      <div
        class="icon border rounded-circle bg-white shadow-sm text-info d-flex align-items-center justify-content-center pointer"
        v-if="!isOpen"
        role="button"
        @click="toggle"
      >
        <FaIcon icon="diagram-project" class="fa-2x mt-1" />
      </div>
      <Transition mode="out-in">
        <div v-if="isOpen">
          p {{ pan }} - z {{ zoom }} - lpp {{ lastPointerPosition }}
          <div class="headers w-100 mb-5">
            <div
              class="action-buttons d-flex gap-3 position-absolute end-0 pr-4 pt-2"
            >
              <div class="close pointer" role="button" @click="resetPosition">
                <FaIcon icon="refresh" />
              </div>
              <div class="close pointer" role="button" @click="toggleExpand">
                <FaIcon :icon="expanded ? 'minimize' : 'expand'" />
              </div>
              <div class="close pointer" role="button" @click="toggle">
                <FaIcon icon="times" />
              </div>
            </div>
            <h5 class="text-center">{{ title }}</h5>
            <div class="text-center w-100 mb-3">
              <BButton
                :variant="chartType === 'DAG' ? 'primary' : 'secondary'"
                @click="chartType = 'DAG'"
                >Requirement Map</BButton
              >
              <BButton
                :variant="chartType === 'DEPTREE' ? 'primary' : 'secondary'"
                @click="chartType = 'DEPTREE'"
                class="mx-3"
                >Precedence Trees</BButton
              >
              <BButton
                :variant="chartType === 'DEVPLAN' ? 'primary' : 'secondary'"
                @click="chartType = 'DEVPLAN'"
                >Development Planner</BButton
              >
            </div>
          </div>
          <div
            class="srs-section d-flex gap-5 flex-wrap justify-content-center position-relative"
            v-if="data.requirements.functional.length > 0"
            :style="{
              transform: `translate(${pan.x}px,${pan.y}px) scale(${zoom})`,
              transformOrigin: '50% 0',
            }"
            @mousedown="watchDrag"
            ref="canvasRef"
          >
            <SRSCanvasDAG
              @click="!isDragging && selectItem($event)"
              :data="data.requirements.functional"
              v-if="chartType === 'DAG'"
            />
            <SRSCanvasDEPTREE
              @click="!isDragging && selectItem($event)"
              :data="data.requirements.functional"
              v-if="chartType === 'DEPTREE'"
            />
            <SRSCanvasDEVPLANNER
              @click="!isDragging && selectItem($event)"
              :data="data.requirements.functional"
              v-if="chartType === 'DEVPLAN'"
            />
          </div>

          <div
            v-else
            class="text-secondary d-flex align-items-center justify-content-center h-100 w-100 mt-5"
          >
            No requirements to show. Add requirements on "Functional
            Requirements" tab to show the diagram.
          </div>
        </div>
      </Transition>
      <SRSRequirementsDetailModal
        v-model="modalIsOpen"
        @close="closeModal"
        :requirement="selectedItem"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { type SRS } from '~/shared/types';
const { data } = defineProps<{
  data: SRS.Specification;
}>();

const { isOpen: modalIsOpen, toggle: toggleModal } = useDisclosure();
const { isOpen, toggle } = useDisclosure();
const { isOpen: expanded, toggle: toggleExpand } = useDisclosure();

const canvasRef = ref<HTMLElement | null>();

const selectedItem = ref<SRS.Requirement>();

const pan = ref({ x: 0, y: 0, z: 0 });
const zoom = ref(1);
const isDragging = ref(false);
const lastPointerPosition = ref<{ x: number; y: number }>({ x: 0, y: 0 });

const resetPosition = () => {
  if (!canvasRef.value) {
    zoom.value = 1;
    return;
  }

  let xOffset = 0;
  const wSize = window?.innerWidth;
  const cSize = canvasRef.value.children[0].clientWidth;

  if (cSize > wSize) {
    xOffset = (cSize - wSize) / 2;
  }

  zoom.value = 1;
  pan.value = { x: xOffset + 20, y: 0, z: 0 };
};

const chartType = shallowRef<'DAG' | 'DEVPLAN' | 'DEPTREE'>('DAG');
watch(chartType, (v) => {
  setTimeout(() => {
    resetPosition();
  }, 1);
});

const title = computed(() => {
  if (chartType.value === 'DAG') return 'Requirement Map';
  if (chartType.value === 'DEPTREE') return 'Dependence Trees';
  if (chartType.value === 'DEVPLAN') return 'Development Planner';
  return 'No tab selected';
});

const setPosition = (e: MouseEvent) => {
  pan.value.x += e.clientX - lastPointerPosition.value.x;
  pan.value.y += e.clientY - lastPointerPosition.value.y;

  lastPointerPosition.value = {
    x: e.clientX,
    y: e.clientY,
  };
};

const onDragEnd = (e: MouseEvent) => {
  e.preventDefault();
  window.removeEventListener('mousemove', setPosition);
  window.removeEventListener('mouseup', onDragEnd);
  setTimeout(() => {
    isDragging.value = false;
  }, 100);
};

const onDragStart = (e: MouseEvent) => {
  isDragging.value = true;
  window.addEventListener('mouseup', onDragEnd);
  window.addEventListener('mousemove', setPosition);
};

const watchDrag = (e: MouseEvent) => {
  lastPointerPosition.value = {
    x: e.clientX,
    y: e.clientY,
  };
  const watchPointer = (e: MouseEvent) => {
    if (
      Math.abs(e.clientX - lastPointerPosition.value.x) > 10 ||
      Math.abs(e.clientY - lastPointerPosition.value.y) > 10
    ) {
      window.removeEventListener('mousemove', watchPointer);
      e.preventDefault();
      onDragStart(e);
    }
  };

  window.addEventListener('mousemove', watchPointer);
  window.addEventListener('mouseup', () => {
    window.removeEventListener('mousemove', watchPointer);
  });
};

const setPan = (e: WheelEvent) => {
  e.preventDefault();

  const delta = e.deltaY > 0 ? -1 : 1;

  zoom.value += delta / 10;

  //   const rect = canvasRef.value!.getBoundingClientRect();

  //   const mouseX = e.clientX - rect.left;
  //   const mouseY = e.clientY - rect.top;

  //   const dx = mouseX / zoom.value;
  //   const dy = mouseY / zoom.value;

  //   pan.value.x -= dx * delta - 1;
  //   pan.value.y -= dy * delta - 1;

  if (zoom.value < 0.2 && delta < 0) {
    zoom.value = 0.2;
  } else if (zoom.value > 2) {
    zoom.value = 2;
  }
};

const selectItem = (item: SRS.Requirement) => {
  if (selectedItem.value?.id === item.id) selectedItem.value = undefined;
  else {
    selectedItem.value = item;
    toggleModal();
  }
};

const closeModal = () => {
  toggleModal();
  selectedItem.value = undefined;
};

watch(isOpen, (open) => {
  if (open) {
    document.body.style.marginBottom = '49dvh';
  } else {
    document.body.style.marginBottom = '0';
  }
});
</script>

<style>
.ref-highlight {
  filter: drop-shadow(0 0 0.5em rgb(255, 253, 124)) !important;
  stroke-width: 10px !important;
}

.dependency-links path {
  stroke-width: 2;
  transition: all 200ms;
}

.canvas-item {
  width: 200px;
  word-break: normal;
  user-select: none;
  transition: all 200ms;
  z-index: 1;
}

.svg-container {
  z-index: 0;
}
</style>
<style lang="scss" scoped>
.rf-content {
  text-shadow: 1px 0 0 white;
}

.srs-section {
  z-index: 1;
}

.srs-canvas > .canvas-content {
  z-index: 3;
  height: 50px;
  width: 50px;
  transition: all 200ms;

  &.open {
    height: 50dvh;
    width: 100dvw;
    right: 0;
    bottom: 0;
    margin-right: -10px;
    margin-bottom: -10px;

    &.expanded {
      height: 100dvh !important;
    }
  }

  .close {
    z-index: 999;
  }
  .action-buttons {
    margin-top: -10px;
  }

  .icon {
    height: 50px;
    width: 50px;
  }
}
</style>
