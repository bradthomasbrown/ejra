import { Filter, Tag, TxCallObject } from './mod.ts'

export type Params = {
    clientVersion: [options?:{ signal:AbortSignal }],
    sha3: [data:string, options?:{ signal:AbortSignal }],
    chainId: [options?:{ signal:AbortSignal }],
    gasPrice: [options?:{ signal:AbortSignal }],
    height: [options?:{ signal:AbortSignal }],
    balance: [address:string, tag:Tag, options?:{ signal:AbortSignal }],
    slot: [address:string, slot:bigint, tag:Tag, options?:{ signal:AbortSignal }],
    nonce: [address:string, tag:Tag, options?:{ signal:AbortSignal }],
    code: [address:string, tag:Tag, options?:{ signal:AbortSignal }],
    send: [data:string, options?:{ signal:AbortSignal }],
    call: [txCallObject:TxCallObject, tag:Tag, options?:{ signal:AbortSignal }]
    estimateGas: [txCallObject:Partial<TxCallObject>, options?:{ signal:AbortSignal }],
    receipt: [hash:string, options?:{ signal:AbortSignal }]
    logs: [filter:Filter, options?:{ signal:AbortSignal }]
}