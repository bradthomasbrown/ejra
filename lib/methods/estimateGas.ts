import * as jra from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/jra@0.1.1/mod.ts'
import * as schemas from "../schemas/mod.ts";
import { TxCallObject } from '../types/TxCallObject.ts';
import { Tag } from '../types/Tag.ts';

export async function estimateGas(rpc: string, txCallObject:Partial<TxCallObject>, tag:Tag) {
  const method = "eth_estimateGas";
  const { gas, gasPrice, value } = txCallObject
  const params = [
    {
      ...txCallObject,
      ...(gas ? { gas: `0x${gas.toString(16)}` } : {}),
      ...(gasPrice ? { gas: `0x${gasPrice.toString(16)}` } : {}),
      ...(value ? { gas: `0x${value.toString(16)}` } : {})
    } as {
      from?:string
      to:string
      gas?:string
      gasPrice?:string
      value?:string
      input?:string
  },
    `0x${tag.toString(16)}`
  ]
  const schema = schemas.quantity;
  return schema.parse(await new jra.Client(rpc).request(method, params, 0))
}
