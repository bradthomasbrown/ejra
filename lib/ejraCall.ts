import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'
import { rlb } from 'https://deno.land/x/rlb@0.0.7/RLB.ts'

export async function ejraCall<
    E extends { method:string, params?:P, schema:S },
    P extends readonly unknown[],
    S extends z.ZodTypeAny
>({
    ejrrq: {
        method,
        params,
        schema
    },
    url,
    rlbBypass
}:{
    ejrrq:E,
    url:string,
    rlbBypass?:boolean
}) {

    // build init
    const jrrq = { jsonrpc: '2.0', method, params: params ?? [] as const, id: 0 } as const
    const body = JSON.stringify(jrrq, (_, v) => typeof v == 'bigint' ? `0x${v.toString(16)}` : v)
    const headers = { 'Content-Type': 'application/json' } as const
    const init = { body, headers, method: 'POST' } as const

    // pre response var
    let response

    // if rlbBypass, do a normal fetch
    if (rlbBypass) {
        response = await fetch(url, init).catch(e => e instanceof Error ? e : new Error(JSON.stringify(e)))
        // if response is a promise here, that's because it rejected, return that
        if (response instanceof Error) throw response
    // otherwise, use RLB with a gate
    } else { 
        const gate = Promise.withResolvers<Response>()
        const resolver = () => fetch(url, init)
            .then(gate.resolve)
            .catch(gate.resolve)
        rlb.push(resolver)
        response = await gate.promise
        if (response instanceof Error) throw response
    }
    // by now response should be some unknown response that isn't an error

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