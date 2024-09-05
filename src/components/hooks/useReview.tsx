import { BACK_PORT } from '@env'
import axios from 'axios'
import { Link, usePathname } from 'expo-router'
import { useState } from 'react'
import { Text, View } from 'react-native'
import useSWR, { SWRResponse } from 'swr'
import { fetcher } from '../../utils/fetcher'
import { useUser } from './useUser'

export const useReview = () => {
	const path = usePathname()

	// ID ТЕКУЩЕГО ТОВАРА
	const nowPath = path.split('/')[2]
	// GET USER DATA
	const { user } = useUser()

	// ДАННЫЕ О ОТЗЫВЕ ПОЛЬЗОВАТЕЛЯ
	const { data: userReview, mutate: userMutate } = useSWR(
		user ? { url: `${BACK_PORT}review/${nowPath}/${user._id}` } : null,
		fetcher
	)

	const {
		data: allReview,
		mutate: mutateAllReviews,
	}: SWRResponse<any, any, any> = useSWR(
		{ url: `${BACK_PORT}review/${nowPath}` },
		fetcher
	)

	const [commentWarning, setCommentWarning] = useState<React.ReactNode>('')
	// ОСТАВИТЬ КОММЕНТАРИЙ
	const addUserComment = async (comment: string) => {
		if (!comment) {
			return setCommentWarning(
				<View className='text-[14px] md:text-[16px] font-bold'>
					The comment cannot be empty!
				</View>
			)
		}
		if (user === undefined) {
			return setCommentWarning(
				<View className='text-[14px] md:text-[16px] font-bold'>
					Only registered users can leave comments,
					<Link href={'/account'}>
						<Text className='text-black underline ml-[5px]'>come in!</Text>
					</Link>
				</View>
			)
		}
		try {
			if (user && comment) {
				const response = (
					await axios.post(`${BACK_PORT}review/create`, {
						user: user?._id,
						product: nowPath,
						feedback: comment,
					})
				).data

				if (response) {
					userMutate()
				}
				return response
			}
		} catch (error: any) {
			console.log(error.response.data.message)
		}
	}

	return {
		userReview,
		allReview,
		userMutate,
		addUserComment,
		commentWarning,
		mutateAllReviews,
	}
}
