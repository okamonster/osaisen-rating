import { drizzle } from 'drizzle-orm/d1'
import { Hono } from 'hono'
import { fetchMesurementResultByIdOperation } from '~/infrastructure/operations/mesurementResultOperations'

type Bindings = {
	DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/:id', async (c) => {
	const id = c.req.param('id')
	const db = drizzle(c.env.DB)

	try {
		const measurementResult = await fetchMesurementResultByIdOperation(db, id)
		return c.json(measurementResult)
	} catch (e) {
		return c.json({ error: 'Not Found' }, 404)
	}
})

export default app
