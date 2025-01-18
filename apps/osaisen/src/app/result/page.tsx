import { Button, RingProgress } from '@mantine/core'
import type { KeepProfitResult } from '@osaisen/common'
import dayjs from 'dayjs'
import Image from 'next/image'
import { FaArrowUp, FaTwitter } from 'react-icons/fa'
import { ResultDetail } from '~/features/result/components/ResultDetail'
import styles from './page.module.css'

type Props = {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({ searchParams }: Props) {
	const { year, amount } = await searchParams

	const getKeepProfitResult = async (): Promise<KeepProfitResult> => {
		const latestYear = dayjs().year()
		const res = await fetch(`${process.env.API_BASE_URL}/result`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				pastYear: year,
				latestYear: latestYear,
				pastAmount: amount,
			}),
		})
		if (!res.ok) {
			throw new Error('Failed to fetch')
		}
		const result = await res.json()
		return result
	}

	const keepProfitResult = await getKeepProfitResult()

	return (
		<div className={styles.container}>
			<p className={styles.title}>
				{keepProfitResult.year}年に{keepProfitResult.pastOfferingAmount}
				円のお賽銭をした場合
				<br />
				ご利益をキープするには...
			</p>
			<div className={styles.results}>
				<p className={styles.resultText}>
					{Math.floor(keepProfitResult.neededKeepAmount)}円
				</p>
				<Image
					src="/images/osaisen-bg.png"
					alt="お賽銭"
					width={500}
					height={500}
					className={styles.resultImage}
				/>
			</div>

			<p className={styles.text}>のお賽銭が必要です</p>

			<ResultDetail
				year={keepProfitResult.year}
				pastOfferingAmount={keepProfitResult.pastOfferingAmount}
				neededKeepAmount={keepProfitResult.neededKeepAmount}
			/>
			<Button>
				<FaTwitter />
				シェアする
			</Button>
		</div>
	)
}
