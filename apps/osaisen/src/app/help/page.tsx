import { Button } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'

export default function Page() {
	return (
		<div className={styles.container}>
			<h1 className={styles.mainLogo}>あけましておめでとうございます</h1>

			<p className={styles.description}>
				昨年は良い年になったでしょうか
				<br />
				初詣は行かれましたか？
				<br />
				初詣といえば...そう、お賽銭ですね
				<br />
				<br />
				昨年といえば、円安の1年でした
				<br />
				きっと神様はグローバルな価値観を持っているはずです
				<br />
				円安が進んでいるのに本当に去年と同じお賽銭金額でいいのでしょうか？
				<br />
				<br />
				このアプリでは過去のお賽銭金額を入力すると、その当時のお賽銭のご利益をキープするためには、今年はいくらのお賽銭が必要かを計算できる優れもの！
				<br />
				ぜひ試してみてください！
			</p>

			<div className={styles.actions}>
				<Link href="/rates">
					<Button color="var(--button-primary-color)" w="100%">
						はじめる
					</Button>
				</Link>
			</div>
		</div>
	)
}
