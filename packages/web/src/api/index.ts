import type { RouterClient } from "@orpc/server";
import { createApp } from "./__core/app";
import { ping } from "./routes/ping";
import { quiz } from "./routes/quiz";

export const router = {
  ping,
  quiz,
};

export type AppRouter = typeof router;
/** Typed client for the router — used by the web and mobile api clients. */
export type AppRouterClient = RouterClient<AppRouter>;

const app = createApp(router);

export default app;
