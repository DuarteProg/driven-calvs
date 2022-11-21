import { Router } from "express";
import { authenticateToken } from "@/middlewares";
//import { validateBody } from "@/middlewares";
import { ticketGet, ticketAll, postTikects } from "@/controllers";

const tikectsRouter = Router();

tikectsRouter.all("/*", authenticateToken);
tikectsRouter.get("/types", ticketGet);
tikectsRouter.get("/", ticketAll);
tikectsRouter.post("/", postTikects);

export { tikectsRouter };
