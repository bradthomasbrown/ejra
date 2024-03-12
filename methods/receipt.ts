import z from 'https://deno.land/x/zod@v3.22.4/index.ts'
import { EJRARequest as _EJRARequest } from '../types/mod.ts';
import * as schemas from '../schemas/mod.ts'
import { call } from '../lib/mod.ts'
import { RLB } from 'https://deno.land/x/rlb@0.0.8/RLB.ts';

/**
 * Options for balance
 * @type
 */
export type ReceiptOptions = {
    hash:string
    url?:string
    rlb?:RLB
}
const method = 'eth_getTransactionReceipt' as const
const schema = schemas.tx

export function receipt(options:ReceiptOptions&{ url:string }):Promise<z.infer<typeof schema>>
export function receipt<
    H extends string,
    P extends [H]
>(options:{
    hash:H
    rlb?:RLB
}):{
    method:typeof method
    params:P
    schema:typeof schema
}
export function receipt<
    H extends string
>(options:{
    hash:H
    url?:string,
    rlb?:RLB
}) {
    const { hash, url, rlb } = options
    const params = [hash] as const
    const request = { method, params, schema }
    return url ? call({ url, request, rlb }) : request
}