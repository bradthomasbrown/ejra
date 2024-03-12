import { RLB } from 'https://deno.land/x/rlb@0.0.9/RLB.ts'
import * as schemas from '../../schemas/mod.ts'
import * as l from '../lib/mod.ts'

const method = 'eth_getTransactionReceipt' as const
const schema = schemas.receipt
const request = { method, params: [] as unknown[], schema }

type Options = {
    hash:string
    url:string
    rlb?:RLB
}

export const receipt = Object.assign(
    (options:Options) => {
        const { hash } = options
        request.params = [hash] as const
        return l.call({ ...options, request })
    },
    { method, schema }
)