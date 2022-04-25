interface RGBA {
  red: number,
  green: number,
  blue: number,
  alpha: number,
}

interface IUint8ClampedArrayIterable extends Uint8ClampedArray {
  forEachRgba(
    callbackfn: (colors: RGBA,
      index: number, array: Uint8ClampedArray) => void, thisArg?: any
  ): void;

  testCustomFunc(): void;
}

export class Uint8ClampedArrayIterable
  extends Uint8ClampedArray
  implements IUint8ClampedArrayIterable {
  constructor(uInt8ClampedArray: Uint8ClampedArray) {
    super(uInt8ClampedArray.buffer);
  }

  forEachRgba(callbackfn: (colors: RGBA,
    index: number, array: Uint8ClampedArray) => void) {
    for (let i = 0; i < this.length; i += 4) {
      callbackfn({
        red: this[i], green: this[i + 1], blue: this[i + 2], alpha: this[i + 3],
      }, i / 4, this);
    }
  }

  testCustomFunc() {
    // for (let i = 0; i < this.length; i += 4) {
    //   const grayScaleColor = this[i] * 0.3 + this[i + 1] * 0.59 + this[i + 2] * 0.11;
    //   [this[i], this[i + 1], this[i + 2]] = [grayScaleColor, grayScaleColor, grayScaleColor];
    // }

    // console.log(super[4]);
    console.log('Func working!');
  }
}
