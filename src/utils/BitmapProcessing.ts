import { Uint8ClampedArrayIterable } from '@/utils/Uint8ClampedArrayIterable';
import { RGBA } from '@/utils/RGBA';

type GrayscaleConversionArgs = readonly [undefined];
type GrayscaleConversion = (...args: GrayscaleConversionArgs) => void;

type ImageInvertingArgs = readonly [number];
type ImageInverting = (...args: ImageInvertingArgs) => void;

type ImageColorToBinaryArgs = readonly [number];
type ImageColorToBinary = (...args: ImageColorToBinaryArgs) => void;

type BrightnessChangingArgs = readonly [number];
type BrightnessChanging = (...args: BrightnessChangingArgs) => void;

type ContrastChangingArgs = readonly [number];
type ContrastChanging = (...args: ContrastChangingArgs) => void;

type GammaChangingArgs = readonly [number];
type GammaChanging = (...args: GammaChangingArgs) => void;

export interface GrayscaleConversionFilter {
  type: 'filter',
  fn: GrayscaleConversion,
  params: GrayscaleConversionArgs,
}

export interface ImageInvertingFilter {
  type: 'filter',
  fn: ImageInverting,
  params: ImageInvertingArgs,
}

export interface ImageColorToBinaryFilter {
  type: 'filter',
  fn: ImageColorToBinary,
  params: ImageColorToBinaryArgs,
}

export interface BrightnessChangingEnhancement {
  type: 'enhancement',
  fn: BrightnessChanging,
  params: BrightnessChangingArgs,
}

export interface ContrastChangingEnhancement {
  type: 'enhancement',
  fn: ContrastChanging,
  params: ContrastChangingArgs,
}

export interface GammaChangingEnhancement {
  type: 'enhancement',
  fn: GammaChanging,
  params: GammaChangingArgs,
}

type Filters = GrayscaleConversionFilter | ImageInvertingFilter | ImageColorToBinaryFilter;

type Enhancements = BrightnessChangingEnhancement | ContrastChangingEnhancement | GammaChangingEnhancement;

type Operations = Filters | Enhancements;

export class BitmapProcessing {
  private readonly context: CanvasRenderingContext2D;

  private readonly width: number;

  private readonly height: number;

  private readonly imageData: ImageData;

  private readonly imageDataOrigin: ImageData;

  private readonly activeEnhancements: Array<Enhancements> = [];

  private activeFilter: Filters | null = null;

  public isFilterActive = false;

  private isEnhancementsActive = false;

  constructor(context: CanvasRenderingContext2D, width: number, height: number) {
    this.context = context;
    this.width = width;
    this.height = height;
    this.imageData = this.context.getImageData(0, 0, this.width, this.height);
    this.imageDataOrigin = this.context.getImageData(0, 0, this.width, this.height);
  }

  performOperations = () => {
    this.imageData.data.set(this.imageDataOrigin.data);
    this.context.putImageData(this.imageData, 0, 0);

    if (this.activeFilter !== null && this.isFilterActive) {
      if (typeof this.activeFilter.params !== 'undefined') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.activeFilter.fn(...this.activeFilter.params);
      } else {
        this.activeFilter.fn();
      }
    }

    if (this.isEnhancementsActive) {
      this.activeEnhancements.forEach(enhancementValue => {
        if (enhancementValue.params) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          enhancementValue.fn(...enhancementValue.params);
        }
      });
    }
  };

  addOperation = (operation: Operations) => {
    if (operation.type === 'enhancement') {
      const activeOperation = this.activeEnhancements.find(
        activeEnhancement => activeEnhancement.fn.name === operation.fn.name,
      );

      if (typeof activeOperation === 'undefined') {
        this.activeEnhancements.push(operation);
      } else {
        activeOperation.params = operation.params;
      }
    } else {
      this.activeFilter = operation;
    }

    this.performOperations();
  };

  filterChangeState = (state: boolean) => {
    this.isFilterActive = state;
    this.performOperations();
  };

  enhancementsChangeState = (state: boolean) => {
    this.isEnhancementsActive = state;
    this.performOperations();
  };

  private static toByte = (colors: RGBA): RGBA => {
    const newColors = colors;
    for (const [key, color] of Object.entries(colors)) {
      if (color > 255) { newColors[key] = 255; }
      if (color < 0) { newColors[key] = 0; }
    }
    return newColors;
  };

  grayscaleConversion: GrayscaleConversion = () => {
    const data = new Uint8ClampedArrayIterable(this.imageData.data);

    data.forEachRGBA(colors => {
      const grayScaleColor = colors.red * 0.3 + colors.green * 0.59 + colors.blue * 0.11;
      return {
        red: grayScaleColor,
        green: grayScaleColor,
        blue: grayScaleColor,
        alpha: colors.alpha,
      };
    });

    this.context.putImageData(this.imageData, 0, 0);
  };

  inverting: ImageInverting = (threshold: number) => {
    const data = new Uint8ClampedArrayIterable(this.imageData.data);

    data.forEachRGBA(colors => {
      if (colors.red > threshold
        && colors.green > threshold
        && colors.blue > threshold) {
        return colors;
      }

      return {
        red: 255 - colors.red,
        green: 255 - colors.green,
        blue: 255 - colors.blue,
        alpha: colors.alpha,
      };
    });

    this.context.putImageData(this.imageData, 0, 0);
  };

  colorToBinary: ImageColorToBinary = (threshold: number) => {
    const data = new Uint8ClampedArrayIterable(this.imageData.data);

    data.forEachRGBA(colors => {
      let newColor = 0;
      if (colors.red > threshold
        && colors.green > threshold
        && colors.blue > threshold) {
        newColor = 255;
      }

      return {
        red: newColor,
        green: newColor,
        blue: newColor,
        alpha: colors.alpha,
      };
    });

    this.context.putImageData(this.imageData, 0, 0);
  };

  brightnessChanging: BrightnessChanging = (valueChange: number) => {
    const data = new Uint8ClampedArrayIterable(this.imageData.data);

    data.forEachRGBA(colors => (BitmapProcessing.toByte(
      {
        red: colors.red + valueChange,
        green: colors.green + valueChange,
        blue: colors.blue + valueChange,
        alpha: colors.alpha,
      },
    )));

    this.context.putImageData(this.imageData, 0, 0);
  };

  contrastChanging: ContrastChanging = (valueChange: number) => {
    const data = new Uint8ClampedArrayIterable(this.imageData.data);
    const contrastFactor = (259 * (valueChange + 255)) / (255 * (259 - valueChange));

    data.forEachRGBA(colors => (BitmapProcessing.toByte(
      {
        red: contrastFactor * (colors.red - 128) + 128,
        green: contrastFactor * (colors.green - 128) + 128,
        blue: contrastFactor * (colors.blue - 128) + 128,
        alpha: colors.alpha,
      },
    )));

    this.context.putImageData(this.imageData, 0, 0);
  };

  gammaChanging: GammaChanging = (valueChange: number) => {
    const data = new Uint8ClampedArrayIterable(this.imageData.data);
    const gammaFactor = ((valueChange + 255) / 510) * 8;

    data.forEachRGBA(colors => (BitmapProcessing.toByte(
      {
        red: 255 * (colors.red / 255 ** 1 / gammaFactor),
        green: 255 * (colors.green / 255 ** 1 / gammaFactor),
        blue: 255 * (colors.blue / 255 ** 1 / gammaFactor),
        alpha: colors.alpha,
      },
    )));

    this.context.putImageData(this.imageData, 0, 0);
  };

  getBrightnessHistogram = () => {
    // const colorsBuffer = this.colorsBufferSplit();
  };
}
