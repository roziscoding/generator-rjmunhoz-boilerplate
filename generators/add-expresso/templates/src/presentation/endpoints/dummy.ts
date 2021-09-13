// TODO: Replace this endpointi with a real one
import { z } from "zod";
import { createEndpoint } from "@expresso/router";

export const dummy = createEndpoint({
  summary: "Dummy endpoint",
  input: {},
  output: {
    200: z.object({ ok: z.literal(true) }),
  },
  handlers: async (_req, res) => {
    res.status(200).json({ ok: true });
  },
});
