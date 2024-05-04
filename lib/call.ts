import { z } from "zod";
import * as jra from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/jra@0.0.6/mod.ts'

const replacer = (_k: unknown, v: unknown) =>
  typeof v == "bigint" ? `0x${v.toString(16)}` : v;

export async function call<S extends z.ZodTypeAny>(
  rpc: string,
  method: string,
  params: readonly unknown[],
  schema: S,
) {
  const jrrq = { method, params, jsonrpc: "2.0", id: 0 };
  const body = JSON.stringify(jrrq, replacer) satisfies BodyInit;
  const headers = { "Content-Type": "application/json" } satisfies HeadersInit;
  const init = { body, headers, method: "POST" } satisfies RequestInit;
  const fetchResponse = await fetch(rpc, init);
  const text = await fetchResponse.text();
  const json = await JSON.parse(text);
  const jraResponse = jra.schema.response.parse(json)
  const { result } = jraResponse
  return schema.parse(result) as z.infer<S>;
}
