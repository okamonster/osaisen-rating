import { Button, RingProgress } from '@mantine/core'
import Image from 'next/image'
import type { ReadonlyURLSearchParams } from 'next/navigation'
import { BiUpArrow } from 'react-icons/bi'
import { FaArrowUp, FaTwitter } from 'react-icons/fa'
import { FaArrowUpAZ } from 'react-icons/fa6'
import { PastOfferingMoneyInputForm } from '~/features/rating/components/PastOfferingMoneyInputForm'
import styles from './page.module.css'

type Props = {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({ searchParams }: Props) {
	const { year, amount } = await searchParams

	const result = {
		year: year as string,
		amount: amount as string,
	}

	return (
		<div className={styles.container}>
			<p className={styles.title}>
				{year}年に{amount}円のお賽銭をした場合
				<br />
				ご利益をキープするには...
			</p>
			<div className={styles.results}>
				<p className={styles.resultText}>20円</p>
				<Image
					src="/images/osaisen-bg.png"
					alt="お賽銭"
					width={500}
					height={500}
					className={styles.resultImage}
				/>
			</div>

			<p className={styles.text}>のお賽銭が必要です</p>

			<div className={styles.detailsContainer}>
				<p className={styles.text}>{year}年と比べて</p>

				<div className={styles.details}>
					<div>
						<RingProgress
							label={<p style={{ textAlign: 'center' }}>20%</p>}
							sections={[{ value: 20, color: '#FF0000' }]}
							size={100}
						/>
						<p>
							の価格上昇
							<FaArrowUp />
						</p>
					</div>

					<div>
						<RingProgress
							label={<p style={{ textAlign: 'center' }}>10円</p>}
							sections={[{ value: 20, color: '#FF0000' }]}
							size={100}
						/>
						<p>
							多く必要
							<FaArrowUp />
						</p>
					</div>
				</div>
			</div>
			<Button>
				<FaTwitter />
				シェアする
			</Button>
		</div>
	)
}
