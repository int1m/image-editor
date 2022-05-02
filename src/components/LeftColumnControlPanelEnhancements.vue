<script lang="ts" setup>
import { ref, watch } from 'vue';
import {
  NSlider, NCollapseItem, NSwitch,
} from 'naive-ui';
import { useImageEditorStore } from '@/stores/imageEditorStore';

const imageEditorStore = useImageEditorStore();

const stopPropagationSwitchClickHandler = (event: Event) => {
  event.stopPropagation();
};

const enhancementsActiveSwitchUpdateHandler = (value: boolean) => {
  if (imageEditorStore.bitMapProcessing) {
    imageEditorStore.bitMapProcessing.enhancementsChangeState(value);
  }
};

const marks: { [key: number]: string } = {
  '-255': '-255',
  0: '0',
  255: '255',
};

const brightValue = ref(0);
const brightnessChangingHandler = (valueChange: number) => {
  if (imageEditorStore.bitMapProcessing) {
    imageEditorStore.bitMapProcessing.addOperation({
      type: 'enhancement',
      fn: imageEditorStore.bitMapProcessing.brightnessChanging,
      params: [valueChange],
    });
  }
};

watch((brightValue), newBrightValue => {
  brightnessChangingHandler(newBrightValue);
});

const contrastValue = ref(0);
const contrastChangingHandler = (valueChange: number) => {
  if (imageEditorStore.bitMapProcessing) {
    imageEditorStore.bitMapProcessing.addOperation({
      type: 'enhancement',
      fn: imageEditorStore.bitMapProcessing.contrastChanging,
      params: [valueChange],
    });
  }
};

watch((contrastValue), newContrastValue => {
  contrastChangingHandler(newContrastValue);
});

const marksGamma: { [key: number]: string } = {
  '-255': '-255',
  '-190': '-190',
  255: '255',
};

const gammaValue = ref(-190);
const gammaChangingHandler = (valueChange: number) => {
  if (imageEditorStore.bitMapProcessing) {
    imageEditorStore.bitMapProcessing.addOperation({
      type: 'enhancement',
      fn: imageEditorStore.bitMapProcessing.gammaChanging,
      params: [valueChange],
    });
  }
};

watch((gammaValue), newGammaValue => {
  gammaChangingHandler(newGammaValue);
});
</script>

<template>
  <n-collapse-item title="Изменения" name="enhancements">
    <template #header-extra>
      <n-switch
        size="small"
        :on-update:value="enhancementsActiveSwitchUpdateHandler"
        @click="stopPropagationSwitchClickHandler"
      />
    </template>
    <div class="manipulation">
      <div class="manipulation-label">
        Изменение яркости
      </div>
      <n-slider
        v-model:value="brightValue"
        :min="-255"
        :max="255"
        :step="1"
        :marks="marks"
        class="v-slider"
      />
    </div>
    <div class="manipulation">
      <div class="manipulation-label">
        Изменение контраста
      </div>
      <n-slider
        v-model:value="contrastValue"
        :min="-255"
        :max="255"
        :step="1"
        :marks="marks"
        class="v-slider"
      />
    </div>
    <div class="manipulation">
      <div class="manipulation-label">
        Изменение гаммы
      </div>
      <n-slider
        v-model:value="gammaValue"
        :min="-255"
        :max="255"
        :step="1"
        :marks="marksGamma"
        class="v-slider"
      />
    </div>
  </n-collapse-item>
</template>

<style lang="scss" scoped>
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
</style>
