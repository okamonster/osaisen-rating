export type MesurementResult = {
	pastYear: number
	latestYear: number
	neededKeepAmount: number
	pastOfferingAmount: number
	createdAt: Date
	updatedAt: Date
}

export type CreateMesurementResultDto = Omit<
	MesurementResult,
	'createdAt' | 'updatedAt'
> & {
	createdAt: string
	updatedAt: string
}
