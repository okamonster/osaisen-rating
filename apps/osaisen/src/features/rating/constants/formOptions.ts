import dayjs from 'dayjs'

export const yearOptions = Array.from({ length: 26 }, (_, i) =>
	(dayjs().year() - i).toString(),
)
