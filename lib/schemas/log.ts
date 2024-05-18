import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
import { quantity, string } from "./mod.ts";

export const log = z.object({
    removed: z.boolean(),
    logIndex: quantity,
    transactionIndex: quantity,
    transactionHash: string,
    blockHash: string,
    blockNumber: quantity,
    address: string,
    data: string,
    topics: string.array()
})