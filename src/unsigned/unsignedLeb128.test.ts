import { assertEquals, unreachable } from "../../test_deps.ts";
import { UnsignedLeb128 } from "./unsignedLeb128.ts";

const { test } = Deno;

const underTest = new UnsignedLeb128();

test("returns single byte for lowest 7-bit number", () => {
  const actual = underTest.encode(0b0100_0000);
  assertEquals(actual, [0b0100_0000]);
});

test("returns single byte for highest 7-bit number", () => {
  const actual = underTest.encode(0b0111_1111);
  assertEquals(actual, [0x7f]);
});

test("returns two bytes for lowest 8-bit number", () => {
  const actual = underTest.encode(0b1000_0000);
  assertEquals(actual, [0x80, 0x01]);
});

test("returns two bytes for highest 8-bit number", () => {
  const actual = underTest.encode(0b1111_1111);
  assertEquals(actual, [0xFF, 0x01]);
});

test("returns three bytes for lowest 15-bit number", () => {
  const actual = underTest.encode(0b100_0000_0000_0000);
  assertEquals(actual, [0x80, 0x80, 0x01]);
});

test("returns three bytes for highest 15-bit number", () => {
  const actual = underTest.encode(0b111_1111_1111_1111);
  assertEquals(actual, [0xFF, 0xFF, 0x01]);
});

test("returns four bytes for lowest 22-bit number", () => {
  const actual = underTest.encode(0b10_0000_0000_0000_0000_0000);
  assertEquals(actual, [0x80, 0x80, 0x80, 0x01]);
});

test("returns four bytes for highest 22-bit number", () => {
  const actual = underTest.encode(0b11_1111_1111_1111_1111_1111);
  assertEquals(actual, [0xFF, 0xFF, 0xFF, 0x01]);
});

test("returns five bytes for lowest 29-bit number", () => {
  const actual = underTest.encode(0b1_0000_0000_0000_0000_0000_0000_0000);
  assertEquals(actual, [0x80, 0x80, 0x80, 0x80, 0x01]);
});

test("returns five bytes for highest 29-bit number", () => {
  const actual = underTest.encode(0b1_1111_1111_1111_1111_1111_1111_1111);
  assertEquals(actual, [0xFF, 0xFF, 0xFF, 0xFF, 0x01]);
});

test("returns five bytes for highest 32-bit number", () => {
  const actual = underTest.encode(0xFFFFFFFF);
  assertEquals(actual, [0xFF, 0xFF, 0xFF, 0xFF, 0x0F]);
});

test("throws when argument is larger than 2^32 - 1", () => {
  try {
    underTest.encode(0x1FFFFFFFF);
    unreachable();
  } catch (error) {
    assertEquals(error.message, `Value must not be larger than '2^32 - 1'!`);
  }
});

test("throws when argument is negative", () => {
  try {
    underTest.encode(-1);
    unreachable();
  } catch (error) {
    assertEquals(error.message, `Value must not be negative!`);
  }
});
