import { drizzle } from 'drizzle-orm/d1'
import { Hono } from 'hono'
import { usdJpyYearsRatesData } from '~/seed/usdJpyYearsRatesData'
import { UsdJpyYearsRates } from './drizzle/schema'
import result from './routes/result'
import usdJpyRate from './routes/usdJpyRate'

type Bindings = {
	DB: D1Database
}
const app = new Hono<{ Bindings: Bindings }>()

/** 初期データ流し込み */
app.post('/init', async (c) => {
	const db = drizzle(c.env.DB)

	const result = await db.insert(UsdJpyYearsRates).values(usdJpyYearsRatesData)
	return c.json(result)
})

app.route('/usd-jpy-rate', usdJpyRate)

app.route('/result', result)
export default app
