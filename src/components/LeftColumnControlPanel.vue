<script lang="ts" setup>
import {
  NCollapse,
  NScrollbar,
} from 'naive-ui';

import { useImageEditorStore } from '@/stores/imageEditorStore';
import LeftColumnControlPanelUploadImage from '@/components/LeftColumnControlPanelUploadImage.vue';
import LeftColumnControlPanelFilters from '@/components/LeftColumnControlPanelFilters.vue';
import LeftColumnControlPanelEnhancements from '@/components/LeftColumnControlPanelEnhancements.vue';
import LeftColumnControlPanelHistograms from '@/components/LeftColumnControlPanelHistograms.vue';

const imageEditorStore = useImageEditorStore();
</script>

<template>
  <n-scrollbar>
    <div class="control-panel">
      <LeftColumnControlPanelUploadImage />
      <n-collapse
        v-if="imageEditorStore.isSelectedBitmap"
        class="bitmap-manipulation-container"
      >
        <LeftColumnControlPanelFilters />
        <LeftColumnControlPanelEnhancements />
        <LeftColumnControlPanelHistograms />
      </n-collapse>
    </div>
  </n-scrollbar>
</template>

<style lang="scss" scoped>
.control-panel {
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .bitmap-manipulation-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .manipulation {
      padding: 0.5rem 0;
    }
  }
}
</style>
