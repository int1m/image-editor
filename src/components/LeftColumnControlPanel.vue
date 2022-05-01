<script lang="ts" setup>
import { ref, watch } from 'vue';
import {
  NUpload, NUploadDragger, NSlider, NCollapse, NCollapseItem, UploadCustomRequestOptions, UploadFileInfo,
} from 'naive-ui';

import { useImageEditorStore } from '@/stores/imageEditorStore';
import VButton from '@/components/kit/VButton.vue';

const imageEditorStore = useImageEditorStore();

const fileList = ref<Array<UploadFileInfo>>([]);

const uploadFileActionHandler = ({
  file,
  onFinish,
  onError,
  onProgress,
}: UploadCustomRequestOptions): void => {
  if (file.type === 'image/png'
    || file.type === 'image/jpg'
    || file.type === 'image/bmp'
    || file.type === 'image/jpeg') {
    onProgress({ percent: 1 });
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        const img = new Image(0, 0);
        img.src = reader.result;
        img.onload = () => {
          onFinish();
          img.height = img.naturalHeight;
          img.width = img.naturalWidth;
          onProgress({ percent: 100 });
          imageEditorStore.imageList.push(img);
        };
      }
    };

    if (file.file) {
      reader.readAsDataURL(file.file as Blob);
    }
  } else {
    onError();
  }

  setTimeout(() => {
    fileList.value.pop();
  }, 1000);
};

const grayscaleConversionButtonHandler = () => {
  if (imageEditorStore.bitMapProcessing) {
    imageEditorStore.bitMapProcessing.grayscaleConversion();
  }
};

const brightValue = ref(0);
const marks: { [key: number]: string } = {
  '-255': '-255',
  0: '0',
  255: '255',
};

const brightnessChangingButtonHandler = (valueChange: number) => {
  if (imageEditorStore.bitMapProcessing) {
    imageEditorStore.bitMapProcessing.brightnessChanging(valueChange);
  }
};

watch((brightValue), newBrightValue => {
  brightnessChangingButtonHandler(newBrightValue);
});

const imageInvertingButtonHandler = (threshold: number) => {
  if (imageEditorStore.bitMapProcessing) {
    imageEditorStore.bitMapProcessing.imageInverting(threshold);
  }
};

const imageColorToBinaryButtonHandler = (threshold: number) => {
  if (imageEditorStore.bitMapProcessing) {
    imageEditorStore.bitMapProcessing.imageColorToBinary(threshold);
  }
};
</script>

<template>
  <div class="control-panel">
    <div class="upload">
      <n-upload
        v-model:file-list="fileList"
        :custom-request="uploadFileActionHandler"
        accept=".png,.jpeg,.jpg,.bmp"
      >
        <n-upload-dragger>
          <div class="upload-zone-container">
            Загрузка
          </div>
        </n-upload-dragger>
      </n-upload>
    </div>
    <n-collapse
      v-if="imageEditorStore.isSelectedBitmap"
      class="bitmap-manipulation-container"
    >
      <n-collapse-item title="Фильтры" name="1">
        <div class="manipulation">
          <v-button
            type="primary"
            fluid
            @click="grayscaleConversionButtonHandler"
          >
            Применить градацию серого
          </v-button>
        </div>
        <div class="manipulation">
          <v-button
            type="primary"
            fluid
            @click="imageInvertingButtonHandler(70)"
          >
            Инвентировать цвета
          </v-button>
        </div>
        <div class="manipulation">
          <v-button
            type="primary"
            fluid
            @click="imageColorToBinaryButtonHandler(70)"
          >
            Бинаризировать изображение
          </v-button>
        </div>
      </n-collapse-item>
      <n-collapse-item title="Изменения" name="2">
        <div class="manipulation">
          <n-slider
            v-model:value="brightValue"
            :min="-255"
            :max="255"
            :step="1"
            :marks="marks"
            class="v-slider"
          />
        </div>
      </n-collapse-item>
    </n-collapse>
  </div>
</template>

<style lang="scss" scoped>
.control-panel {
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .upload {
    width: 100%;

    :deep(.n-upload) {
      width: 100%;

      .n-upload-trigger {
        width: 100%;
      }

      .n-upload-file-list {
      }
    }

    .upload-zone-container {
      width: 100%;
    }
  }

  .bitmap-manipulation-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .manipulation {
      padding: 0.5rem 0;
      //border-bottom: 1px solid #E5E5E5;

      :deep(.n-slider) {
        .n-slider-rail {
          .n-slider-rail__fill {
            background-color: transparent;
          }

          .n-slider-dots {
            .n-slider-dot--active {
              border: var(--n-dot-border);
            }
          }
        }
      }
    }
  }
}
</style>
