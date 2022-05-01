import { Uint8ClampedArrayIterable } from '@/utils/Uint8ClampedArrayIterable';
import { RGBA } from '@/utils/RGBA';

export class BitmapProcessing {
  private readonly context: CanvasRenderingContext2D;

  private readonly width: number;

  private readonly height: number;

  private readonly imageData: ImageData;

  private readonly imageDataActive: ImageData;

  private readonly imageDataOrigin: ImageData;

  constructor(context: CanvasRenderingContext2D, width: number, height: number) {
    this.context = context;
    this.width = width;
    this.height = height;
    this.imageData = this.context.getImageData(0, 0, this.width, this.height);
    this.imageDataActive = this.context.getImageData(0, 0, this.width, this.height);
    this.imageDataOrigin = this.context.getImageData(0, 0, this.width, this.height);
  }

  // colorsArrayIterator = (colors: Uint8ClampedArray) => ({
  //   [Symbol.iterator](): Iterator<{ red: number, blue: number, green: number, alpha: number }> {
  //     let index = 0;
  //     return {
  //       next: (): IteratorResult<{ red: number, blue: number,
  //         green: number, alpha: number }, unknown> => {
  //         if (index + 4 <= colors.length) {
  //           index += 4;
  //           return {
  //             value: {
  //               red: colors[index - 4],
  //               blue: colors[index - 3],
  //               green: colors[index - 2],
  //               alpha: colors[index - 1],
  //             },
  //           };
  //         }
  //         return {
  //           value: [],
  //           done: true,
  //         };
  //       },
  //     };
  //   },
  // });

  private toByte = (colors: RGBA): RGBA => {
    const newColors = colors;
    for (const [key, color] of Object.entries(colors)) {
      if (color > 255) { newColors[key] = 255; }
      if (color < 0) { newColors[key] = 0; }
    }
    return newColors;
  };

  grayscaleConversion = () => {
    this.imageData.data.set(this.imageDataActive.data);
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

    this.imageDataActive.data.set(this.imageData.data);
    this.context.putImageData(this.imageData, 0, 0);
  };

  grayscaleImageChecking = () => {
    const data = new Uint8ClampedArrayIterable(this.imageData.data);

    let isGrayscaleImage = true;
    data.forEachRGBA(colors => {
      isGrayscaleImage = colors.red === colors.green && colors.red === colors.blue;
    });
    return isGrayscaleImage;
  };

  brightnessChanging = (valueChange: number) => {
    this.imageData.data.set(this.imageDataActive.data);
    const data = new Uint8ClampedArrayIterable(this.imageData.data);

    data.forEachRGBA(colors => ({
      red: colors.red + valueChange,
      green: colors.green + valueChange,
      blue: colors.blue + valueChange,
      alpha: colors.alpha,
    }));

    this.context.putImageData(this.imageData, 0, 0);
  };

  imageInverting = (threshold: number) => {
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

  imageColorToBinary = (threshold: number) => {
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

  imageContrastChange = (segmentStart: number, segmentEnd: number) => {

  };

  getBrightnessHistogram = () => {
    // const colorsBuffer = this.colorsBufferSplit();
  };
}
