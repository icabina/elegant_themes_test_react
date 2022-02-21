import { convert } from "./currency";
import "whatwg-fetch";
import { rest } from "msw";
import { setupServer } from "msw/node";

it("converts correctly", async () => {
  const rate = await convert("USD", "CAD");
  expect(rate).toEqual(1.42);
});
