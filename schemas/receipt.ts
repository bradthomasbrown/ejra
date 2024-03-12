import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'
import { q, log } from './mod.ts'

export const receipt = z.object({
    transactionHash: z.string(),
    transactionIndex: q,
    blockHash: z.string(),
    blockNumber: q,
    from: z.string(),
    to: z.string().nullable(),
    cumulativeGasUsed: q,
    effectiveGasPrice: q,
    gasUsed: q,
    contractAddress: z.string().nullable(),
    logs: log.array(),
    logsBloom: z.string(),
    type: z.literal('0x0').or(z.literal('0x1')).or(z.literal('0x2')),
    status: z.literal('0x0').or(z.literal('0x1'))
}).nullable()