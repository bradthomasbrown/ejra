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

/** @overload */
export function balance(opts:Opts&{ url:string }):Promise<bigint>
/** @overload */
export function balance<
    A extends string,
    P extends readonly [A,'latest']
>({
    address
}:{
    address:A
}):{
    method:typeof method
    params:P
    schema:typeof schema
}
/** @overload */
export function balance<
    A extends string,
    T extends Tag,
    P extends [A,T]
>({
    address,
    tag
}:{
    address:A
    tag:T
}):{
    method:typeof method
    params:P
    schema:typeof schema
}
// implementation
export function balance<
    A extends string,
    T extends Tag
>({
    address,
    tag,
    url
}:{
    address:A
    tag?:T
    url?:string
}) {
    const params = [address, tag ?? 'latest'] as const
    const ejrrq = { method, params, schema }
    return url ? call({ url, ejrrq }) : ejrrq
}