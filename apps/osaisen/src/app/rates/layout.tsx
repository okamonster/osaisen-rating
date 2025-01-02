import { DefaultHeader } from '~/components/Navigations/DefaultHeader'

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<DefaultHeader title="お賽銭の金額を入力" />
			{children}
		</>
	)
}
