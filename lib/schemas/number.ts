import { z } from "zod";

export const number = z.string().transform(BigInt).transform(Number);
