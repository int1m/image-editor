<script lang="ts" setup>
import {
  NConfigProvider,
  NLoadingBarProvider,
  NMessageProvider,
  NDialogProvider,
  GlobalThemeOverrides,
} from 'naive-ui';

import { useGetCSSVariable } from '@/hooks/useCssVariables';

const borderRadiusDefault = useGetCSSVariable('--border-radius-default');
const colorText = useGetCSSVariable('--color-text');
const colorShadowDefault = useGetCSSVariable('--color-default-shadow');

const themeOverrides: GlobalThemeOverrides = {
  common: {
    // primaryColor: '#FF0000',
  },
  Select: {
    peers: {
      InternalSelection: {
        // textColor: '#FF0000',
      },
    },
  },
  Popover: {
    textColor: colorText,
    borderRadius: borderRadiusDefault,
    padding: '0px',
    boxShadow: `0 0.25rem 0.5rem 0.125rem ${colorShadowDefault}`,
  },
  Scrollbar: {
    color: 'rgba(0, 0, 0, 0.2)',
    colorHover: 'rgba(0, 0, 0, 0.2)',
  },
};
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-loading-bar-provider>
      <n-message-provider>
        <n-dialog-provider>
          <slot />
        </n-dialog-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>
