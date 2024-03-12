import { RLB } from 'https://deno.land/x/rlb@0.0.9/RLB.ts'
import * as schemas from '../../schemas/mod.ts'
import { Filter } from '../../types/mod.ts'
import * as l from '../lib/mod.ts'

const method = 'eth_getLogs' as const
const schema = schemas.log.array()
const request = { method, params: [] as unknown[], schema }

type Options = {
    filter:Filter
    url:string
    rlb?:RLB
}

export const logs = Object.assign(
    (options:Options) => {
        const { filter } = options
        request.params = [filter] as const
        return l.call({ ...options, request })
    },
    { method, schema }
)