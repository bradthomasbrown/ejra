import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'
import { AIQ } from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/aiq@0.0.0/mod.ts'
import { Lazy } from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/lazy@0.0.0/mod.ts'
import { Snail } from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/snail@0.0.0/mod.ts'
import { Toad } from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/toad@0.0.6-vertigo/mod.ts'
import { KvCache } from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/kvcache@0.0.2-vertigo/mod.ts'
import { KvVertigo } from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/kvvertigo@0.0.2/mod.ts'
import { Params as P } from '../types/mod.ts'
import * as schemas from '../schemas/mod.ts'
import * as r from '../request/mod.ts'

const replacer = (_:unknown,v:unknown)=>typeof v=='bigint'?''+v:v

export class Ejra {
    
    out:AIQ<string>
    err:AIQ<Error>
    kv:KvVertigo
    toad:Toad
    urls:Map<bigint,KvCache<string>>

    constructor(kv:KvVertigo, toad:Toad) {
        
        this.out = new AIQ<string>()
        this.err = new AIQ<Error>()
        this.kv = kv
        this.toad = toad
        this.urls = new Map()

    }

    clientVersion(this:Ejra, id:bigint, ...p:P['clientVersion']) { const request = r.clientVersion; return this.#call(id, { ...request, params: p }) }
    sha3(this:Ejra, id:bigint, ...p:P['sha3']) { const request = r.sha3; return this.#call(id, { ...request, params: p }) }
    chainId(this:Ejra, id:bigint, ...p:P['chainId']) { const request = r.chainId; return this.#call(id, { ...request, params: p }) }
    gasPrice(this:Ejra, id:bigint, ...p:P['gasPrice']) { const request = r.gasPrice; return this.#call(id, { ...request, params: p }) }
    height(this:Ejra, id:bigint, ...p:P['height']) { const request = r.height; return this.#call(id, { ...request, params: p }) }
    balance(this:Ejra, id:bigint, ...p:P['balance']) { const request = r.balance; return this.#call(id, { ...request, params: p }) }
    slot(this:Ejra, id:bigint, ...p:P['slot']) { const request = r.slot; return this.#call(id, { ...request, params: p }) }
    nonce(this:Ejra, id:bigint, ...p:P['nonce']) { const request = r.nonce; return this.#call(id, { ...request, params: p }) }
    code(this:Ejra, id:bigint, ...p:P['code']) { const request = r.code; return this.#call(id, { ...request, params: p }) }
    send(this:Ejra, id:bigint, ...p:P['send']) { const request = r.send; return this.#call(id, { ...request, params: p }) }
    call(this:Ejra, id:bigint, ...p:P['call']) { const request = r.call; return this.#call(id, { ...request, params: p }) }
    estimateGas(this:Ejra, id:bigint, ...p:P['estimateGas']) { const request = r.estimateGas; return this.#call(id, { ...request, params: p }) }
    receipt(this:Ejra, id:bigint, ...p:P['receipt']) { const request = r.receipt; return this.#call(id, { ...request, params: p }) }
    logs(this:Ejra, id:bigint, ...p:P['logs']) { const request = r.logs; return this.#call(id, { ...request, params: p }) }

    async #call<
        E extends {
            method:string,
            params:P,
            schema:S
        },
        P extends readonly unknown[],
        S extends z.ZodTypeAny
    >(this:Ejra, chainId:bigint, request:E):Promise<Error|z.infer<E['schema']>> {

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
        return this.toad.feed(snail).catch(reason => new Error(reason))

    }

}