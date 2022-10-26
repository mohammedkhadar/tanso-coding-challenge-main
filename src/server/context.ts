import * as trpc from "@trpc/server"
import { prisma } from "./db/client"

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async () => {
	return {
		prisma,
	}
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>
