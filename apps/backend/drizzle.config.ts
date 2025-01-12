import type { Config } from 'drizzle-kit'

const productionConfig = {
	schema: './src/drizzle/schema.ts',
	out: './src/drizzle/migrations',
	dialect: 'sqlite',
	driver: 'd1-http',
	dbCredentials: {
		accountId: process.env.ACCOUNT_ID ?? '',
		databaseId: process.env.DATABASE_ID ?? '',
		token: process.env.TOKEN ?? '',
	},
} satisfies Config

const localConfig = {
	schema: './src/drizzle/schema.ts',
	out: './src/drizzle/migrations',
	dialect: 'sqlite',
	dbCredentials: {
		url: '.wrangler/state/v3/d1/miniflare-D1DatabaseObject/fada6503881cacd739690cfb4ab726b5ecd8dcdb5edd46b176aa10fd890646e0.sqlite',
	},
} as Config

export default process.env.NODE_ENV === 'production'
	? productionConfig
	: localConfig
