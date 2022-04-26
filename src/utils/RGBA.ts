export class RGBA {
  public red: number;

  public green: number;

  public blue: number;

  public alpha: number;

  [key: string]: number;

  constructor(red: number, green: number, blue: number, alpha: number) {
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.alpha = alpha;
  }
}
