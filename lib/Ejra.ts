import { AIQ } from 'https://deno.land/x/aiq@0.0.0/mod.ts'
import * as lib from '../mod.ts'
import * as batch from '../batch/mod.ts'
import * as method from '../method/mod.ts'

export class Ejra {

    out:AIQ<string>
    err:AIQ<Error>
    lib:typeof lib

    constructor() {
        this.out = new AIQ<string>()
        this.err = new AIQ<Error>()
        this.lib = lib
    }

}

export const ejra = new Ejra()