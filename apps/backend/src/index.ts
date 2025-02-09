import { drizzle } from 'drizzle-orm/d1'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { usdJpyYearsRatesData } from '~/seed/usdJpyYearsRatesData'
import { UsdJpyYearsRates } from './drizzle/schema'
import rating from './routes/rating'
import result from './routes/result'

type Bindings = {
	DB: D1Database
}
const app = new Hono<{ Bindings: Bindings }>()

app.use('/*', async (c, next) => {
	const corsMiddlewareHandler = cors({
		origin: '*',
		allowHeaders: ['Content-Type', 'Authorization'],
		allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
	})
	return corsMiddlewareHandler(c, next)
})

/** 初期データ流し込み */
app.post('/init', async (c) => {
	const db = drizzle(c.env.DB)

	const result = await db.insert(UsdJpyYearsRates).values(usdJpyYearsRatesData)
	return c.json(result)
})

app.route('/rating', rating)

app.route('/result', result)
export default app
