import * as schemas from '../schemas/mod.ts'
import { call as c } from '../lib/mod.ts'
import { Tag, TxCallObject, Filter } from '../types/mod.ts'

export const clientVersion = (() => { const request = {
    method: 'web3_clientVersion', 
    schema: schemas.string } as const; return Object.assign((url:string, ...
    params: []) => c(url, { ...request, params }), { request })}
)()

export const sha3 = (() => { const request = {
    method: 'web3_sha3', 
    schema: schemas.string } as const; return Object.assign((url:string, ...
    params: [data:string]) => c(url, { ...request, params }), { request })}
)()

export const chainId = (() => { const request = {
    method: 'eth_chainId', 
    schema: schemas.quantity } as const; return Object.assign((url:string, ...
    params: []) => c(url, { ...request, params }), { request })}
)()

export const gasPrice = (() => { const request = {
    method: 'eth_gasPrice', 
    schema: schemas.quantity } as const; return Object.assign((url:string, ...
    params: []) => c(url, { ...request, params }), { request })}
)()

export const height = (() => { const request = {
    method: 'eth_blockNumber', 
    schema: schemas.quantity } as const; return Object.assign((url:string, ...
    params: []) => c(url, { ...request, params }), { request })}
)()

export const balance = (() => { const request = {
    method: 'eth_getBalance', 
    schema: schemas.quantity } as const; return Object.assign((url:string, ...
    params: [address:string]) => c(url, { ...request, params }), { request })}
)()

export const slot = (() => { const request = {
    method: 'eth_getStorageAt', 
    schema: schemas.string } as const; return Object.assign((url:string, ...
    params: [address:string, slot:bigint, tag:Tag]) => c(url, { ...request, params }), { request })}
)()

export const nonce = (() => { const request = {
    method: 'eth_getTransactionCount', 
    schema: schemas.quantity } as const; return Object.assign((url:string, ...
    params: [address:string, tag:Tag]) => c(url, { ...request, params }), { request })}
)()

export const code = (() => { const request = {
    method: 'eth_getCode', 
    schema: schemas.string } as const; return Object.assign((url:string, ...
    params: [address:string, tag:Tag]) => c(url, { ...request, params }), { request })}
)()

export const send = (() => { const request = {
    method: 'eth_sendRawTransaction', 
    schema: schemas.string } as const; return Object.assign((url:string, ...
    params: [data:string]) => c(url, { ...request, params }), { request })}
)()

export const call = (() => { const request = {
    method: 'eth_call', 
    schema: schemas.string } as const; return Object.assign((url:string, ...
    params: [txCallObject:TxCallObject]) => c(url, { ...request, params }), { request })}
)()

export const estimateGas = (() => { const request = {
    method: 'eth_estimateGas', 
    schema: schemas.quantity } as const; return Object.assign((url:string, ...
    params: [txCallObject:Partial<TxCallObject>]) => c(url, { ...request, params }), { request })}
)()

export const receipt = (() => { const request = {
    method: 'eth_getTransactionReceipt', 
    schema: schemas.receipt } as const; return Object.assign((url:string, ...
    params: [hash:string]) => c(url, { ...request, params }), { request })}
)()

export const logs = (() => { const request = {
    method: 'eth_getLogs', 
    schema: schemas.log.array() } as const; return Object.assign((url:string, ...
    params: [filter:Filter]) => c(url, { ...request, params }), { request })}
)()

// unfinished
// export const trace = (() => { const request = {
//     method: 'debug_traceTransaction', 
//     schema: schemas.log.array() } as const; return Object.assign((url:string, ...params:
//     [filter:Filter]) => c(url, { ...request, params }), { request })}
// )()