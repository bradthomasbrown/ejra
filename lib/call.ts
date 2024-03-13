import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'
import { RLB } from 'https://deno.land/x/rlb@0.0.9/RLB.ts'

export async function call<
    E extends {
        method:string,
        params?:P,
        schema:S
    },
    P extends readonly unknown[],
    S extends z.ZodTypeAny
>({
    request: {
        method,
        params,
        schema
    },
    url,
    rlb
}:{
    request:E
    url:string
    rlb?:RLB
}) {

    // build init
    const jrrq = { jsonrpc: '2.0', method, params: params ?? [] as const, id: 0 } as const
    const body = JSON.stringify(jrrq, (_, v) => typeof v == 'bigint' ? `0x${v.toString(16)}` : v)
    const headers = { 'Content-Type': 'application/json' } as const
    const init = { body, headers, method: 'POST' } as const

    // get response
    const response = rlb
        ? await rlb.regulate({ fn: fetch, args: [url, init] as const })
        : await fetch(url, init)

    // turn response into json
    const json = await response.json()

    // extract result and error from json
    const { result, error } = await z.object({
        result: z.unknown(),
        error: z.object({ message: z.string() }).optional()
    }).parseAsync(json)

    // if error, throw it
    if (error) throw new Error(error.message, { cause: JSON.stringify(json) })

    // parse the result with the given schema
    const foo = await schema.parseAsync(result) as z.infer<E['schema']>

    // return the result
    return foo

}