import z from 'https://deno.land/x/zod@v3.22.4/index.ts'
import { q } from '../schemas/mod.ts'
import { call } from '../lib/mod.ts'
import { RLB } from 'https://deno.land/x/rlb@0.0.7/RLB.ts';

/**
 * @type
 */
export type HeightOptions = {
    url?:string
    rlb?:RLB
}
const method = 'eth_blockNumber' as const
const schema = q

/** @overload */
export function height(options:HeightOptions&{ url:string }):Promise<z.infer<typeof schema>>
/** @overload */
export function height():{
    method:typeof method
    schema:typeof schema
}
// implementation
export function height(options:HeightOptions={}) {
    const { url, rlb } = options
    const request = { method, schema }
    return url ? call({ url, request, rlb }) : request
}