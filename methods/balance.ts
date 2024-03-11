import { Tag, EJRARequest } from '../types/mod.ts';
import { q } from '../schemas/mod.ts'
import { call } from '../lib/mod.ts'

/**
 * Options for balance
 * @type
 */
export type BalanceOptions = {
    address:string
    tag?:Tag
    url?:string
}
const method = 'eth_getBalance' as const
const schema = q

/**
 * Returns a promise to an address' balance.
 * @param options.address The address to get the balance of.
 * @param options.tag An optional {@link Tag} to specify what block to get the balance from.
 * @param options.url The node URL to query to get the balance.
 * @returns {Promise<bigint>}
 * 
 * @example
 * ```ts
 * const url = 'https://eth.llamarpc.com'
 * const address = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'
 * const balance = await m.balance({ address, url })
 * console.log(balance) // 955603135939535365788n
 * ```
 */
export function balance(options:BalanceOptions&{ url:string }):Promise<bigint>
/**
 * Returns an {@link EJRARequest} that can be used to get an address' latest balance.
 * @param options.address The address to get the balance of.
 * @returns {EJRARequest}
 * 
 * @example
 * ```ts
 * const url = 'https://eth.llamarpc.com'
 * const address = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'
 * const balanceRequest = await m.balance({ address })
 * const balance = await call({ request: balanceRequest, url })
 * console.log(balance) // 955603135939535365788n
 * ```
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
 * Returns an {@link EJRARequest} that can be used to get an address' balance.
 * @param options.address The address to get the balance of.
 * @param options.tag A {@link Tag} to specify what block to get the balance from.
 * @returns {EJRARequest}
 * 
 * @example
 * ```ts
 * const url = 'https://eth.llamarpc.com'
 * const address = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'
 * const balanceRequest = await m.balance({ address })
 * const balance = await call({ request: balanceRequest, url, tag: 19408664n })
 * console.log(balance) // 955603135939535365788n
 * ```
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
    const request = { method, params, schema }
    return url ? call({ url, request }) : request
}