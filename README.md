# charcodeconv

## About
とある用途で必要になったので、Denoの学習用がてらに作ったツール
引数で渡した文字列を全部全角文字にしつつ、JISコードの配列にして返す

## Usage
```shell
$ deno run main.ts 'こんにちは'
count 5
0x2433, 0x2473, 0x244b, 0x2441, 0x244f,
```
