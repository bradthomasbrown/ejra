import * as m from '../methods/mod.ts'

type Options = {
    data:string
}

export function sendRawTx(options:Options) {
    const { data } = options
    const params = [data] as const
    return { ...m.sendRawTx, params }
}