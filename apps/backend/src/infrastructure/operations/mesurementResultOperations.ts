import type {
	CreateMesurementResultDto,
	MesurementResult,
} from '@osaisen/common'
import { eq } from 'drizzle-orm'
import type { DrizzleD1Database } from 'drizzle-orm/d1'
import { MesurementResults } from '~/drizzle/schema'

export const fetchMesurementResultByIdOperation = async (
	db: DrizzleD1Database,
	id: string,
): Promise<MesurementResult> => {
	const result = await db
		.select()
		.from(MesurementResults)
		.where(eq(MesurementResults.id, id))

	const mesurementResult: MesurementResult = {
		pastYear: result[0].pastYear,
		latestYear: result[0].latestYear,
		neededKeepAmount: result[0].neededKeepAmount,
		pastOfferingAmount: result[0].pastOfferingAmount,
		createdAt: new Date(result[0].createdAt),
		updatedAt: new Date(result[0].updatedAt),
	}

	return mesurementResult
}

export const CreateMesurementResultByIdOperation = async (
	db: DrizzleD1Database,
	id: string,
	dto: CreateMesurementResultDto,
): Promise<D1Result> => {
	const result = await db
		.insert(MesurementResults)
		.values({ id: id, ...dto })
		.execute()

	return result
}
