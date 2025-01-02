import { z } from 'zod'

export const PastOfferingMoneyInputSchema = z.object({
	year: z
		.string({ message: '年を選択してください' })
		.min(1, { message: '年を選択してください' }),
	amount: z
		.number({ message: '0以上の整数を入力してください' })
		.int({ message: '整数を入力してください' })
		.positive({ message: '0以上の整数を入力してください' }),
})

export type PastOfferingMoneyInputFormSchemaType = z.infer<
	typeof PastOfferingMoneyInputSchema
>
