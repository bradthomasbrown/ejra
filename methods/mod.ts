/**
 * ejra methods, these are bindings of the Ethereum JSON RPC API methods.
 * these either return a request object that can be used to make a JSON RPC call to a node,
 * or, if a url is included, will execute the call and return the result
 * @namespace methods
 * @property {module:methods}
 * @module methods
 */

export * from './balance.ts'
export * from './height.ts'