import * as schema from '../schema/mod.ts'

export const clientVersion = { method: 'web3_clientVersion', schema: schema.string }
export const sha3 = { method: 'web3_sha3', schema: schema.string }
export const chainId = { method: 'eth_chainId', schema: schema.quantity }
export const gasPrice = { method: 'eth_gasPrice', schema: schema.quantity }
export const height = { method: 'eth_blockNumber', schema: schema.quantity }
export const balance = { method: 'eth_getBalance', schema: schema.quantity }
export const slot = { method: 'eth_getStorageAt', schema: schema.string }
export const nonce = { method: 'eth_getTransactionCount', schema: schema.quantity }
export const code = { method: 'eth_getCode', schema: schema.string }
export const send = { method: 'eth_sendRawTransaction', schema: schema.string }
export const call = { method: 'eth_call', schema: schema.string }
export const estimateGas = { method: 'eth_estimateGas', schema: schema.quantity }
export const receipt = { method: 'eth_getTransactionReceipt', schema: schema.receipt }
export const logs = { method: 'eth_getLogs', schema: schema.log.array() }