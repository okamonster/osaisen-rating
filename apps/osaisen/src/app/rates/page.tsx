import { PastOfferingMoneyInputForm } from '~/features/rating/components/PastOfferingMoneyInputForm'
import styles from './page.module.css'

export const runtime = 'edge'

export default function Page() {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>日本円の価値は常に変わり続けています</h1>
			<PastOfferingMoneyInputForm />
		</div>
	)
}
