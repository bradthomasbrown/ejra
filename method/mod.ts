// import { call as c, Ejra } from '../lib/mod.ts'
// import { Params as P } from '../types/mod.ts'
// import * as r from '../request/mod.ts'

// export function clientVersion(this:Ejra, ...params:P['clientVersion']) {
//     return c.bind(this)({ ...r.clientVersion, params })
// }

// export function sha3(this:Ejra, ...params:P['sha3']) {
//     return c.bind(this)({ ...r.sha3, params })
// }

// export function chainId(this:Ejra, ...params:P['chainId']) {
//     return c.bind(this)({ ...r.chainId, params })
// }

// export function gasPrice(this:Ejra, ...params:P['gasPrice']) {
//     return c.bind(this)({ ...r.gasPrice, params })
// }

// export function height(this:Ejra, ...params:P['height']) {
//     return c.bind(this)({ ...r.height, params })
// }

// export function balance(this:Ejra, ...params:P['balance']) {
//     return c.bind(this)({ ...r.balance, params })
// }

// export function slot(this:Ejra, ...params:P['slot']) {
//     return c.bind(this)({ ...r.slot, params })
// }

// export function nonce(this:Ejra, ...params:P['nonce']) {
//     return c.bind(this)({ ...r.nonce, params })
// }

// export function code(this:Ejra, ...params:P['code']) {
//     return c.bind(this)({ ...r.code, params })
// }

// export function send(this:Ejra, ...params:P['send']) {
//     return c.bind(this)({ ...r.send, params })
// }

// export function call(this:Ejra, ...params:P['call']) {
//     return c.bind(this)({ ...r.call, params })
// }

// export function estimateGas(this:Ejra, ...params:P['estimateGas']) {
//     return c.bind(this)({ ...r.estimateGas, params })
// }

// export function receipt(this:Ejra, ...params:P['receipt']) {
//     return c.bind(this)({ ...r.receipt, params })
// }

// export function logs(this:Ejra, chainId:bigint, ...params:P['logs']) {
//    const foo = c.bind<typeof c>(this)(1n, { ...r.logs, params })
// }