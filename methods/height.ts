import { q } from '../schemas/mod.ts'
import { call } from '../lib/mod.ts'

/**
 * @type
 */
export type HeightOptions = {
    url?:string
}
const method = 'eth_blockNumber' as const
const schema = q

/** @overload */
export function height(options:HeightOptions&{ url:string }):Promise<bigint>
/** @overload */
export function height():{
    method:typeof method
    schema:typeof schema
}
// implementation
export function height(options:{
    url?:string
}={}) {
    const { url } = options
    const request = { method, schema }
    return url ? call({ url, request }) : request
}