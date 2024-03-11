import { q } from '../schemas/mod.ts'
import { Tag } from '../types/mod.ts'
import { ejraCall } from '../lib/mod.ts'

export default function balance({
    address,
    tag='latest',
    url
}:{
    address:string
    tag:Tag,
    url?:string
}) {
    const schema = q
    const params = [address, tag] as const
    const method = 'eth_getBalance' as const
    const ejrrq = { method, params, schema }
    if (url) return ejraCall({ url, ejrrq })
    else return ejrrq
}