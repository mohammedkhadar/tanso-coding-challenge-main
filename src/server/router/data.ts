import { z } from "zod"
import { t } from "../trpc"
import { Unit } from "../../../src/pages/index"
import { faker } from "@faker-js/faker"

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
	prismaExample: t.procedure
		.input(
			z
				.object({
					unit: z.string().nullish(),
					randomize: z.boolean()
				})
				.nullish(),
		)
		.query(async ({ ctx, input }) => {
			// you can access the prisma client from ctx.prisma
			if (input?.randomize) {
				await ctx.prisma.dataPoint.deleteMany()
				const operations = []
				for (let i = 0; i < 1000; i++) {
					const category = faker.helpers.arrayElement(CATEGORIES)
					const kgCO2 = faker.datatype.float({ min: 50, max: 1500 })
					operations.push(ctx.prisma.dataPoint.create({ data: { category, kgCO2 } }))
				}
				await Promise.all(operations)
			}
			
			const emissionsByCategory = await ctx.prisma?.dataPoint.groupBy({
				by: ['category'],
				_sum: {
					kgCO2: true,
				},
			})
			
			if (input?.unit === Unit.tCO2) {
				return emissionsByCategory.map(data =>
					({ ...data, _sum: { tCO2: (data?._sum?.kgCO2 || 0) / 1000 }}))
			}

			return emissionsByCategory
		}),
})
