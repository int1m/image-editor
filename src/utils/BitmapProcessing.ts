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

  // colorsBufferSplit = (splitStep = 4):
  // Array<Uint8ClampedArray> => {
  //   const { data } = this.imageData;
  //
  //   const colorsBufferSplit: Array<Uint8ClampedArray> = [];
  //   for (let i = 0; i < data.length - 1; i += splitStep) {
  //     colorsBufferSplit.push(data.slice(i, i + splitStep));
  //   }
  //   return colorsBufferSplit;
  // };

  // setColorsBuffer = (colorsBuffer: Array<Uint8ClampedArray> = this.colorsBuffer) => {
  //   const colorsBufferJoin: Array<number> = [];
  //
  //   colorsBuffer.forEach((colorsArray: Uint8ClampedArray) => {
  //     colorsArray.forEach(color => {
  //       colorsBufferJoin.push(color);
  //     });
  //   });
  //
  //   this.context.putImageData(new ImageData(
  //     Uint8ClampedArray.from(colorsBufferJoin),
  //     this.width,
  //     this.height,
  //   ), 0, 0);
  // };

  grayscaleConversion = () => {
    // console.log(this.colorsBuffer);
    // this.colorsBuffer.forEach(([red, green, blue, alpha], i) => {
    //   const grayScaleColor = red * 0.3 + green * 0.59 + blue * 0.11;
    //   this.colorsBuffer[i] = new Uint8ClampedArray(
    //     [grayScaleColor, grayScaleColor, grayScaleColor, alpha],
    //   );
    // });
    //
    // this.setColorsBuffer();

    const { data } = this.imageData;

    console.log(data);

    const testData = new Uint8ClampedArrayIterable(this.imageData.data);

    // for (const colors of this.colorsArrayIterator(data)) {
    //   const grayScaleColor = colors.red * 0.3 + colors.green * 0.59 + colors.blue * 0.11;
    //   colors.red = grayScaleColor;
    //   colors.blue = grayScaleColor;
    //   colors.green = grayScaleColor;
    // }

    // for (let i = 0; i < testData.length; i += 4) {
    //   const grayScaleColor = testData[i] * 0.3 + testData[i + 1] * 0.59 + testData[i + 2] * 0.11;
    //   [testData[i], testData[i + 1], testData[i + 2]] = [grayScaleColor, grayScaleColor, grayScaleColor];
    // }

    testData.testCustomFunc();

    testData.forEachRgba(colors => {
      const grayScaleColor = colors.red * 0.3 + colors.green * 0.59 + colors.blue * 0.11;
      colors = {
        red: grayScaleColor, green: grayScaleColor, blue: grayScaleColor, alpha: colors.alpha,
      };
      return colors;
    });

    // for (let i = 0; i < data.length; i += 4) {
    //   const grayScaleColor = data[i] * 0.3 + data[i + 1] * 0.59 + data[i + 2] * 0.11;
    //   [data[i], data[i + 1], data[i + 2]] = [grayScaleColor, grayScaleColor, grayScaleColor];
    // }

    console.log(testData);

    this.context.putImageData(this.imageData, 0, 0);
  };

  getBrightnessHistogram = () => {
    // const colorsBuffer = this.colorsBufferSplit();
  };
}
