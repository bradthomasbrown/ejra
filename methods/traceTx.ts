import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'
import { RLB } from 'https://deno.land/x/rlb@0.0.9/RLB.ts'
import * as l from '../lib/mod.ts'

const method = 'debug_traceTransaction' as const
const schema = z.unknown()
const request = { method, params: [] as unknown[], schema }

type Options = { 
    url:string
    hash:string
    rlb?:RLB
}

const config = {
    enableMemory: true,
    enableReturnData: true
}

export const traceTx = Object.assign(
    (options:Options) => {
        const { hash } = options
        request.params = [hash, config] as const
        return l.call({ ...options, request })
    },
    { method, schema }
)