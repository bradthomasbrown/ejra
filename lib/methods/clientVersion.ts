import * as jra from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/jra@0.1.1/mod.ts'
import * as schemas from "../schemas/mod.ts";

export async function clientVersion(rpc: string) {
  const method = "web3_clientVersion";
  const params:never[] = [];
  const schema = schemas.string;
  return schema.parse(await new jra.Client(rpc).request(method, params, 0))
}
