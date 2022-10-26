import { z } from "zod"
import { t } from "../trpc"

export const CATEGORIES = [
	"Stationary combustion",
	"Mobile combustion",
	"Fugitive emissions",
	"Electricity",
	"Purchased goods and services",
	"Business travel",
]

export const dataRouter = t.router({
	hello: t.procedure
		.input(
			z
				.object({
					text: z.string().nullish(),
				})
				.nullish(),
		)
		.query(({ input }) => {
			return {
				greeting: `Hello ${input?.text ?? "world"}`,
			}
		}),
	prismaExample: t.procedure.query(async ({ ctx }) => {
		// you can access the prisma client from ctx.prisma
		const emissionsByCategory = await ctx.prisma?.dataPoint.groupBy({
			by: ['category'],
			_sum: {
			  kgCO2: true,
			},
		})

		return emissionsByCategory
	}),
})
