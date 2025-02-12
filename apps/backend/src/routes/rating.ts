import { drizzle } from 'drizzle-orm/d1'
import { Hono } from 'hono'
import { createMeasurementResult } from '~/features/mesurementResult/usecase/createMeasurementResult'
import {
	getAllUsdJpyRateOperation,
	getUsdJpyRateByYearOperation,
} from '~/infrastructure/operations/usdJpyRateOperations'

type Bindings = {
	DB: D1Database
}
const app = new Hono<{ Bindings: Bindings }>()

/** USD/JPYレート全取得 */
app.get('/', async (c) => {
	const db = drizzle(c.env.DB)

	try {
		const rates = await getAllUsdJpyRateOperation(db)
		return c.json(rates)
	} catch (e) {
		return c.json({ error: 'Not Found' }, 404)
	}
})

/** USD/JPYレート取得 */
app.get('/:year', async (c) => {
	const db = drizzle(c.env.DB)
	const year = Number.parseInt(c.req.param('year'), 10)

	if (Number.isNaN(year)) {
		return c.json({ error: 'Invalid year' }, 400)
	}

	try {
		const rate = await getUsdJpyRateByYearOperation(db, year)
		return c.json(rate)
	} catch (e) {
		return c.json({ error: 'Not Found' }, 404)
	}
})

/** 結果登録 */
app.post('/submit/:id', async (c) => {
	const db = drizzle(c.env.DB)
	const id = c.req.param('id')
	const { pastYear, latestYear, pastOfferingAmount } = await c.req.json<{
		pastYear: number
		latestYear: number
		pastOfferingAmount: number
	}>()

	try {
		await createMeasurementResult(
			db,
			id,
			pastYear,
			latestYear,
			pastOfferingAmount,
		)

		return c.json({ message: 'CreateResult Success' }, 201)
	} catch (e) {
		return c.json({ error: 'Not Found' }, 404)
	}
})

export default app
