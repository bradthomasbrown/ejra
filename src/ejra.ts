import { Client } from "@bradthomasbrown/jra";

type Tag = bigint|"earliest"|"latest"|"safe"|"finalized"|"pending";

type TxCallObject = {
    from?:string
    to:string
    gas?:bigint
    gasPrice?:bigint
    value?:bigint
    input?:string
};

type Tx_11_ = {
    blockHash:null|string,
    blockNumber:null|string,
    from:string,
    gas:string,
    gasPrice:string,
    hash:string,
    input:string,
    nonce:string,
    to:null|string,
    transactionIndex:null|string,
    value:string,
    v:string,
    r:string,
    s:string
};

type Log_20_ = {
    removed:boolean,
    logIndex:null|string,
    transactionIndex:null|string,
    transactionHash:null|string,
    blockHash:null|string,
    blockNumber:null|string,
    address:string,
    data:Array<string>,
    topics:Array<string>
};

type Receipt_99_ = {
    transactionHash:string,
    transactionIndex:string,
    blockHash:string,
    blockNumber:string,
    from:string,
    to:null|string,
    cumulativeGasUsed:string,
    effectiveGasPrice:string,
    gasUsed:string,
    contractAddress:null|string,
    logs:Array<Log_20_>,
    logsBloom:string,
    type:number,
    root:undefined|string,
    status:undefined|string
};

type GuardedRequest = [method:string, params:any, guard:(value:any)=>unknown];

type GuardedRequestsToReturnTypes<T extends [...Array<GuardedRequest>]> = { [I in keyof T]: ReturnType<T[I][2]> };

function tuple<T extends Array<any>>(...tuple:T):T { return tuple; }

function parseNullableBigInt(_e9_:null|string):null|bigint {
    if (_e9_ === null) return _e9_;
    return BigInt(_e9_);
}

class Tx {
    static parse(_8b_:Tx_11_) {
        return {
            blockHash: _8b_.blockHash,
            blockNumber: parseNullableBigInt(_8b_.blockNumber),
            from: _8b_.from,
            gas: BigInt(_8b_.gas),
            gasPrice: BigInt(_8b_.gasPrice),
            hash: _8b_.hash,
            input: _8b_.input,
            nonce: BigInt(_8b_.nonce),
            to: _8b_.to,
            transactionIndex: parseNullableBigInt(_8b_.transactionIndex),
            value: BigInt(_8b_.value),
            v: BigInt(_8b_.v),
            r: BigInt(_8b_.r),
            s: BigInt(_8b_.s)
        };
    }
}

class Log {
    static parse(_a9_:Log_20_) {
        return {
            removed: _a9_.removed,
            logIndex: parseNullableBigInt(_a9_.logIndex),
            transactionIndex: parseNullableBigInt(_a9_.transactionIndex),
            transactionHash: _a9_.transactionHash,
            blockHash: _a9_.blockHash,
            blockNumber: parseNullableBigInt(_a9_.blockNumber),
            address: _a9_.address,
            data: _a9_.data,
            topics: _a9_.topics
        }
    }
}

class Receipt {
    static parse(_db_:null|Receipt_99_) {
        return _db_ === null ? _db_ : {
            transactionHash: _db_.transactionHash,
            transactionIndex: BigInt(_db_.transactionIndex),
            blockHash: _db_.blockHash,
            blockNumber: BigInt(_db_.blockNumber),
            from: _db_.from,
            to: _db_.to,
            cumulativeGasUsed: BigInt(_db_.cumulativeGasUsed),
            effectiveGasPrice: BigInt(_db_.effectiveGasPrice),
            gasUsed: BigInt(_db_.gasUsed),
            contractAddress: _db_.contractAddress,
            logs: _db_.logs.map(Log.parse),
            logsBloom: _db_.logsBloom,
            type: Number(_db_.type),
            root: _db_.root === undefined ? null : _db_.root,
            status: _db_.status === undefined ? null : Number(_db_.status)
        };
    }
}

function clientVersion() {
    const method = "web3_clientVersion";
    const params:[] = [];
    const guard = String;
    return tuple(method, params, guard);
}

function chainId() {
    const method = "eth_chainId";
    const params:[] = [];
    const guard = BigInt;
    return tuple(method, params, guard);
}

function gasPrice() {
    const method = "eth_gasPrice";
    const params:[] = [];
    const guard = BigInt;
    return tuple(method, params, guard);
}

function blockNumber() {
    const method = "eth_blockNumber";
    const params:[] = [];
    const guard = BigInt;
    return tuple(method, params, guard);
}

function getBalance(address:string, tag:Tag) {
    const method = "eth_getBalance";
    const params:[string, Tag] = [address, tag];
    const guard = BigInt;
    return tuple(method, params, guard);
}

function getStorageAt(address:string, index:bigint, tag:Tag) {
    const method = "eth_getStorageAt";
    const params:[string, string, Tag] = [address, "0x" + index.toString(16), tag];
    const guard = String;
    return tuple(method, params, guard);
}

function getTransactionCount(address:string, tag:Tag) {
    const method = "eth_getTransactionCount";
    const params:[string, Tag] = [address, tag];
    const guard = String;
    return tuple(method, params, guard);
}

