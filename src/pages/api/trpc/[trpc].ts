/**
 * This file contains tRPC's HTTP response handler
 */
import * as trpcNext from "@trpc/server/adapters/next"
import { createContext } from "../../../server/context"
import { appRouter } from "../../../server/router/_app"

export default trpcNext.createNextApiHandler({
	router: appRouter,
	createContext,
	onError({ error }) {
		console.error("Something went wrong", error)
	},
	batching: {
		enabled: true,
	},
})
