'use client'
import { Button } from '@mantine/core'
import dayjs from 'dayjs'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { FaXTwitter } from 'react-icons/fa6'
import { useTwitterShare } from '../../hooks/useTweetButton'
import style from './style.module.css'

type Props = {
	pastYear: number
	latestYear: number
	pastOfferingAmount: number
	neededKeepAmount: number
}

export const TweetButton = ({
	pastYear,
	latestYear,
	pastOfferingAmount,
	neededKeepAmount,
}: Props): ReactNode => {
	const shareUrl = useTwitterShare(
		`🪙${pastYear}年にした${Math.floor(pastOfferingAmount)}円のお賽銭のご利益をキープするには
        ${dayjs().year}年では${Math.floor(neededKeepAmount)}円のお賽銭が必要です🪙`,
		process.env.APP_URL ?? '',
		['お賽銭レーティング'],
	)
	return (
		<Link
			href={shareUrl}
			target="_blank"
			rel="noopener noreferrer"
			className={style.tweetButton}
		>
			<Button bg="#000000" color="white" w="100%">
				<FaXTwitter />
				シェアする
			</Button>
		</Link>
	)
}
