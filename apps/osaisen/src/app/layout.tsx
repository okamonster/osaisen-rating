import '~/style/globals.css'
import '~/style/reset.css'
import '~/style/variables.css'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import styles from './layout.module.css'

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="ja">
			<body className={styles.container}>
				<MantineProvider>
					<main className={styles.main}>{children}</main>
				</MantineProvider>
			</body>
		</html>
	)
}
