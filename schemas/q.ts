import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'

export const q = z.string().transform(BigInt)