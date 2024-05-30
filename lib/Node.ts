import * as methods from './methods/mod.ts'
import { TxCallObject } from './types/TxCallObject.ts';
import { Tag } from './types/Tag.ts';

export class Node {
    rpc:string
    balance:(address:string,tag:Tag)=>ReturnType<typeof methods.balance>
    call:(txCallObject:TxCallObject, tag:Tag)=>ReturnType<typeof methods.call>
    chainId:()=>ReturnType<typeof methods.chainId>
    clientVersion:()=>ReturnType<typeof methods.clientVersion>
    estimateGas:(txCallObject:Partial<TxCallObject>, tag:Tag)=>ReturnType<typeof methods.estimateGas>
    gasPrice:()=>ReturnType<typeof methods.gasPrice>
    height:()=>ReturnType<typeof methods.height>
    receipt:(hash:string)=>ReturnType<typeof methods.receipt>
    sendRawTx:(data:string)=>ReturnType<typeof methods.sendRawTx>
    slot:(address:string,slot:bigint,tag:Tag)=>ReturnType<typeof methods.slot>
    code:(address:string,tag:Tag)=>ReturnType<typeof methods.code>
    constructor(rpc:string) {
        this.rpc = rpc
        this.balance = (address:string, tag:Tag) => methods.balance(rpc, address, tag)
        this.call = (txCallObject:TxCallObject, tag:Tag) => methods.call(rpc, txCallObject, tag)
        this.chainId = () => methods.chainId(rpc)
        this.clientVersion = () => methods.clientVersion(rpc)
        this.estimateGas = (txCallObject:Partial<TxCallObject>, tag:Tag) => methods.estimateGas(rpc, txCallObject, tag)
        this.gasPrice = () => methods.gasPrice(rpc)
        this.height = () => methods.height(rpc)
        this.receipt = (hash:string) => methods.receipt(rpc, hash)
        this.sendRawTx = (data:string) => methods.sendRawTx(rpc, data)
        this.slot = (address:string, slot:bigint, tag:Tag) => methods.slot(rpc, address, slot, tag)
        this.code = (address:string, tag:Tag) => methods.code(rpc, address, tag)
    }
}