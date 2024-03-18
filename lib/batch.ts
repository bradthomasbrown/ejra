import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'

export async function batch<
    E extends readonly {
        method:string,
        params?:P,
        schema:S
    }[],
    P extends readonly unknown[],
    S extends z.ZodTypeAny
>(url:string, requests:E) {

    // build init
    const jrrqs = requests.map(({ method, params }, i) =>
        ({ jsonrpc: '2.0', method, params: params ?? [] as const, id: i }))
    const body = JSON.stringify(jrrqs, (_, v) => typeof v == 'bigint' ? `0x${v.toString(16)}` : v)
    const headers = { 'Content-Type': 'application/json' } as const
    const init = { body, headers, method: 'POST' } as const

    // get response
    const response = await fetch(url, init)

    // turn response into json
    const json = await response.json()

    // extract results and errors from json
    const jrrss = z.object({ result: z.unknown(), id: z.number() })
        .array().length(requests.length).parse(json)

    // parse the results with the given schemas
    return Promise.all(requests.map(({ schema }, i) => schema.parseAsync(jrrss.find(({ id }) => i == id)?.result))) as {
        [P in keyof E]: E[P]['schema'] extends z.ZodTypeAny ? z.infer<E[P]['schema']> : never
    }

}