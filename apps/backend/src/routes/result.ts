import { drizzle } from 'drizzle-orm/d1'
import { Hono } from 'hono'
import { getResult } from '~/features/result/usecase/getKeepProfitResult'
import { getUsdJpyRateByYearOperation } from '~/infrastructure/operations/usdJpyRateOperations'

type Bindings = {
	DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.post('/', async (c) => {
	const { pastYear, latestYear, pastAmount } = await c.req.json<{
		pastYear: number
		latestYear: number
		pastAmount: number
	}>()

	const db = drizzle(c.env.DB)

	try {
		const pastUsdJpyRate = await getUsdJpyRateByYearOperation(db, pastYear)
		const latestUsdJpyRate = await getUsdJpyRateByYearOperation(db, latestYear)

		const keepProfitResult = await getResult(
			pastYear,
			pastAmount,
			pastUsdJpyRate.usdJpyRate,
			latestUsdJpyRate.usdJpyRate,
		)

		return c.json(keepProfitResult)
	} catch (e) {
		return c.json({ error: 'Not Found' }, 404)
	}
})

export default app
