import { PrismaClient } from "@prisma/client"
import { faker } from "@faker-js/faker"
import { CATEGORIES } from "../src/server/router/data"

const prisma = new PrismaClient()

async function seed() {
	await prisma.dataPoint.deleteMany()
	const operations = []
	for (let i = 0; i < 1000; i++) {
		const category = faker.helpers.arrayElement(CATEGORIES)
		const kgCO2 = faker.datatype.float({ min: 50, max: 1500 })
		operations.push(prisma.dataPoint.create({ data: { category, kgCO2 } }))
	}
	await Promise.all(operations)
}

seed()
	.catch((error) => {
		console.log(error)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
