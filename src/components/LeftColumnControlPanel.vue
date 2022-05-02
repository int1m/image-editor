<script lang="ts" setup>
import {
  NCollapse,
} from 'naive-ui';

import { useImageEditorStore } from '@/stores/imageEditorStore';
import LeftColumnControlPanelUploadImage from '@/components/LeftColumnControlPanelUploadImage.vue';
import LeftColumnControlPanelFilters from '@/components/LeftColumnControlPanelFilters.vue';
import LeftColumnControlPanelEnhancements from '@/components/LeftColumnControlPanelEnhancements.vue';

const imageEditorStore = useImageEditorStore();
</script>

<template>
  <div class="control-panel">
    <LeftColumnControlPanelUploadImage />
    <n-collapse
      v-if="imageEditorStore.isSelectedBitmap"
      class="bitmap-manipulation-container"
    >
      <LeftColumnControlPanelFilters />
      <LeftColumnControlPanelEnhancements />
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

  .bitmap-manipulation-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .manipulation {
      padding: 0.5rem 0;

      .manipulation-label {
        user-select: none;
      }

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
