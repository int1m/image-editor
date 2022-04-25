<script lang="ts" setup>
import { computed } from 'vue';
import InlineSvg from 'vue-inline-svg';

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    default: 24,
  },
  fill: {
    type: String,
    default: 'black',
  },
  stroke: {
    type: String,
    default: null,
  },
  strokeWidth: {
    type: Number,
    default: null,
  },
});

const srcValue = computed(() => props.src);
const className = computed(() => `r1-icon-svg r1-icon-svg--${props.name}`);
const width = computed(() => props.size);
</script>

<template>
  <inline-svg
    :src="srcValue"
    :alt="`${props.name} icon`"
    :class="className"
    :style="{ width, height: 'auto', outline: 'none' }"
    :fill="fill"
    :stroke="props.stroke"
    :stroke-width="props.strokeWidth"
    :title="props.name"
  />
</template>
