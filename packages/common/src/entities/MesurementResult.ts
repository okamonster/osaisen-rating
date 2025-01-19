export type MesurementResult = {
	id: string
	pastYear: number
	latestYear: number
	neededKeepAmount: number
	pastOfferingAmount: number
	createdAt: Date
	updatedAt: Date
}

export type CreateMesurementResultDto = Omit<
	MesurementResult,
	'id' | 'createdAt' | 'updatedAt'
> & {
	createdAt: string
	updatedAt: string
}
