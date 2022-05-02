<script lang="ts" setup>
import {
  NCollapseItem, NSwitch,
} from 'naive-ui';
import { useImageEditorStore } from '@/stores/imageEditorStore';
import VButton from '@/components/kit/VButton.vue';

const imageEditorStore = useImageEditorStore();

const stopPropagationSwitchClickHandler = (event: Event) => {
  event.stopPropagation();
};

const filtersActiveSwitchUpdateHandler = (value: boolean) => {
  if (imageEditorStore.bitMapProcessing) {
    imageEditorStore.bitMapProcessing.filterChangeState(value);
  }
};

const grayscaleConversionButtonHandler = () => {
  if (imageEditorStore.bitMapProcessing) {
    imageEditorStore.bitMapProcessing.addOperation({
      type: 'filter',
      fn: imageEditorStore.bitMapProcessing.grayscaleConversion,
      params: [undefined],
    });
  }
};

const invertingButtonHandler = (threshold: number) => {
  if (imageEditorStore.bitMapProcessing) {
    imageEditorStore.bitMapProcessing.addOperation({
      type: 'filter',
      fn: imageEditorStore.bitMapProcessing.inverting,
      params: [threshold],
    });
  }
};

const colorToBinaryButtonHandler = (threshold: number) => {
  if (imageEditorStore.bitMapProcessing) {
    imageEditorStore.bitMapProcessing.addOperation(
      {
        type: 'filter',
        fn: imageEditorStore.bitMapProcessing.colorToBinary,
        params: [threshold],
      },
    );
  }
};
</script>

<template>
  <n-collapse-item title="Фильтры" name="filters">
    <template #header-extra>
      <n-switch
        size="small"
        :on-update:value="filtersActiveSwitchUpdateHandler"
        @click="stopPropagationSwitchClickHandler"
      />
    </template>
    <div class="manipulation">
      <v-button
        type="primary"
        fluid
        @click="grayscaleConversionButtonHandler"
      >
        Градация серого
      </v-button>
    </div>
    <div class="manipulation">
      <v-button
        type="primary"
        fluid
        @click="invertingButtonHandler(70)"
      >
        Инвентирование цветов
      </v-button>
    </div>
    <div class="manipulation">
      <v-button
        type="primary"
        fluid
        @click="colorToBinaryButtonHandler(70)"
      >
        Бинаризация изображения
      </v-button>
    </div>
  </n-collapse-item>
</template>

<style lang="scss" scoped>
.manipulation {
  padding: 0.5rem 0;
}
</style>
