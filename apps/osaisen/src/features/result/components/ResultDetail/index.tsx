import { RingProgress } from '@mantine/core'
import { type ReactNode, useMemo } from 'react'
import { FaArrowUp } from 'react-icons/fa'
import styles from './style.module.css'

type Props = {
	year: number
	neededKeepAmount: number
	pastOfferingAmount: number
}

export const ResultDetail = ({
	year,
	neededKeepAmount,
	pastOfferingAmount,
}: Props): ReactNode => {
	const isRiseAmount = useMemo(() => {
		return neededKeepAmount > pastOfferingAmount
	}, [neededKeepAmount, pastOfferingAmount])

	const rateOfIncreasePercentage = useMemo(() => {
		return Math.floor(
			((neededKeepAmount - pastOfferingAmount) / pastOfferingAmount) * 100,
		)
	}, [neededKeepAmount, pastOfferingAmount])

	const amountDiff = useMemo(() => {
		return Math.abs(Math.floor(neededKeepAmount - pastOfferingAmount))
	}, [neededKeepAmount, pastOfferingAmount])

	return (
		<div className={styles.detailContainer}>
			<p className={styles.detailTitle}>{year}年と比べて</p>
			<div className={styles.details}>
				{isRiseAmount ? (
					<>
						<div>
							<RingProgress
								label={
									<p style={{ textAlign: 'center' }}>
										{Math.abs(rateOfIncreasePercentage)}%
									</p>
								}
								sections={[
									{
										value: Math.abs(rateOfIncreasePercentage),
										color: '#FF0000',
									},
								]}
								size={100}
							/>
							<p>
								上昇
								<FaArrowUp />
							</p>
						</div>
						<div>
							<RingProgress
								label={<p style={{ textAlign: 'center' }}>{amountDiff}円</p>}
								sections={[{ value: amountDiff, color: '#FF0000' }]}
								size={100}
							/>
							<p>
								高くなりました
								<FaArrowUp />
							</p>
						</div>
					</>
				) : (
					<>
						<div>
							<RingProgress
								label={
									<p style={{ textAlign: 'center' }}>
										{Math.abs(rateOfIncreasePercentage)}%
									</p>
								}
								sections={[
									{
										value: Math.abs(rateOfIncreasePercentage),
										color: '#659AD2',
									},
								]}
								size={100}
							/>
							<p>
								下降
								<FaArrowUp />
							</p>
						</div>

						<div>
							<RingProgress
								label={<p style={{ textAlign: 'center' }}>{amountDiff}円</p>}
								sections={[{ value: amountDiff, color: '#659AD2' }]}
								size={100}
							/>
							<p>
								安くなりました
								<FaArrowUp />
							</p>
						</div>
					</>
				)}
			</div>
		</div>
	)
}
