export function convertUsdToJpy(usd: number, usdToJpyRate: number): number {
	return usd * usdToJpyRate
}

export function convertJpyToUsd(jpy: number, usdToJpyRate: number): number {
	return jpy / usdToJpyRate
}
