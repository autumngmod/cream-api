export class Angle3 {
  private pitch: number;
  private yaw: number;
  private row: number;

  constructor(ang: string) {
    let splitted = ang.split(" "); // __tostring(self): pitch yaw row

    this.pitch = parseFloat(splitted[0]);
    this.yaw = parseFloat(splitted[1]);
    this.row = parseFloat(splitted[2]);
  }

  add(vec: Angle3): this {
    this.pitch += vec.pitch;
    this.yaw += vec.yaw;
    this.row += vec.row;

    return this;
  }

  sub(vec: Angle3): this {
    this.pitch -= vec.pitch;
    this.yaw -= vec.yaw;
    this.row -= vec.row;

    return this;
  }
}