import { t } from "../trpc"
import { dataRouter } from "./data"

export const appRouter = t.router({
	data: dataRouter,
})

export type AppRouter = typeof appRouter
