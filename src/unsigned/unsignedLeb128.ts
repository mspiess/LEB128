export class UnsignedLeb128 {
  /**
   * Encodes the value in unsigned LEB128 format.
   * @param {number} value
   * @returns {Uint8Array} unsigned LEB128 encoded value
   * @throws {Error} If the argument is larger than 2^32-1
   * @throws {Error} If the argument is negative
   */
  public encode: (value: number) => Uint8Array = (value: number) => {
    if (value < 0) {
      throw new Error(`Value must not be negative!`);
    }
    if (value > 0xFFFFFFFF) {
      throw new Error(`Value must not be larger than '2^32 - 1'!`);
    }
    if (value === 0) {
      return new Uint8Array([0]);
    }
    const byteArray: number[] = [];
    while (value) {
      let byte = value & 0x7F;
      value >>>= 7;
      if (value) {
        byte |= 0b1000_0000;
      }
      byteArray.push(byte);
    }
    return new Uint8Array(byteArray);
  };
}
