import dayjs from 'dayjs'

export const yearOptions = Array.from({ length: 40 }, (_, i) =>
	(dayjs().year() - i).toString(),
)
