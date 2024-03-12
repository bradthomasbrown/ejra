import z from 'https://deno.land/x/zod@v3.22.4/index.ts'
import { EJRARequest as _EJRARequest } from '../types/mod.ts';
import * as schemas from '../schemas/mod.ts'
import { call } from '../lib/mod.ts'
import { RLB } from 'https://deno.land/x/rlb@0.0.8/RLB.ts';

/**
 * Options for balance
 * @type
 */
export type SendRawTxOptions = {
    data:string
    url?:string
    rlb?:RLB
}
const method = 'eth_sendRawTransaction' as const
const schema = schemas.tx

export function sendRawTx(options:SendRawTxOptions&{ url:string }):Promise<z.infer<typeof schema>>
export function sendRawTx<
    D extends string,
    P extends [D]
>(options:{
    data:D
    rlb?:RLB
}):{
    method:typeof method
    params:P
    schema:typeof schema
}
export function sendRawTx<
    D extends string
>(options:{
    data:D
    url?:string,
    rlb?:RLB
}) {
    const { data, url, rlb } = options
    const params = [data] as const
    const request = { method, params, schema }
    return url ? call({ url, request, rlb }) : request
}