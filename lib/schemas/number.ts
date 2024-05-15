import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

export const number = z.string().transform(BigInt).transform(Number);
