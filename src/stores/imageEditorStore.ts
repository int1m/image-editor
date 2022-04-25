import { BitmapProcessing } from '@/utils/BitmapProcessing';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useImageEditorStore = defineStore('imageEditor', () => {
  const imageList = ref<Array<HTMLImageElement>>([]);
  const context = ref<CanvasRenderingContext2D | null>(null);

  const isSelectedBitmap = ref(false);
  const bitMapProcessing = ref<BitmapProcessing | null>(null);

  return {
    imageList,
    context,
    isSelectedBitmap,
    bitMapProcessing,
  };
});
