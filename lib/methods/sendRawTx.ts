import * as jra from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/jra@0.1.1/mod.ts'
import * as schemas from "../schemas/mod.ts";

export async function sendRawTx(rpc:string, data:string) {
  const method = "eth_sendRawTransaction";
  const params:[data:string] = [data];
  const schema = schemas.string;
  return schema.parse(await new jra.Client(rpc).request(method, params, 0))
}
