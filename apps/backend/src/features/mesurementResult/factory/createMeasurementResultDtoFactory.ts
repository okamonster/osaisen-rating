import type {
	CreateMesurementResultDto,
	MesurementResult,
} from '@osaisen/common'
import dayjs from 'dayjs'
import { convertJpyToUsd, convertUsdToJpy } from '~/utils/RateConverter'

export const createMeasurementResultDtoFactory = (
	pastYear: number,
	latestYear: number,
	pastAmount: number,
	pastUsdJpyRate: number,
	latestUsdJpyRate: number,
): CreateMesurementResultDto => {
	const pastUsdAmount = convertJpyToUsd(pastAmount, pastUsdJpyRate)
	const neededKeepAmount = convertUsdToJpy(pastUsdAmount, latestUsdJpyRate)

	const measurementResultDto: CreateMesurementResultDto = {
		pastYear: pastYear,
		latestYear: latestYear,
		neededKeepAmount: neededKeepAmount,
		pastOfferingAmount: pastAmount,
		createdAt: dayjs().format(),
		updatedAt: dayjs().format(),
	}

	return measurementResultDto
}
