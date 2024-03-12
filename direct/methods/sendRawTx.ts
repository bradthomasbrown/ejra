import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'
import { RLB } from 'https://deno.land/x/rlb@0.0.9/RLB.ts'
import * as l from '../lib/mod.ts'

const method = 'eth_sendRawTransaction' as const
const schema = z.string()
const request = { method, params: [] as unknown[], schema }

type Options = {
    data:string
    url:string
    rlb?:RLB
}

export const sendRawTx = Object.assign(
    (options:Options) => {
        const { data } = options
        request.params = [data] as const
        l.call({ ...options, request })
    },
    { method, schema }
)