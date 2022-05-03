<script lang="ts" setup>
import {
  NCollapseItem,
} from 'naive-ui';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  Filler,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
} from 'chart.js';
import { ref } from 'vue';
import { Line } from 'vue-chartjs';
import { useImageEditorStore } from '@/stores/imageEditorStore';
import VButton from '@/components/kit/VButton.vue';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  Filler,
);
const imageEditorStore = useImageEditorStore();

const isHistogramActive = ref(false);
const xLabels = new Array<number>(256).fill(0)
  .map((item, index) => index);

const chartData = ref({
  labels: xLabels,
  datasets: [
    {
      label: 'Red',
      backgroundColor: 'rgba(248, 121, 121, 0.3)',
      fill: 'origin',
      borderColor: '#f87979',
      data: [] as Array<number>,
      pointRadius: 0,
      cubicInterpolationMode: 'monotone',
    },
    {
      label: 'Green',
      backgroundColor: 'rgba(72, 175, 40, 0.3)',
      fill: 'origin',
      borderColor: '#48af28',
      data: [] as Array<number>,
      pointRadius: 0,
    },
    {
      label: 'Blue',
      backgroundColor: 'rgba(82, 146, 239, 0.3)',
      fill: 'origin',
      borderColor: '#5292ef',
      data: [] as Array<number>,
      pointRadius: 0,
    },
  ],
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
};

const getBrightnessHistogramButtonHandler = () => {
  if (imageEditorStore.bitMapProcessing) {
    const colorsShades = imageEditorStore.bitMapProcessing.getBrightnessHistogram();
    chartData.value.datasets[0].data = colorsShades.colorsRedShades;
    chartData.value.datasets[1].data = colorsShades.colorsGreenShades;
    chartData.value.datasets[2].data = colorsShades.colorsBlueShades;
    isHistogramActive.value = true;
  }
};
</script>

<template>
  <n-collapse-item title="Гистограммы" name="histograms">
    <div class="manipulation">
      <v-button
        type="primary"
        fluid
        @click="getBrightnessHistogramButtonHandler"
      >
        Гистограмма яркости
      </v-button>
      <Line
        v-if="isHistogramActive"
        :chart-data="chartData"
        :chart-options="chartOptions"
        class="brightness-histogram-plot"
      />
    </div>
  </n-collapse-item>
</template>

<style lang="scss" scoped>
.manipulation {
  padding: 0.5rem 0;

  .brightness-histogram-plot {
    margin-top: 0.5rem;
  }
}
</style>
