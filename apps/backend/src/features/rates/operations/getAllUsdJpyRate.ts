import type { UsdJpyRate } from '@osaisen/common'
import type { DrizzleD1Database } from 'drizzle-orm/d1'
import { UsdJpyYearsRates } from '~/drizzle/schema'

export const getAllUsdJpyRateOperation = async (
	db: DrizzleD1Database,
): Promise<Array<UsdJpyRate>> => {
	const results = await db.select().from(UsdJpyYearsRates)

	const rates: Array<UsdJpyRate> = results.map((result) => ({
		year: result.year,
		usdJpyRate: result.usdToJpyRate,
	}))

	return rates
}
