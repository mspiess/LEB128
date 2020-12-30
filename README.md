# LEB128

Typescript library for the LEB128 encoding.
Only supports numbers that can be represented as 32-bit integers.

## Usage

```javascript
import {SignedLeb128, UnsignedLeb128} from "./mod.ts";

const valueToEncode = 5;
const signedEncodedValue = new SignedLeb128().encode(valueToEncode);
const unsignedEncodedValue = new UnsignedLeb128().encode(valueToEncode);
```

## Stability

Before version `1.0.0` breaking changes may be introduced at any point.

## Development

Execute the following command to run all tests:
```shell
deno test
```
