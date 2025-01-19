import type { DrizzleD1Database } from 'drizzle-orm/d1'
import { createMeasurementResultDtoFactory } from '~/features/mesurementResult/factory/createMeasurementResultDtoFactory'
import { CreateMesurementResultByIdOperation } from '~/infrastructure/operations/mesurementResultOperations'
import { getUsdJpyRateByYearOperation } from '~/infrastructure/operations/usdJpyRateOperations'

export const createMeasurementResult = async (
	db: DrizzleD1Database,
	id: string,
	pastYear: number,
	latestYear: number,
	pastOfferingAmount: number,
): Promise<void> => {
	const pastUsdJpyRate = await getUsdJpyRateByYearOperation(db, pastYear)
	const latestUsdJpyRate = await getUsdJpyRateByYearOperation(db, latestYear)

	const createMeasurementResultDto = createMeasurementResultDtoFactory(
		pastYear,
		latestYear,
		pastOfferingAmount,
		pastUsdJpyRate.usdJpyRate,
		latestUsdJpyRate.usdJpyRate,
	)

	await CreateMesurementResultByIdOperation(db, id, createMeasurementResultDto)
}
