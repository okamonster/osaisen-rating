export const useTwitterShare = (
	text: string,
	url?: string,
	hashTags?: Array<string>,
): string => {
	const shareBaseUrl = new URL('http://x.com/intent/tweet/')
	const urlParams = [['text', `${text}\n`]]
	url && urlParams.push(['url', `${url}\n`])
	hashTags && urlParams.push(['hashtags', hashTags.join(',')])

	const params = new URLSearchParams(urlParams)
	shareBaseUrl.search = params.toString()
	const shareUrl = shareBaseUrl.toString()

	return shareUrl
}
