import Head from "next/head"
import { trpc } from "../utils/trpc"

export default function Home() {
	const helloQuery = trpc.data.hello.useQuery({ text: "and welcome" })
	const { data=[] } = trpc.data.prismaExample.useQuery()

	return (
		<>
			<Head>
				<title>Tanso Coding Challenge</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{/* Add your content here, feel free to remove everything you don't need */}
			{data.map((element, index) => <div key={index}>{element.category} - {element._sum.kgCO2}</div>)}
			<main className="container mx-auto flex flex-col items-center justify-center min-h-screen">
				<h1 className="font-bold text-2xl">
					{helloQuery.data ? `${helloQuery.data.greeting} to the Tanso Coding Challenge` : "..."}
				</h1>
			</main>
		</>
	)
}
