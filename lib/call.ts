import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'
import { Lazy } from 'https://deno.land/x/lazy_promise@0.0.1/mod.ts'
import { Snail } from 'https://deno.land/x/snail@0.0.0/mod.ts'
import { ejra } from './mod.ts'

const replacer = (_:unknown,v:unknown)=>typeof v=='bigint'?''+v:v

export async function call<
    E extends {
        method:string,
        params:P,
        schema:S
    },
    P extends readonly unknown[],
    S extends z.ZodTypeAny
>(url:string, request:E):Promise<z.infer<E['schema']>> {

    // build init
    const jrrq = { ...request, jsonrpc: '2.0', id: 0 } as const
    const body = JSON.stringify(jrrq, (_,v)=>typeof v=='bigint'?`0x${v.toString(16)}`:v)
    const headers = { 'Content-Type': 'application/json' } as const
    const init = { body, headers, method: 'POST' } as const

    // construct lazy
    const lazy:Lazy<z.infer<E['schema']>> = async () => {
        const response = await fetch(url, init)
        const json = await response.json()
        const { result } = z.object({ result: z.unknown() }).parse(json)
        return request.schema.parse(result)
    }

    // 🐌
    const snail = new Snail(lazy)
    snail.born
        .then(() => ejra.out.push(`ejra.call sending request ${JSON.stringify(request, replacer)}`))
    snail.died
        .then(value => ejra.out.push(`ejra.call received value ${JSON.stringify(value, replacer)} for request ${JSON.stringify(request, replacer)}`))
        .catch(reason => ejra.err.push(new Error(`ejra.call failed requesting ${JSON.stringify(request, replacer)}`, { cause: reason })))
    return snail.lazy().catch(() => {})

}