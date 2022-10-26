import Head from "next/head"
import { trpc } from "../utils/trpc"
import { Bar } from 'react-chartjs-2';
import { useState } from "react";

export const options = {
	responsive: true,
	plugins: {
		title: {
			display: false,
			text: 'Emissions',
		},
	},
};

export enum Unit {
	kgCO2 = 'kgCO2',
	tCO2 = 'tCO2'
}

export default function Home() {
	const [unit, setUnit] = useState<Unit>(Unit.kgCO2)
	const [randomize, setRandomize] = useState(false)
	const helloQuery = trpc.data.hello.useQuery({ text: "and welcome" })
	const { data=[] } = trpc.data.prismaExample.useQuery({ unit, randomize })
	
	const chartData = {
		labels: data.map(({ category }) => category),
		datasets: [{
			label: 'Emissions (' + unit + ')',
			data: data.map(({_sum}) => _sum[unit]),
			backgroundColor,
			borderColor,
			borderWidth: 1
		}
	]}

	const changeHandler = event => setUnit(event.target.value)
	const showRandomData = () => {
		setRandomize(true)
		setTimeout(() => setRandomize(false), 1000)
	}

	return (
		<>
			<Head>
				<title>Tanso Coding Challenge</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{/* Add your content here, feel free to remove everything you don't need */}
			<div className="container mx-auto flex flex-column items-center justify-center min-h-screen">
				<div style={{width: '600px', height: '600px', margin: 'auto'}}>
					<Bar options={options} data={chartData} />
					<div className=".p-0">
						<div>
							<input type='radio' name='unit' value='kgCO2' onChange={changeHandler} checked={unit === Unit.kgCO2} />
							<label htmlFor='kgCO2'>{Unit.kgCO2}</label>
						</div>

						<div>
							<input type='radio' name='unit' value='tCO2' onChange={changeHandler} />
							<label htmlFor='kgCO2'>{Unit.tCO2}</label>
						</div>
					</div>
					<div className="container mx-auto flex justify-center">
						<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={showRandomData}>
							Randomize Data
						</button>
					</div>
				</div>
			</div>
			

			
			<main className="container mx-auto flex flex-col items-center justify-center min-h-screen">
				<h1 className="font-bold text-2xl">
					{helloQuery.data ? `${helloQuery.data.greeting} to the Tanso Coding Challenge` : "..."}
				</h1>
			</main>
		</>
	)
}

const backgroundColor = [
	'rgba(255, 99, 132, 0.2)',
	'rgba(255, 159, 64, 0.2)',
	'rgba(255, 205, 86, 0.2)',
	'rgba(75, 192, 192, 0.2)',
	'rgba(54, 162, 235, 0.2)',
	'rgba(153, 102, 255, 0.2)',
	'rgba(201, 203, 207, 0.2)'
];

const borderColor = [
	'rgb(255, 99, 132)',
	'rgb(255, 159, 64)',
	'rgb(255, 205, 86)',
	'rgb(75, 192, 192)',
	'rgb(54, 162, 235)',
	'rgb(153, 102, 255)',
	'rgb(201, 203, 207)'
];
