import { z } from "zod";

export const quantity = z.string().transform(BigInt);
