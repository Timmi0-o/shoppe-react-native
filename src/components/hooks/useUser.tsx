import { BACK_PORT } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
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

	useEffect(() => {
		if (window !== undefined && AsyncStorage !== undefined) {
			AsyncStorage.getItem('token').then((data) => setToken(data))
		}
	})

	const deleteToken = () => {
		AsyncStorage.removeItem('token')
		setToken('')
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
