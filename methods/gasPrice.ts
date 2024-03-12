import z from 'https://deno.land/x/zod@v3.22.4/index.ts'
import { q } from '../schemas/mod.ts'
import { call } from '../lib/mod.ts'
import { RLB } from 'https://deno.land/x/rlb@0.0.8/RLB.ts';

/**
 * @type
 */
export type GasPriceOptions = {
    url?:string
    rlb?:RLB
}
const method = 'eth_gasPrice' as const
const schema = q

/** @overload */
export function gasPrice(options:GasPriceOptions&{ url:string }):Promise<z.infer<typeof schema>>
/** @overload */
export function gasPrice(options:GasPriceOptions):{
    method:typeof method
    schema:typeof schema
}
// implementation
export function gasPrice(options:GasPriceOptions={}) {
    const { url, rlb } = options
    const request = { method, schema }
    return url ? call({ url, request, rlb }) : request
}