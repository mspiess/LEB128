export class SignedLeb128 {
  /**
   * Encodes the value in signed LEB128 format.
   * @param {number} value
   * @returns {Uint8Array} signed LEB128 encoded value
   * @throws {Error} If the argument is not a signed 32-bit integer
   */
  public encode: (value: number) => Uint8Array = (value: number) => {
    let value32bit = value | 0;
    if (value !== value32bit) {
      throw new Error(`Value must be a 32-bit integer!`);
    }
    const result: number[] = [];
    while (true) {
      const byte = value32bit & 0x7f;
      value32bit >>= 7;
      if (
        (value32bit === 0 && (byte & 0x40) === 0) ||
        (value32bit === -1 && (byte & 0x40) !== 0)
      ) {
        result.push(byte);
        return new Uint8Array(result);
      }
      result.push(byte | 0x80);
    }
  };
}
