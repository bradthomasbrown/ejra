import { Tag } from '../../types/mod.ts'
import * as m from '../methods/mod.ts'

type Options = {
    address:string
    tag?:Tag
}

export function balance(options:Options) {
    const { address, tag } = options
    const params = [address, tag ?? 'latest'] as const
    return { ...m.balance, params }
}