<script lang="ts" setup>
import {
  onMounted, ref, watch,
} from 'vue';
import { useImageEditorStore } from '@/stores/imageEditorStore';
import { BitmapProcessing } from '@/utils/BitmapProcessing';
import { Tool } from '@/types';
import Pencil from '@/assets/icons/pencil.svg';
import Cursor from '@/assets/icons/cursor.svg';

const imageEditorStore = useImageEditorStore();

const canvas = ref<HTMLCanvasElement | null>(null);

const defaultTool: Tool = {
  name: 'default',
  img: Cursor,
  pointer: `url("${Cursor}"), auto`,
  isActive: true,
  toolOperation: () => {},
  toolOperationEnd: () => {},
};

const tools = ref<Array<Tool>>([
  defaultTool,
]);

onMounted(() => {
  if (canvas.value) {
    imageEditorStore.context = canvas.value.getContext('2d');
  }
});

const drawImage = (img: HTMLImageElement) => {
  if (imageEditorStore.context && canvas.value) {
    imageEditorStore.context.beginPath();
    imageEditorStore.context.clearRect(0, 0, canvas.value.width, canvas.value.height);
    canvas.value.width = img.width;
    canvas.value.height = img.height;
    imageEditorStore.context.drawImage(img, 0, 0);
    imageEditorStore.bitMapProcessing = new BitmapProcessing(
      imageEditorStore.context,
      img.width,
      img.height,
    );
    tools.value.push({
      name: 'pencil',
      img: Pencil,
      pointer: `url("${Pencil}") 2 20, auto`,
      isActive: false,
      toolOperation: imageEditorStore.bitMapProcessing.drawLine,
      toolOperationEnd: imageEditorStore.bitMapProcessing.drawLineReset,
    });
  }
};

watch((imageEditorStore.imageList), () => {
  if (imageEditorStore.imageList.length > 0) {
    drawImage(imageEditorStore.imageList[imageEditorStore.imageList.length - 1]);
    imageEditorStore.isSelectedBitmap = true;
  }
});

const activeTool = ref<Tool>(defaultTool);

const toolClickHandler = (tool: Tool) => {
  activeTool.value.isActive = false;
  activeTool.value = tool;
  activeTool.value.isActive = true;
};

let isTouchStart = false;
const mouseDownHandler = (event: MouseEvent) => {
  isTouchStart = true;
  activeTool.value.toolOperation(event.offsetX, event.offsetY);
};

const mouseMoveHandler = (event: MouseEvent) => {
  if (isTouchStart) {
    activeTool.value.toolOperation(event.offsetX, event.offsetY);
  }
};

const mouseUpHandler = () => {
  isTouchStart = false;
  activeTool.value.toolOperationEnd(0, 0);
};

const mouseLeaveHandler = () => {
  isTouchStart = false;
  activeTool.value.toolOperationEnd(0, 0);
};
</script>

<template>
  <div class="canvas-container">
    <canvas
      ref="canvas"
      class="canvas"
      width="0"
      height="0"
      :style="{ cursor: activeTool?.pointer ?? 'default' }"
      @mousedown="mouseDownHandler"
      @mousemove="mouseMoveHandler"
      @mouseup="mouseUpHandler"
      @mouseleave="mouseLeaveHandler"
    />
    <div class="tools">
      <div
        v-for="tool in tools"
        :key="tool.name"
        class="tool"
        :class="[{ active: tool.isActive }]"
        @click="toolClickHandler(tool)"
      >
        <img :src="tool.img" :alt="tool.name">
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.canvas-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  user-select: none;

  .tools {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #ffffff;
    display: flex;
    gap: 0.5rem;
    padding: 0.5rem;
    border-radius: 0.5rem;

    .tool {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem;
      border-radius: 0.5rem;
      cursor: pointer;

      &:hover {
        background-color: #e1e3e7;
      }

      &.active {
        background-color: #e1e3e7;
      }
    }
  }

  .canvas {
    max-height: 100%;
    overflow: hidden;
    object-fit: contain;
    //cursor: url("./../assets/icons/pencil.svg"), auto;
  }
}
</style>
