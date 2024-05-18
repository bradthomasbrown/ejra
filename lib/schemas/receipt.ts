import z from "https://deno.land/x/zod@v3.22.4/index.ts";
import { quantity } from "./quantity.ts";
import { string } from "./string.ts";
import { log } from "./log.ts";

export const receipt = z.object({
    transactionHash: string,
    transactionIndex: quantity,
    blockHash: string,
    blockNumber: quantity,
    from: string,
    to: string.nullable(),
    cumulativeGasUsed: quantity,
    effectiveGasPrice: quantity,
    gasUsed: quantity,
    contractAddress: string.nullable(),
    logs: log.array(),
    logsBloom: string,
    type: quantity,
    status: quantity
}).nullable()