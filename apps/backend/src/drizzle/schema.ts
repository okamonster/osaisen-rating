import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

//cd test
export const UsdJpyYearsRates = sqliteTable(
	'usd_jpy_years_rates',
	{
		id: integer('id').primaryKey(),
		year: integer('year').unique().notNull(),
		usdToJpyRate: real('rate').notNull(),
	},
	() => [],
)

export const MesurementResults = sqliteTable(
	'mesurement_results',
	{
		id: text('id').primaryKey(),
		pastYear: integer('year')
			.references(() => UsdJpyYearsRates.year)
			.notNull(),
		latestYear: integer('year')
			.references(() => UsdJpyYearsRates.year)
			.notNull(),
		neededKeepAmount: real('needed_keep_amount').notNull(),
		pastOfferingAmount: real('past_offering_amount').notNull(),
		createdAt: text('created_at').default('CURRENT_TIMESTAMP').notNull(),
		updatedAt: text('updated_at').default('CURRENT_TIMESTAMP').notNull(),
	},
	() => [],
)
