import type { MesurementResult } from '@osaisen/common'
import Image from 'next/image'
import { ResultDetail } from '~/features/result/components/ResultDetail'
import { TweetButton } from '~/features/result/components/tweetButton'
import styles from './page.module.css'

export const runtime = 'edge'

type Props = {
	params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
	const { id } = await params

	const getMesurementResult = async (id: string): Promise<MesurementResult> => {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/result/${id}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			},
		)

		if (!res.ok) {
			throw new Error('Failed to fetch')
		}
		const result = await res.json()
		return result
	}

	const mesurementResult = await getMesurementResult(id)

	return (
		<div className={styles.container}>
			<p className={styles.title}>
				{mesurementResult.pastYear}年に{mesurementResult.pastOfferingAmount}
				円のお賽銭をした場合
				<br />
				ご利益をキープするには...
			</p>
			<div className={styles.results}>
				<p className={styles.resultText}>
					{Math.floor(mesurementResult.neededKeepAmount)}円
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
				year={mesurementResult.pastYear}
				pastOfferingAmount={mesurementResult.pastOfferingAmount}
				neededKeepAmount={mesurementResult.neededKeepAmount}
			/>
			<TweetButton
				pastYear={mesurementResult.pastYear}
				latestYear={mesurementResult.latestYear}
				pastOfferingAmount={mesurementResult.pastOfferingAmount}
				neededKeepAmount={mesurementResult.neededKeepAmount}
			/>
		</div>
	)
}
