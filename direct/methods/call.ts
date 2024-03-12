import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'
import { RLB } from 'https://deno.land/x/rlb@0.0.9/RLB.ts'
import { TxCallObject, Tag } from '../../types/mod.ts'
import * as l from '../lib/mod.ts'

const method = 'eth_call' as const
const schema = z.string()
const request = { method, params: [] as unknown[], schema }

type Options = {
    tx:TxCallObject
    tag?:Tag
    url:string
    rlb?:RLB
}

export const call = Object.assign(
    (options:Options) => {
        const { tx, tag } = options
        request.params = [tx, tag ?? 'latest']
        return l.call({ ...options, request })
    },
    { method, schema }
)