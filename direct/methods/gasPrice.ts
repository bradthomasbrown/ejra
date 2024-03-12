import { RLB } from 'https://deno.land/x/rlb@0.0.9/RLB.ts'
import * as schemas from '../../schemas/mod.ts'
import * as l from '../lib/mod.ts'

const method = 'eth_gasPrice' as const
const schema = schemas.q
const request = { method, params: [] as unknown[], schema }

type Options = {
    url:string
    rlb?:RLB
}

export const gasPrice = Object.assign(
    (options:Options) => l.call({ ...options, request }),
    { method, schema }
)