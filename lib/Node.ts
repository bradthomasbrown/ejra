import * as methods from 'methods/mod.ts'

export class Node {
    rpc:string
    clientVersion:()=>Promise<string>
    constructor(rpc:string) {
        this.rpc = rpc
        this.clientVersion = () => methods.clientVersion(rpc)
    }
}