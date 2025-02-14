import Script from 'next/script'
import type { ReactNode } from 'react'

type Props = {
	pId: string
}

const GoogleAdsense = ({ pId }: Props): ReactNode => {
	return (
		<Script
			async
			src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pId}`}
			crossOrigin="anonymous"
			strategy="afterInteractive"
		/>
	)
}

export default GoogleAdsense
