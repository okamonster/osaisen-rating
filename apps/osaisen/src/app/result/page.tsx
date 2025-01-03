import { Button, RingProgress } from '@mantine/core'
import Image from 'next/image'
import { FaArrowUp, FaTwitter } from 'react-icons/fa'
import { ResultDetail } from '~/features/result/components/ResultDetail'
import styles from './page.module.css'

type Props = {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({ searchParams }: Props) {
	const { year, amount } = await searchParams

	const result = {
		year: year as string,
		neededKeepAmount: amount as string,
		pastOfferingAmount: '20',
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

			<ResultDetail />
			<Button>
				<FaTwitter />
				シェアする
			</Button>
		</div>
	)
}
