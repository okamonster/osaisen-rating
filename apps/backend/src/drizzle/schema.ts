import { integer, real, sqliteTable } from 'drizzle-orm/sqlite-core'

export const UsdJpyYearsRates = sqliteTable(
	'usd_jpy_years_rates',
	{
		id: integer('id').primaryKey(),
		year: integer('year').unique().notNull(),
		usdToJpyRate: real('rate').notNull(),
	},
	() => [],
)
