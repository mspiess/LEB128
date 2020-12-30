import { assertEquals, unreachable } from "../../test_deps.ts";
import { SignedLeb128 } from "./signedLeb128.ts";

const { test } = Deno;

const underTest = new SignedLeb128();
const className = underTest.constructor.name;

test(`${className} returns one byte for highest 6-bit number`, () => {
  const actual = underTest.encode(0b0011_1111);
  assertEquals(actual, [0b11_1111]);
});

test(`${className} returns two bytes for lowest 7-bit number`, () => {
  const actual = underTest.encode(0b0100_0000);
  assertEquals(actual, [0b1100_0000, 0x00]);
});

test(`${className} returns one byte for -1`, () => {
  const actual = underTest.encode(-1);
  assertEquals(actual, [0b111_1111]);
});

test(`${className} returns two bytes for -128`, () => {
  const actual = underTest.encode(-128);
  assertEquals(actual, [0x80, 0x7F]);
});

test(`${className} throws for non 32-bit values`, () => {
  try {
    underTest.encode(0xFFFFFFFF00000000);
    unreachable();
  } catch (error) {
    assertEquals(error.message, `Value must be a 32-bit integer!`);
  }
});
