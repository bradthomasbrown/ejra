import * as m from '../methods/mod.ts'

type Options = {
    data:string
}

export function balance(options:Options) {
    const { data } = options
    const params = [data] as const
    return { ...m.sendRawTx, params }
}