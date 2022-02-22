import { convert } from "./Currency";
import { rest, server } from "../testServer";
//===============
it("converts correctly", async () => {
  const rate = await convert("USD", "CAD");
  expect(rate).toEqual(1.42);
});
//===============
it("handles failure", async () => {
  server.use(
    rest.get("https://api.exchangereatesapi.io/latest", (req, res, ctx) => {
      return res(ctx.status(404));
    }),
    rest.get("*", (req, res, ctx) => {
      console.error(`Please add request handler for ${req.url.toString()}`);
      return res(
        ctx.status(500),
        ctx.json({ error: "Please add request handler" })
      );
    })
  );
  //TEST if exception was thrown
  // await expect(convert("FAIL", "CAD")).rejects.toThrow("testing"); //DOESNT PASS
  await expect(convert("FAIL", "CAD")).rejects.toThrow("404"); // OK
});
