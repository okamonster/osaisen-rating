'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, LoadingOverlay, NumberInput, Select } from '@mantine/core'
import cuid from 'cuid'
import dayjs from 'dayjs'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import type { ReactNode } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yearOptions } from '~/features/rating/constants/formOptions'
import type { PastOfferingMoneyInputFormSchemaType } from '~/features/rating/types'
import { PastOfferingMoneyInputSchema } from '~/features/rating/types'
import { useToast } from '~/hooks/useToast'
import styles from './style.module.css'

export const PastOfferingMoneyInputForm = (): ReactNode => {
	const [isLoading, setLoading] = useState(false)
	const { showErrorToast } = useToast()
	const { push } = useRouter()
	const {
		control,
		formState: { isValid, errors },
		handleSubmit,
	} = useForm<PastOfferingMoneyInputFormSchemaType>({
		resolver: zodResolver(PastOfferingMoneyInputSchema),
		mode: 'all',
	})

	const submit = async (data: PastOfferingMoneyInputFormSchemaType) => {
		const id = cuid()

		try {
			setLoading(true)
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/rating/submit/${id}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						pastYear: data.year,
						latestYear: dayjs().year(),
						pastOfferingAmount: data.amount,
					}),
				},
			)

			if (!res.ok) {
				throw new Error(res.statusText)
			}

			push(`/result/${id}`)
		} catch (error) {
			showErrorToast('エラーが発生しました。')
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
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
			{isLoading && <LoadingOverlay visible />}
		</>
	)
}
