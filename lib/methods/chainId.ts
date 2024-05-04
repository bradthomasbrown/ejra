import * as schemas from "schemas/mod.ts";
import { call } from "lib/mod.ts";

export function height(rpc: string) {
  const method = "eth_chainId";
  const params = [] as const;
  const schema = schemas.number;
  return call(rpc, method, params, schema);
}
