import { RLB } from 'https://deno.land/x/rlb@0.0.9/RLB.ts'
import * as schemas from '../schemas/mod.ts'
import { TxCallObject, Tag } from '../types/mod.ts'
import * as l from '../lib/mod.ts'

const method = 'eth_estimateGas' as const
const schema = schemas.q
const request = { method, params: [] as unknown[], schema }

type Options = {
    tx:Partial<TxCallObject>
    tag?:Tag
    url:string
    rlb?:RLB
}

export const estimateGas = Object.assign(
    (options:Options) => {
        const { tx, tag } = options
        request.params = [tx, tag ?? 'latest']
        return l.call({ ...options, request })
    },
    { method, schema }
)