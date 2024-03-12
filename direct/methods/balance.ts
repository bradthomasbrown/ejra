import { RLB } from 'https://deno.land/x/rlb@0.0.9/RLB.ts'
import * as schemas from '../../schemas/mod.ts'
import { Tag } from '../../types/mod.ts'
import * as l from '../lib/mod.ts'

const method = 'eth_getBalance' as const
const schema = schemas.q
const request = { method, params: [] as unknown[], schema }

type Options = {
    address:string
    tag?:Tag
    url:string
    rlb:RLB
}

export const balance = Object.assign(
    (options:Options) => {
        const { address, tag } = options
        request.params = [address, tag ?? 'latest']
        return l.call({ ...options, request })
    },
    { method, schema }
)