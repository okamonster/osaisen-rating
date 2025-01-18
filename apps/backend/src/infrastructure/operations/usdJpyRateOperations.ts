import type { UsdJpyRate } from '@osaisen/common'
import { eq } from 'drizzle-orm'
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

export const getUsdJpyRateByYearOperation = async (
	db: DrizzleD1Database,
	year: number,
): Promise<UsdJpyRate> => {
	const result = await db
		.select()
		.from(UsdJpyYearsRates)
		.where(eq(UsdJpyYearsRates.year, year))

	const rate: UsdJpyRate = {
		year: result[0].year,
		usdJpyRate: result[0].usdToJpyRate,
	}

	return rate
}
