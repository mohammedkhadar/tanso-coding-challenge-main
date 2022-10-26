# Tanso Coding Challenge

## Task

The task is to create a chart with a library of your choice (we use Chart.js) and visualize the data you find in the database. The x-axis should be the "category" of the data points, the y-axis should be the emissions in kgCO2/tCO2. To get the data, create a new tRPC query endpoint which uses the Prisma client to return the data points. Furthermore, add a toggle to the chart which switches between kgCO2 and tCO2. This conversion should happen in the backend.

Additionally, add a button which creates a random dataset for the chart. For that you need to add a mutation in which all data points are deleted and new ones are generated. You can take a look at the seed script to see how random values can be generated.

## Setup

Install dependencies with `yarn`, run `yarn db:push` and `yarn seed` to set everything up.
After that run `yarn dev` to start the development server and you should be good to go.

## Tech

-   [Next.js](https://nextjs.org/docs)
-   [tRPC](https://trpc.io/docs/v10/)
-   [Prisma](https://www.prisma.io/docs/)
-   [Tailwind](https://tailwindcss.com/docs/utility-first)
-   [Zod](https://github.com/colinhacks/zod)

## How to submit

Just commit and push all your changes and send us the link to your (public) repo.
