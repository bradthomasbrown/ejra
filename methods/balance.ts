import { Tag } from '../types/mod.ts';
import { q } from '../schemas/mod.ts'
import { call } from '../lib/mod.ts'

type Opts = {
    address:string
    tag?:Tag
    url?:string
}
const method = 'eth_getBalance' as const
const schema = q

/**
 * overload for included url, note the return type
 * @param options
 * @overload
 */
export function balance(options:Opts&{ url:string }):Promise<bigint>
/**
 * overload with unspecified tag, defaults to 'latest'
 * @param options
 * @overload
 */
export function balance<
    A extends string,
    P extends readonly [A,'latest']
>(options:{
    address:A
}):{
    method:typeof method
    params:P
    schema:typeof schema
}
/**
 * overload with tag
 * @param options
 * @overload
 */
export function balance<
    A extends string,
    T extends Tag,
    P extends [A,T]
>(options:{
    address:A
    tag:T
}):{
    method:typeof method
    params:P
    schema:typeof schema
}
/**
 * either returns a request object that can be used with lib/call to get a balance
 * or returns a balance if a url is included
 * @param options
 */
export function balance<
    A extends string,
    T extends Tag
>(options:{
    address:A
    tag?:T
    url?:string
}) {
    const { address, tag, url } = options
    const params = [address, tag ?? 'latest'] as const
    const ejrrq = { method, params, schema }
    return url ? call({ url, ejrrq }) : ejrrq
}