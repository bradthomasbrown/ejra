import z from 'https://deno.land/x/zod@v3.22.4/index.ts'
import { Filter } from '../types/mod.ts'
import * as schemas from '../schemas/mod.ts'
import { call } from '../lib/mod.ts'
import { RLB } from 'https://deno.land/x/rlb@0.0.7/RLB.ts';

/**
 * @type
 */
export type LogsOptions = {
    filter:Filter
    rlb?:RLB
}
const method = 'eth_getLogs' as const
const schema = schemas.log.array()

/** @overload */
export function logs(options:LogsOptions&{ url:string }):Promise<z.infer<typeof schema>>
/** @overload */
export function logs<
    F extends Filter,
    P extends [F]
>(options:{
    filter:F
}):{
    method:typeof method
    params:P
    schema:typeof schema
}
// implementation
export function logs<
    F extends Filter
>(options:{
    filter:F
    url?:string
    rlb?:RLB
}) {
    const { filter, url, rlb } = options
    const params = [filter] as const
    const request = { method, params, schema }
    return url ? call({ url, request, rlb }) : request
}