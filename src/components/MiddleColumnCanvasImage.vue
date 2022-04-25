<script lang="ts" setup>
import {
  onMounted, ref, watch,
} from 'vue';
import { useImageEditorStore } from '@/stores/imageEditorStore';
import { BitmapProcessing } from '@/utils/BitmapProcessing';

const imageEditorStore = useImageEditorStore();

const canvas = ref<HTMLCanvasElement | null>(null);

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
  }
};

watch((imageEditorStore.imageList), () => {
  if (imageEditorStore.imageList.length > 0) {
    drawImage(imageEditorStore.imageList[imageEditorStore.imageList.length - 1]);
    imageEditorStore.isSelectedBitmap = true;
  }
});
</script>

<template>
  <div class="canvas-container">
    <canvas ref="canvas" class="canvas" />
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
  border: 4px dashed #7B71C6;
  border-radius: 0.7rem;
  padding: 0.5rem;

  .canvas {
    max-height: 100%;
    overflow: hidden;
    object-fit: contain;
  }
}
</style>
