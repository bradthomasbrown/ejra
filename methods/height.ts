import { q } from '../schemas/mod.ts'
import { ejraCall } from '../lib/mod.ts'

export default function height({
    url
}:{
    url?:string
}) {
    const schema = q
    const method = 'eth_blockNumber' as const
    const ejrrq = { method, schema }
    if (url) return ejraCall({ url, ejrrq })
    else return ejrrq
}