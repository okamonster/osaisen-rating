'use client'
import { Button } from '@mantine/core'
import { useRouter } from 'next/navigation'
import { FaChevronLeft } from 'react-icons/fa'
import styles from './style.module.css'

type Props = {
	title: string
}
export const DefaultHeader = ({ title }: Props) => {
	const { back } = useRouter()
	return (
		<header className={styles.header}>
			<Button
				onClick={back}
				variant="transparent"
				className={styles.backButton}
			>
				<FaChevronLeft />
			</Button>
			<h1 className={styles.title}>{title}</h1>
		</header>
	)
}
