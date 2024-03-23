import { Filter, Tag, TxCallObject } from './mod.ts'

export type Params = {
    clientVersion: [],
    sha3: [data:string],
    chainId: [],
    gasPrice: [],
    height: [],
    balance: [address:string, tag:Tag],
    slot: [address:string, slot:bigint, tag:Tag],
    nonce: [address:string, tag:Tag],
    code: [address:string, tag:Tag],
    send: [data:string],
    call: [txCallObject:TxCallObject]
    estimateGas: [txCallObject:Partial<TxCallObject>],
    receipt: [hash:string]
    logs: [filter:Filter]
}