import * as schemas from "schemas/mod.ts";
import { call } from "lib/mod.ts";

export function clientVersion(rpc: string) {
  const method = "web3_clientVersion";
  const params = [] as const;
  const schema = schemas.string;
  return call(rpc, method, params, schema);
}
