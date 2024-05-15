import * as methods from './methods/mod.ts'
import { TxCallObject } from './types/TxCallObject.ts';
import { Tag } from './types/Tag.ts';

export class Node {
    rpc:string
    call:(txCallObject:TxCallObject, tag:Tag)=>ReturnType<typeof methods.call>
    chainId:()=>ReturnType<typeof methods.chainId>
    clientVersion:()=>ReturnType<typeof methods.clientVersion>
    estimateGas:(txCallObject:Partial<TxCallObject>, tag:Tag)=>ReturnType<typeof methods.estimateGas>
    gasPrice:()=>ReturnType<typeof methods.gasPrice>
    height:()=>ReturnType<typeof methods.height>
    sendRawTx:(data:string)=>ReturnType<typeof methods.sendRawTx>
    constructor(rpc:string) {
        this.rpc = rpc
        this.call = (txCallObject:TxCallObject, tag:Tag) => methods.call(rpc, txCallObject, tag)
        this.chainId = () => methods.chainId(rpc)
        this.clientVersion = () => methods.clientVersion(rpc)
        this.estimateGas = (txCallObject:Partial<TxCallObject>, tag:Tag) => methods.estimateGas(rpc, txCallObject, tag)
        this.gasPrice = () => methods.gasPrice(rpc)
        this.height = () => methods.height(rpc)
        this.sendRawTx = (data:string) => methods.sendRawTx(rpc, data)
    }
}