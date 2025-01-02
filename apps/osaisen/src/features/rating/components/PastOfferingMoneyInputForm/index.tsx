'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, NumberInput, Select } from '@mantine/core'
import { useRouter } from 'next/navigation'
import type { ReactNode } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yearOptions } from '~/features/rating/constants/formOptions'
import {
	type PastOfferingMoneyInputFormSchemaType,
	PastOfferingMoneyInputSchema,
} from '~/features/rating/types'
import styles from './style.module.css'

export const PastOfferingMoneyInputForm = (): ReactNode => {
	const { push } = useRouter()
	const {
		control,
		formState: { isValid, errors },
		handleSubmit,
	} = useForm<PastOfferingMoneyInputFormSchemaType>({
		resolver: zodResolver(PastOfferingMoneyInputSchema),
		mode: 'all',
	})

	const submit = (data: PastOfferingMoneyInputFormSchemaType) => {
		push(`/result?year=${data.year}&amount=${data.amount}`)
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit(submit)}>
			<div className={styles.yearInputArea}>
				<Controller
					control={control}
					name="year"
					render={({ field }) => (
						<Select
							w={150}
							value={field.value}
							onChange={field.onChange}
							onBlur={field.onBlur}
							data={yearOptions}
							placeholder="選択"
							error={errors.year?.message}
						/>
					)}
				/>
				<p className={styles.text}>年に</p>
			</div>
			<div className={styles.amountInputArea}>
				<Controller
					control={control}
					name="amount"
					render={({ field }) => (
						<NumberInput
							w={200}
							min={0}
							value={field.value}
							onChange={field.onChange}
							onBlur={field.onBlur}
							placeholder="金額を入力"
							error={errors.amount?.message}
						/>
					)}
				/>
				<p className={styles.text}>円お賽銭を入れました</p>
			</div>

			<p className={styles.highlightText}>
				今年の最新の為替金額から
				<br />
				ご利益キープに必要な金額は...
			</p>
			<Button
				color="var(--button-primary-color)"
				w="100%"
				radius="lg"
				disabled={!isValid}
				type="submit"
			>
				お賽銭金額を見る
			</Button>
		</form>
	)
}
