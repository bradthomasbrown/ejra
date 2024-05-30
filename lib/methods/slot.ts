import * as jra from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/jra@0.1.1/mod.ts'
import * as schemas from "../schemas/mod.ts";
import { Tag } from '../types/Tag.ts';

export async function slot(rpc: string, address:string, slot:bigint, tag:Tag) {
  const method = "eth_getStorageAt";
  const params = [
    address,
    `0x${slot.toString(16)}`,
    typeof tag == 'bigint' ? `0x${tag.toString(16)}` : tag
  ]
  const schema = schemas.string;
  return schema.parse(await new jra.Client(rpc).request(method, params, 0))
}
