import type { UsdJpyRate } from '@osaisen/common'
import axios from 'axios'
import dayjs from 'dayjs'
import type { DrizzleD1Database } from 'drizzle-orm/d1'
import { createUsdJpyYearsRateOperation } from '~/infrastructure/operations/usdJpyRateOperations'

export const createUsdJpyYearsRate = async (
	db: DrizzleD1Database,
	baseUrl: string,
	apiKey: string,
): Promise<void> => {
	try {
		const res = await axios.get(`${baseUrl}/${apiKey}/pair/USD/JPY`)

		const data = res.data
		const usdJpyYearsRates: UsdJpyRate = {
			year: dayjs().year(),
			usdJpyRate: Number(data.conversion_rate.toFixed(2)),
		}

		await createUsdJpyYearsRateOperation(db, usdJpyYearsRates)
	} catch (e) {
		console.log(e)
	}
}
