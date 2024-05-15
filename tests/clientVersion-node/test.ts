import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { Node } from "../../lib/Node.ts"

const node = new Node("http://chain-8000");
const result = await node.clientVersion();

Deno.test("type test", () => {
  console.log(result, node)
  assertEquals(typeof result, "string");
});
