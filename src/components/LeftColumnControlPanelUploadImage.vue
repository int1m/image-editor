<script lang="ts" setup>
import { ref } from 'vue';
import {
  NUpload, NUploadDragger, UploadCustomRequestOptions, UploadFileInfo,
} from 'naive-ui';
import { useImageEditorStore } from '@/stores/imageEditorStore';

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
</script>

<template>
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
</template>

<style lang="scss" scoped>
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
</style>
