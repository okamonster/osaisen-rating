import type { KeepProfitResult } from '@osaisen/common'
import type { DrizzleD1Database } from 'drizzle-orm/d1'
import { getUsdJpyRateByYearOperation } from '~/infrastructure/operations/usdJpyRateOperations'
import { convertJpyToUsd, convertUsdToJpy } from '~/utils/RateConverter'

export const getResult = async (
	pastYear: number,
	pastAmount: number,
	pastUsdJpyRate: number,
	latestUsdJpyRate: number,
): Promise<KeepProfitResult> => {
	const pastUsdAmount = convertJpyToUsd(pastAmount, pastUsdJpyRate)
	const neededKeepAmount = convertUsdToJpy(pastUsdAmount, latestUsdJpyRate)

	const keepProfitResult: KeepProfitResult = {
		year: pastYear,
		neededKeepAmount: neededKeepAmount,
		pastOfferingAmount: pastAmount,
	}

	return keepProfitResult
}
