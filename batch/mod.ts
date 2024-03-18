import * as methods from '../method/mod.ts'

type Slice<T> = T extends [url:string, ...params: infer P] ? P : never

export function clientVersion(...params:Slice<Parameters<
 typeof methods.clientVersion>>) { return {
     ...methods.clientVersion.request, params }
}

export function sha3(...params:Slice<Parameters<
 typeof methods.sha3>>) { return {
     ...methods.sha3.request, params }
}

export function chainId(...params:Slice<Parameters<
 typeof methods.chainId>>) { return {
     ...methods.chainId.request, params }
}

export function gasPrice(...params:Slice<Parameters<
 typeof methods.gasPrice>>) { return {
     ...methods.gasPrice.request, params }
}

export function height(...params:Slice<Parameters<
 typeof methods.height>>) { return {
     ...methods.height.request, params }
}

export function balance(...params:Slice<Parameters<
 typeof methods.balance>>) { return {
     ...methods.balance.request, params }
}

export function slot(...params:Slice<Parameters<
 typeof methods.slot>>) { return {
     ...methods.slot.request, params }
}

export function nonce(...params:Slice<Parameters<
 typeof methods.nonce>>) { return {
     ...methods.nonce.request, params }
}

export function code(...params:Slice<Parameters<
 typeof methods.code>>) { return {
     ...methods.code.request, params }
}

export function send(...params:Slice<Parameters<
 typeof methods.send>>) { return {
     ...methods.send.request, params }
}

export function call(...params:Slice<Parameters<
 typeof methods.call>>) { return {
     ...methods.call.request, params }
}

export function estimateGas(...params:Slice<Parameters<
 typeof methods.estimateGas>>) { return {
     ...methods.estimateGas.request, params }
}

export function receipt(...params:Slice<Parameters<
 typeof methods.receipt>>) { return {
     ...methods.receipt.request, params }
}

export function logs(...params:Slice<Parameters<
 typeof methods.logs>>) { return {
     ...methods.logs.request, params }
}