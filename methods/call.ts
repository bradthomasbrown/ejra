import z from 'https://deno.land/x/zod@v3.22.4/index.ts'
import { TxCallObject, Tag } from '../types/mod.ts'
import { RLB } from 'https://deno.land/x/rlb@0.0.8/RLB.ts';
import * as lib from '../lib/mod.ts'

/**
 * @type
 */
export type CallOptions = {
    tx:TxCallObject
    tag?:Tag
    url?:string
    rlb?:RLB
}
const method = 'eth_call' as const
const schema = z.string()

/** @overload */
export function call(options:CallOptions&{ url:string }):Promise<z.infer<typeof schema>>
/** @overload */
export function call<
    T extends TxCallObject,
    P extends [T,'latest']
>({
    tx
}:Omit<CallOptions,'url'|'tag'>):{
    method:typeof method
    params:P
    schema:typeof schema
}
/** @overload */
export function call<
    X extends TxCallObject,
    T extends Tag,
    P extends [X,T]
>({
    tx,
    tag
}:Omit<CallOptions,'url'>&{ tag:T }):{
    method:typeof method
    params:P
    schema:typeof schema
}
// implementation
export function call<
    X extends TxCallObject,
    T extends Tag
>(options:{
    tx:X
    tag?:T
    url?:string
    rlb?:RLB
}) {
    const { tx, tag, url, rlb } = options
    const params = [tx, tag ?? 'latest'] as const
    const request = { method, params, schema }
    return url ? lib.call({ url, request, rlb }) : request
}