# jra
This is a simple, minimal implementation of the (currently crude client-only) JSON RPC API in TypeScript/JavaScript.

## Why?
Honestly, I just don't trust people who say "middleware". This is to support the growing crypto-EVM stack.

## Installation
```sh
npm i @bradthomasbrown/jra
```

## Usage
```js

// provided you have a local EVM node running on port 8545
const client = new Client("localhost:8545");

// you can make single requests
console.log(await client.request("eth_blockNumber", []));
// 0x572b

// or implicit batch requests.
// any error in a batch will result in an aggregate error being thrown
console.log(await client.request(
    "eth_blockNumber", [],
    "eth_getBalance", ["0x43e6e60706cd7c33440ec5a0b1159708a80e308f", "latest"]
));
// [ "0x572e", "0xde0b6b3a7640000" ]

```