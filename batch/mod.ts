import { Ejra } from '../lib/mod.ts'
import { Params as P } from '../type/mod.ts'
import * as r from '../request/mod.ts'

type Slice<T> = T extends [url:string, ...params: infer P] ? P : never

export function clientVersion(this:Ejra, ...params:P['clientVersion']) {
    return { ...r.clientVersion, params }
}

export function sha3(this:Ejra, ...params:P['sha3']) {
    return { ...r.sha3, params }
}

export function chainId(this:Ejra, ...params:P['chainId']) {
    return { ...r.chainId, params }
}

export function gasPrice(this:Ejra, ...params:P['gasPrice']) {
    return { ...r.gasPrice, params }
}

export function height(this:Ejra, ...params:P['height']) {
    return { ...r.height, params }
}

export function balance(this:Ejra, ...params:P['balance']) {
    return { ...r.balance, params }
}

export function slot(this:Ejra, ...params:P['slot']) {
    return { ...r.slot, params }
}

export function nonce(this:Ejra, ...params:P['nonce']) {
    return { ...r.nonce, params }
}

export function code(this:Ejra, ...params:P['code']) {
    return { ...r.code, params }
}

export function send(this:Ejra, ...params:P['send']) {
    return { ...r.send, params }
}

export function call(this:Ejra, ...params:P['call']) {
    return { ...r.call, params }
}

export function estimateGas(this:Ejra, ...params:P['estimateGas']) {
    return { ...r.estimateGas, params }
}

export function receipt(this:Ejra, ...params:P['receipt']) {
    return { ...r.receipt, params }
}

export function logs(this:Ejra, ...params:P['logs']) {
    return { ...r.logs, params }
}