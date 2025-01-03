import { RingProgress } from '@mantine/core'
import type { ReactNode } from 'react'
import { FaArrowUp } from 'react-icons/fa'
import styles from './style.module.css'

export const ResultDetail = (): ReactNode => {
	return (
		<div className={styles.detailContainer}>
			<p className={styles.detailTitle}>2022年と比べて</p>
			<div className={styles.details}>
				<div>
					<RingProgress
						label={<p style={{ textAlign: 'center' }}>20%</p>}
						sections={[{ value: 20, color: '#FF0000' }]}
						size={100}
					/>
					<p>
						上昇
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
						上昇
						<FaArrowUp />
					</p>
				</div>
			</div>
		</div>
	)
}
