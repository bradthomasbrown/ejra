import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'

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

    // get response
    const response = await fetch(url, init)

    // turn response into json
    const json = await response.json()

    // extract result and error from json
    const { result } = z.object({
        result: z.unknown(),
        // error: z.object({ message: z.string() }).optional()
    }).parse(json)

    // parse the result with the given schema
    return request.schema.parse(result)

}