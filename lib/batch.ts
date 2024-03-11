import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'
import { RLB } from 'https://deno.land/x/rlb@0.0.7/RLB.ts';

export async function batch<
    E extends readonly {
        method:string,
        params?:P,
        schema:S
    }[],
    P extends readonly unknown[],
    S extends z.ZodTypeAny
>({
    requests,
    url,
    rlb
}:{
    requests:E
    url:string,
    rlb?:RLB,
}) {

    // build init
    const jrrqs = requests.map(({ method, params }, i) =>
        ({ jsonrpc: '2.0', method, params: params ?? [] as const, id: i }))
    const body = JSON.stringify(jrrqs, (_, v) => typeof v == 'bigint' ? `0x${v.toString(16)}` : v)
    const headers = { 'Content-Type': 'application/json' } as const
    const init = { body, headers, method: 'POST' } as const

    // pre response var
    let response

    // if rlb, use RLB with a gate
    if (rlb) {
        const gate = Promise.withResolvers<Response>()
        const resolver = () => fetch(url, init)
            .then(gate.resolve)
            .catch(gate.resolve)
        rlb.push(resolver)
        response = await gate.promise
        if (response instanceof Error) throw response
    // otherwise, do a normal fetch
    } else {
        response = await fetch(url, init).catch(e => e instanceof Error ? e : new Error(JSON.stringify(e)))
        // if response is a promise here, that's because it rejected, return that
        if (response instanceof Error) throw response
    }
    // by now, response should be some unknown response that isn't an error

    // turn response into json
    const json = await response.json()

    // extract results and errors from json
    const jrrss = await z.object({ result: z.unknown(), id: z.number() }).array().length(requests.length).parseAsync(json)

    // parse the results with the given schemas
    return Promise.all(requests.map(({ schema }, i) => schema.parseAsync(jrrss.find(({ id }) => i == id)?.result))) as {
        [P in keyof E]: E[P]['schema'] extends z.ZodTypeAny ? z.infer<E[P]['schema']> : never
    }

}