function getCode(address:string, tag:Tag) {
    const method = "eth_getCode";
    const params:[string, Tag] = [address, tag];
    const guard = String;
    return tuple(method, params, guard);
}

function sendRawTransaction(data:string) {
    const method = "eth_sendRawTransaction";
    const params:[string] = [data];
    const guard = String;
    return tuple(method, params, guard);
}

function call(object:TxCallObject, tag:Tag) {
    const method = "eth_sendRawTransaction";
    const params:[TxCallObject, Tag] = [object, tag];
    const guard = String;
    return tuple(method, params, guard);
}

function estimateGas(object:Partial<TxCallObject>, tag:Tag) {
    const method = "eth_estimateGas";
    const params:[Partial<TxCallObject>, Tag] = [object, tag];
    const guard = BigInt;
    return tuple(method, params, guard);
}

function getTransactionByHash(hash:string) {
    const method = "eth_getTransactionByHash";
    const params:[string] = [hash];
    const guard = Tx.parse;
    return tuple(method, params, guard);
}

function getTransactionReceipt(hash:string) {
    const method = "eth_getTransactionReceipt";
    const params:[string] = [hash];
    const guard = Receipt.parse;
    return tuple(method, params, guard);
}

function traceTransaction(hash:string) {
    const method = "debug_traceTransaction";
    const params:[string] = [hash];
    const guard = (a:any)=>a;
    return tuple(method, params, guard);
}

function _2f4955_(client:Client):any {
    return function(fn:(...args:Array<any>)=>GuardedRequest) {
        return async function(...p:any):Promise<any> {
            const [method, params, guard] = fn(...p);
            const response = await client.request(method, params);
            return guard(response);
        }
    }
}

type GuardedRequestFnToSenderFn<T> =
    T extends (...params:infer P) => infer R
        ? R extends [string, any, (value:any) => infer S]
            ? (...params:P) => Promise<S>
        : never
    : never;

class Node {

    client:Client

    clientVersion:GuardedRequestFnToSenderFn<typeof clientVersion>
    chainId:GuardedRequestFnToSenderFn<typeof chainId>
    gasPrice:GuardedRequestFnToSenderFn<typeof gasPrice>
    blockNumber:GuardedRequestFnToSenderFn<typeof blockNumber>
    getBalance:GuardedRequestFnToSenderFn<typeof getBalance>
    getStorageAt:GuardedRequestFnToSenderFn<typeof getStorageAt>
    getTransactionCount:GuardedRequestFnToSenderFn<typeof getTransactionCount>
    getCode:GuardedRequestFnToSenderFn<typeof getCode>
    sendRawTransaction:GuardedRequestFnToSenderFn<typeof sendRawTransaction>
    call:GuardedRequestFnToSenderFn<typeof call>
    estimateGas:GuardedRequestFnToSenderFn<typeof estimateGas>
    getTransactionByHash:GuardedRequestFnToSenderFn<typeof getTransactionByHash>
    getTransactionReceipt:GuardedRequestFnToSenderFn<typeof getTransactionReceipt>
    traceTransaction:GuardedRequestFnToSenderFn<typeof traceTransaction>

    constructor(url:string) {
        this.client = new Client(url);
        const _92_ = _2f4955_(this.client);
        this.clientVersion = _92_(clientVersion);
        this.chainId = _92_(chainId);
        this.gasPrice = _92_(chainId);
        this.blockNumber = _92_(blockNumber);
        this.getBalance = _92_(getBalance);
        this.getStorageAt = _92_(getStorageAt);
        this.getTransactionCount = _92_(getTransactionCount);
        this.getCode = _92_(getCode);
        this.sendRawTransaction = _92_(sendRawTransaction);
        this.call = _92_(call);
        this.estimateGas = _92_(estimateGas);
        this.getTransactionByHash = _92_(getTransactionByHash);
        this.getTransactionReceipt = _92_(getTransactionReceipt);
        this.traceTransaction = _92_(traceTransaction);
    }

    batch<T extends Array<GuardedRequest>>(...requests:T):Promise<GuardedRequestsToReturnTypes<T>> {
        return Node.batch(this.client, ...requests);
    }

    static async batch<T extends Array<GuardedRequest>>(client:Client, ...requests:T):Promise<GuardedRequestsToReturnTypes<T>> {
        const _91_ = [];
        const _32_ = await client.request(...requests.map(([method, params]) => [method, params]).flat());
        if (requests.length == 1) return [requests[0]![2](_32_)] as GuardedRequestsToReturnTypes<T>;
        else _91_.push(..._32_);
        for (let i = 0; i < requests.length; i++)
            _91_[i] = requests[i]![2](_91_[i]);
        return _91_ as GuardedRequestsToReturnTypes<T>;
    }

}

const methods = {
    clientVersion, chainId, gasPrice, blockNumber, getBalance, getStorageAt,
    getTransactionCount, getCode, sendRawTransaction, call, estimateGas,
    getTransactionByHash, getTransactionReceipt, traceTransaction
};

export {
    methods,
    clientVersion, chainId, gasPrice, blockNumber, getBalance, getStorageAt,
    getTransactionCount, getCode, sendRawTransaction, call, estimateGas,
    getTransactionByHash, getTransactionReceipt, traceTransaction,
    Node
};