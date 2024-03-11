import z from 'https://deno.land/x/zod@v3.22.4/index.ts'
import { Filter } from '../types/mod.ts'
import * as schemas from '../schemas/mod.ts'
import { call } from '../lib/mod.ts'

/**
 * @type
 */
export type LogsOptions = {
    filter:Filter
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
}) {
    const { filter, url } = options
    const params = [filter] as const
    const request = { method, params, schema }
    return url ? call({ url, request }) : request
}