import { RGBA } from '@/utils/RGBA';

interface IUint8ClampedArrayIterable extends Uint8ClampedArray {
  forEachRGBA(callbackfn: (colors: RGBA, index: number, array: Uint8ClampedArray) => void, thisArg?: any): void;
}

export class Uint8ClampedArrayIterable extends Uint8ClampedArray implements IUint8ClampedArrayIterable {
  constructor(uInt8ClampedArray: Uint8ClampedArray) {
    super(uInt8ClampedArray.buffer);
  }

  forEachRGBA(callbackfn: (colors: RGBA, index: number, array: Uint8ClampedArray) => void | RGBA) {
    for (let i = 0; i < this.length; i += 4) {
      const newColors = callbackfn(
        {
          red: this[i],
          green: this[i + 1],
          blue: this[i + 2],
          alpha: this[i + 3],
        },
        i / 4,
        this,
      );
      if (newColors) {
        [this[i], this[i + 1], this[i + 2], this[i + 3]] = [newColors.red,
          newColors.green, newColors.blue, newColors.alpha];
      }
    }
  }
}
