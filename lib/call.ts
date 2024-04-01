import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'
import { Lazy } from 'https://deno.land/x/lazy_promise@0.0.1/mod.ts'
import { Snail } from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/snail@0.0.3/mod.ts'
import * as schema from '../schemas/mod.ts'
import { Ejra } from './mod.ts'

const replacer = (_:unknown,v:unknown)=>typeof v=='bigint'?''+v:v

export async function call<
    E extends {
        method:string,
        params:P,
        schema:S
    },
    P extends readonly unknown[],
    S extends z.ZodTypeAny
>(this:Ejra, chainId:bigint, request:E):Promise<z.infer<E['schema']>> {

    // use this to "preserve" stack
    const stacky = new Error()

    // build init
    const jrrq = { ...request, jsonrpc: '2.0', id: 0 } as const
    const body = JSON.stringify(jrrq, (_,v)=>typeof v=='bigint'?`0x${v.toString(16)}`:v)
    const headers = { 'Content-Type': 'application/json' } as const
    const init = { body, headers, method: 'POST' } as const
    
    const url = await this.urls.get(chainId)?.get()
    if (url === undefined) {
        this.err.push(new Error(`ejra.call failed, no url for chainId ${chainId}`))
        return stacky 
    }

    // construct lazy
    const lazy:Lazy<z.infer<E['schema']>> = async () => {

        const text = await fetch(url, init)
            .then(response => response.text())
            .catch(reason => {
                const error = new Error(reason)
                error.stack += stacky.stack??''
                throw error
            })

        let response
        try { response = schema.response.parse(JSON.parse(text)) }
        catch(reason) {
            const error = new Error(reason)
            error.stack += stacky.stack??''
            error.message = 'rpc response is not a valid json rpc response'
            error.cause = text.slice(-100)
            throw error
        }

        if ('error' in response) {
            const error = new Error()
            error.stack += stacky.stack??''
            error.message = 'json response contains error'
            error.cause = JSON.stringify(response, replacer)
            throw error
        } 

        try { return request.schema.parse(response.result) }
        catch(reason) {
            const error = new Error(reason)
            error.stack += stacky.stack??''
            error.message = 'json response result does not fit provided schema'
            error.cause = JSON.stringify({ response, schema }, replacer)
            throw error
        }

    }

    // 🐌
    const snail = new Snail(lazy)
    snail.born
        .then(() => this.out.push(`ejra.call sending request to ${url} ${JSON.stringify(request, replacer)}`))
    snail.died
        .then(value => this.out.push(`ejra.call received value from ${url} ${JSON.stringify(value, replacer)} for request ${JSON.stringify(request, replacer)}`))
        .catch(reason => this.err.push(new Error(`ejra.call failed requesting from ${url} ${JSON.stringify(request, replacer)}`, { cause: reason })))
    return this.toad.feed(snail)

}