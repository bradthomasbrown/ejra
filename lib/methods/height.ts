import * as schemas from "schemas/mod.ts";
import { call } from "lib/mod.ts";

export function height(rpc: string) {
  const method = "eth_blockNumber";
  const params = [] as const;
  const schema = schemas.quantity;
  return call(rpc, method, params, schema);
}
