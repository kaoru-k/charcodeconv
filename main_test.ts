import { assertEquals } from "https://deno.land/std@0.206.0/assert/mod.ts";
import { convertToZenkaku, convertToJisArray, removeEscapeSequence } from "./main.ts";

Deno.test(function convertToZenkakuTest() {
  assertEquals(convertToZenkaku('123Abc!? ｱｲｳｴｵ　あいうえお！？'), '１２３Ａｂｃ！？　アイウエオ　あいうえお！？');
});

Deno.test(function convertToJisArrayTest() {
  assertEquals(
    convertToJisArray('こんにちは'),
    [
      0x1b, 0x24, 0x42, // ESC $ B
      0x24, 0x33,       // こ
      0x24, 0x73,       // ん
      0x24, 0x4b,       // に
      0x24, 0x41,       // ち
      0x24, 0x4f,       // は
      0x1b, 0x28, 0x42 // ESC ( B
    ]
  );
});

Deno.test(function removeEscapeSequenceTest() {
  const inputArray = [
    0x1b, 0x24, 0x42, // ESC $ B
    0x24, 0x33,       // こ
    0x24, 0x73,       // ん
    0x24, 0x4b,       // に
    0x24, 0x41,       // ち
    0x24, 0x4f,       // は
    0x1b, 0x28, 0x42 // ESC ( B
  ];

  assertEquals(
    removeEscapeSequence(inputArray),
    [
      0x24, 0x33, // こ
      0x24, 0x73, // ん
      0x24, 0x4b, // に
      0x24, 0x41, // ち
      0x24, 0x4f, // は
    ],
  );
});
