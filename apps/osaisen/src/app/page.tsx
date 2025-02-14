import { Button } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'

export const runtime = 'edge'

export default function Home() {
	return (
		<div className={styles.container}>
			<Image
				src="/images/main-logo.png"
				alt="ご利益レーティング"
				width={500}
				height={500}
				className={styles.mainLogo}
			/>
			<div className={styles.actions}>
				<Link href="/rates">
					<Button color="var(--button-primary-color)" w="100%">
						はじめる
					</Button>
				</Link>
				<Link href="/help">
					<Button
						color="var(--button-primary-color)"
						w="100%"
						variant="outline"
					>
						使い方
					</Button>
				</Link>
				<p className={styles.copyright}>©2025 OCHA.dev</p>
			</div>
		</div>
	)
}
