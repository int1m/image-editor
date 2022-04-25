<script lang="ts" setup>
import LeftColumnControlPanel from '@/components/LeftColumnControlPanel.vue';
import MiddleColumnCanvasImage from '@/components/MiddleColumnCanvasImage.vue';
</script>

<template>
  <div class="main-container">
    <div class="left-column">
      <left-column-control-panel />
    </div>
    <div class="middle-column">
      <middle-column-canvas-image />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-container {
  --left-column-width: 360px;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  height: calc(var(--vh, 1vh) * 100);
  width: 100%;
  overflow: hidden;

  @media (min-width: 927px) {
    height: 100%;
    flex-direction: row;
  }

  .left-column {
    height: 100%;
    max-height: 200px;
    width: 100%;
    overflow: hidden;
    position: relative;
    background-color: #ffffff;

    @media (min-width: 927px) {
      min-width: var(--left-column-width);
      max-width: var(--left-column-width);
      max-height: unset;
    }
  }

  .middle-column {
    width: 100%;
    height: 100%;
    padding: 0.5rem;
    overflow: hidden;
  }
}
</style>
