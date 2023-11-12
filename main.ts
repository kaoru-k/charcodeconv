// @deno-types="npm:@types/encoding-japanese@^2.0.4"
import Encoding from "npm:encoding-japanese@2.0.0";
// @deno-types="npm:@types/moji@^0.5.3"
import moji from "npm:moji@0.5.1";

// 全部全角文字に変換する
export function convertToZenkaku(inputString: string): string {
  return moji(inputString).convert('HE', 'ZE').convert('HS', 'ZS').convert('HK', 'ZK').toString();
}

// JISコード(ISO-2022-JP)の配列に変換する
export function convertToJisArray(inputString: string): number[] {
  const unicodeArray = Encoding.stringToCode(inputString);
  return Encoding.convert(unicodeArray, {
    to:   'JIS',
    from: 'UNICODE'
  });
}

// 文字コードの配列からエスケープシーケンスを除去する
export function removeEscapeSequence(inputArray: number[]): number[] {
  const outputArray: number[] = [];
  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i] == 0x1b) i += 2;
    else outputArray.push(inputArray[i]);
  }
  return outputArray;
}

if (import.meta.main) {
  const inputString = Deno.args[0];
  if (!inputString) {
    console.log('Usage: deno run main.ts <string>');
    Deno.exit(1);
  }

  const jisArray = removeEscapeSequence(convertToJisArray(convertToZenkaku(inputString)));

  let outputString = '';
  for (let i = 0; i < jisArray.length; i += 2) {
    outputString += `0x${jisArray[i].toString(16)}${jisArray[i + 1].toString(16)}, `;
    if (i > 0 && i % (20 * 2) == 0) outputString += '\n';
  }

  console.log(`count: ${jisArray.length / 2}\n${outputString}`);
}
