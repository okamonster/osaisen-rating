import type { MesurementResult } from '@osaisen/common'
import type { DrizzleD1Database } from 'drizzle-orm/d1'
import { getUsdJpyRateByYearOperation } from '~/infrastructure/operations/usdJpyRateOperations'
import { convertJpyToUsd, convertUsdToJpy } from '~/utils/RateConverter'

export const getMesurementResult = async (
	pastYear: number,
	pastAmount: number,
	pastUsdJpyRate: number,
	latestUsdJpyRate: number,
): Promise<MesurementResult> => {
	const pastUsdAmount = convertJpyToUsd(pastAmount, pastUsdJpyRate)
	const neededKeepAmount = convertUsdToJpy(pastUsdAmount, latestUsdJpyRate)

	const mesurementResult: MesurementResult = {
		year: pastYear,
		neededKeepAmount: neededKeepAmount,
		pastOfferingAmount: pastAmount,
	}

	return mesurementResult
}
