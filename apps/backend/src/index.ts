import { drizzle } from 'drizzle-orm/d1'
import { Hono } from 'hono'
import { UsdJpyYearsRates } from './drizzle/schema'
import { usdJpyYearsRatesData } from './seed/usdJpyYearsRatesData'

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

/** USD/JPYレート取得 */
app.get('/usd-jpy-rate', async (c) => {
	const db = drizzle(c.env.DB)

	const result = await db.select().from(UsdJpyYearsRates).all()

	return c.json(result)
})
export default app
