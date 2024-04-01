import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'
import { AIQ } from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/aiq@0.0.1/mod.ts'
import { Lazy } from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/lazy@0.0.0/mod.ts'
import { Snail } from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/snail@0.0.0/mod.ts'
import { Toad } from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/toad@0.0.7/mod.ts'
import { Params as P } from '../types/mod.ts'
import * as schemas from '../schemas/mod.ts'
import * as r from '../request/mod.ts'

const replacer = (_:unknown,v:unknown)=>typeof v=='bigint'?''+v:v

export class Ejra {
    
    out:AIQ<string>
    err:AIQ<Error>
    toad:Toad

    constructor(toad:Toad) {
        
        this.out = new AIQ<string>()
        this.err = new AIQ<Error>()
        this.toad = toad

    }

    clientVersion(this:Ejra, url:string, ...p:P['clientVersion']) { const request = r.clientVersion; return this.#call(url, { ...request, params: p }) }
    sha3(this:Ejra, url:string, ...p:P['sha3']) { const request = r.sha3; return this.#call(url, { ...request, params: p }) }
    chainId(this:Ejra, url:string, ...p:P['chainId']) { const request = r.chainId; return this.#call(url, { ...request, params: p }) }
    gasPrice(this:Ejra, url:string, ...p:P['gasPrice']) { const request = r.gasPrice; return this.#call(url, { ...request, params: p }) }
    height(this:Ejra, url:string, ...p:P['height']) { const request = r.height; return this.#call(url, { ...request, params: p }) }
    balance(this:Ejra, url:string, ...p:P['balance']) { const request = r.balance; return this.#call(url, { ...request, params: p }) }
    slot(this:Ejra, url:string, ...p:P['slot']) { const request = r.slot; return this.#call(url, { ...request, params: p }) }
    nonce(this:Ejra, url:string, ...p:P['nonce']) { const request = r.nonce; return this.#call(url, { ...request, params: p }) }
    code(this:Ejra, url:string, ...p:P['code']) { const request = r.code; return this.#call(url, { ...request, params: p }) }
    send(this:Ejra, url:string, ...p:P['send']) { const request = r.send; return this.#call(url, { ...request, params: p }) }
    call(this:Ejra, url:string, ...p:P['call']) { const request = r.call; return this.#call(url, { ...request, params: p }) }
    estimateGas(this:Ejra, url:string, ...p:P['estimateGas']) { const request = r.estimateGas; return this.#call(url, { ...request, params: p }) }
    receipt(this:Ejra, url:string, ...p:P['receipt']) { const request = r.receipt; return this.#call(url, { ...request, params: p }) }
    logs(this:Ejra, url:string, ...p:P['logs']) { const request = r.logs; return this.#call(url, { ...request, params: p }) }

    async#call<
        E extends {
            method:string,
            params:P,
            schema:S
        },
        P extends readonly unknown[],
        S extends z.ZodTypeAny
    >(this:Ejra, url:string, request:E):Promise<Error|z.infer<E['schema']>> {

        // use this to "preserve" stack
        const stacky = new Error()

        // build init
        const jrrq = { ...request, jsonrpc: '2.0', id: 0 } as const
        const body = JSON.stringify(jrrq, (_,v)=>typeof v=='bigint'?`0x${v.toString(16)}`:v)
        const headers = { 'Content-Type': 'application/json' } as const
        const init = { body, headers, method: 'POST' } as const

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
            try { response = schemas.response.parse(JSON.parse(text)) }
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
                error.cause = JSON.stringify({ response, schemas }, replacer)
                throw error
            }

        }

        // 🐌
        const snail = new Snail(lazy)
        snail.born
            .then(() => this.out.push(`ejra.call sending request to ${url} ${JSON.stringify(request, replacer)}`))
        snail.died
            .then(value => this.out.push(`ejra.call received value from ${url} ${JSON.stringify(value, replacer)} for request ${JSON.stringify(request, replacer)}`))
            .catch(reason => {
                const error = new Error(reason)
                error.stack += stacky.stack??''
                error.message = `ejra.call failed requesting from ${url} ${JSON.stringify(request, replacer)}`
                error.cause = reason?.cause
                this.err.push(error)
                return error
            })
        return await this.toad.feed(snail).catch(reason => new Error(reason))

    }

}