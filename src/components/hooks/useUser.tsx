import { BACK_PORT } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMemo, useState } from 'react'
import useSWR, { SWRResponse } from 'swr'
import { fetcher } from '../../utils/fetcher'

interface UserData {
	_id: string
	username: string
	email: string
}

export const useUser = () => {
	// ПРОВЕРКА НАЛИЧИЯ ТОКЕНА НА КЛИЕНТЕ
	const [token, setToken] = useState<string | null>()

	useMemo(() => {
		AsyncStorage.getItem('token').then((data) =>
			setToken(() => {
				return data
			})
		)
	}, [])

	const deleteToken = () => {
		AsyncStorage.removeItem('token')
		setToken(() => {
			return ''
		})
		mutateUser()
	}

	// ПРОВЕРКА ЛОГИНА
	const {
		data: userData,
		mutate: mutateUser,
	}: SWRResponse<UserData, any, any> = useSWR(
		{
			url: `${BACK_PORT}auth/${token}`,
		},
		fetcher
	)

	return {
		user: userData,
		mutateUser,
		deleteToken,
		setToken,
	}
}
