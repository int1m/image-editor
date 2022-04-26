import { Uint8ClampedArrayIterable } from '@/utils/Uint8ClampedArrayIterable';

export class BitmapProcessing {
  private readonly context: CanvasRenderingContext2D;

  private readonly width: number;

  private readonly height: number;

  private readonly imageData: ImageData;

  constructor(context: CanvasRenderingContext2D, width: number, height: number) {
    this.context = context;
    this.width = width;
    this.height = height;
    this.imageData = this.context.getImageData(0, 0, this.width, this.height);
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

  grayscaleConversion = () => {
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

  getBrightnessHistogram = () => {
    // const colorsBuffer = this.colorsBufferSplit();
  };
}
