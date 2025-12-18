# ejra
This is a simple, minimal implementation of an EVM (Ethereum and similar) client JSON RPC API in TypeScript/JavaScript.
Currently limited to HTTP as a transport (no socket support yet, create an issue if you're looking for that).

## Why?
The existing alternatives are neither simple nor minimal enough. Trying to jam the entire scope of EVM interactions into a single library or under a single name is probably not correct. We'll try to do this in small pieces, and so this library is just for the very fundamental JSON RPC API portion of EVM interactions.

## Installation
```sh
npm i @bradthomasbrown/ejra
```

## Usage
```js
import { methods as m, Node } from "@bradthomasbrown/ejra";

// provided you have a local EVM node running on port 8545
const node = new Node("localhost:8545");

// you can make single requests
console.log(await node.blockNumber());
// 107904n

// or explicit batch requests. any error in a batch will result in an aggregate error being thrown
const address = "0x43e6e60706cd7c33440ec5a0b1159708a80e308f";
const [clientVersion, chainId, gasPrice, blockNumber, balance] = await node.batch(
    m.clientVersion(),
    m.chainId(),
    m.gasPrice(),
    m.blockNumber(),
    m.getBalance(address, "latest")
);
console.log({ clientVersion, chainId, gasPrice, blockNumber, balance });
/* {
  clientVersion: "anvil/v1.5.0",
  chainId: 31337n,
  gasPrice: 1000000007n,
  blockNumber: 108550n,
  balance: 999923575999465032n,
} */

```