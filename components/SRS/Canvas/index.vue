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
          {{ pan }} {{ zoom }} {{ lastPointerPosition }}
          <div class="headers w-100 mb-5">
            <div class="d-flex gap-3 position-absolute top-0 end-0 pr-4 pt-2">
              <div class="close pointer" role="button" @click="toggleExpand">
                <FaIcon :icon="expanded ? 'minimize' : 'expand'" />
              </div>
              <div class="close pointer" role="button" @click="toggle">
                <FaIcon icon="times" />
              </div>
            </div>
            <h5 class="text-center">Requirement Map</h5>
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
            <SRSCanvasItem
              :requirement="item"
              v-for="(item, index) in data.requirements.functional"
              :key="item._key"
              @click="!isDragging && selectItem(item)"
              role="button"
              :id="item._key"
              @mouseenter="highlightDeps(item)"
              @mouseleave="removeHighlights"
            />
            <SRSCanvasLinks
              :requirements="data.requirements.functional"
              :key="data.id + data.requirements.functional.length"
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
    zoom.value = -0.2;
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

const highlightDeps = (item: SRS.Requirement) => {
  if (item.dependencies.length < 1) return;
  const curEl = document.getElementById(item._key);
  if (!curEl) return;

  item.dependencies.forEach((dep) => {
    if (!dep) return;
    const reqEl = document.getElementById(dep._key);
    reqEl?.classList.add('ref-highlight');
  });

  const wrapper = document.getElementById(`req-dep-link-${item._key}`);
  if (!wrapper) return;
  Object.values(wrapper.children).forEach((svg) => {
    if (svg.children[0]) {
      svg.children[0].classList.add('ref-highlight');
    }
  });
};

const removeHighlights = () => {
  if (typeof document === 'undefined') return;
  Object.values(document.getElementsByClassName('ref-highlight')).forEach(
    (el) => {
      el.classList.remove('ref-highlight');
    }
  );
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
  position: fixed;
  z-index: 3;
  height: 50px;
  width: 50px;
  right: 20px;
  bottom: 20px;
  transition: all 200ms;

  &.open {
    height: 50dvh;
    width: 100%;
    right: 0;
    bottom: 0;

    &.expanded {
      height: 100dvh !important;
    }
  }

  .close {
    z-index: 999;
  }

  .icon {
    height: 50px;
    width: 50px;
  }
}
</style>
