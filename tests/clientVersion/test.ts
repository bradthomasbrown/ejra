import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import * as methods from "methods/mod.ts";

const url = "http://chain-8000";
const result = await methods.clientVersion(url);

Deno.test("type test", () => {
  console.log(result)
  assertEquals(typeof result, "string");
});
