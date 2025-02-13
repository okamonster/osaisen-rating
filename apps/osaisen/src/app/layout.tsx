import '~/style/globals.css'
import '~/style/reset.css'
import '~/style/variables.css'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { Notifications } from '@mantine/notifications'
import '@mantine/notifications/styles.css'
import GoogleAdsense from '~/components/Adsense/GoogleAdsense'

import styles from './layout.module.css'

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="ja">
			<head>
				<meta charSet="utf-8" lang="ja" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>お賽銭レーティング</title>
				<meta property="og:title" content="お賽銭レーティング" />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://osaisen-rating.com" />
				<meta
					property="og:image"
					content="https://osaisen-rating.com/images/ogp.png"
				/>
				<meta
					property="og:description"
					content="お賽銭レーティングは、過去のお賽銭金額を入力すると、その当時のお賽銭のご利益をキープするためには、今年はいくらのお賽銭が必要かを計算できるアプリです。"
				/>
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@makura_nageru" />
			</head>
			<body className={styles.container}>
				<MantineProvider>
					<Notifications position="top-center" />
					<main className={styles.main}>{children}</main>
				</MantineProvider>
			</body>
			<GoogleAdsense pId={process.env.ADD_PID ?? ''} />
		</html>
	)
}
