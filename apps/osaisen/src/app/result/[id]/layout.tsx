import { DefaultHeader } from '~/components/Navigations/DefaultHeader'

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<DefaultHeader title="結果" />
			{children}
		</>
	)
}
