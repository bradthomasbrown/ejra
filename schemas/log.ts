import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'
import { q } from './q.ts'

export const log = z.object({
    removed: z.boolean(),
    logIndex: q,
    transactionIndex: q,
    transactionHash: z.string(),
    blockHash: z.string(),
    blockNumber: q,
    address: z.string(),
    data: z.string(),
    topics: z.string().array()
})