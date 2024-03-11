import { q } from '../schemas/mod.ts'
import { call } from '../lib/mod.ts'

type Opts = {
    url?:string
}
const method = 'eth_blockNumber' as const
const schema = q

/** @overload */
export function height(opts:Opts&{ url:string }):Promise<bigint>
/** @overload */
export function height():{
    method:typeof method
    schema:typeof schema
}
// implementation
export function height({
    url
}:{
    url?:string
}={}) {
    const ejrrq = { method, schema }
    return url ? call({ url, ejrrq }) : ejrrq
}