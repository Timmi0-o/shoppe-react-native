import axios from 'axios'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import {
	NativeSyntheticEvent,
	Pressable,
	Text,
	TextInputChangeEventData,
	View,
} from 'react-native'
import { useUser } from '../../components/hooks/useUser'
import Button from '../../components/shared/Button'
import Input from '../../components/shared/Input'
import Padding from '../../components/shared/Padding'
import { Section } from '../../components/shared/Section'

export default function Auth() {
	const router = useRouter()

	// ВЫБОР РЕЖИМА ВХОДА
	const [isVariableActive, setIsVariableActive] = useState(0)

	// ФОРМА ДЛЯ РЕГИСТРАЦИИ / ЛОГИНА
	const [password, setPassword] = useState('')
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')

	const [remember, setRemember] = useState(false)
	const [isResetPassword, setIsResetPassword] = useState(false)

	const [validationEmailError, setValidationEmailError] = useState('')
	const [userErrors, setUserErrors] = useState('')
	const [logRegNotification, setLogRegNotification] = useState('')

	const validateErrors = [validationEmailError, userErrors, logRegNotification]

	// GET USER DATA
	const { user, setToken } = useUser()

	// ЕСЛИ ЕСТЬ USER ТО ОТПРАВИТЬ НА СТРАНИЦУ С ПОЛЬЗОВАТЕЛЕМ
	useEffect(() => {
		if (user) {
			router.push(`account/${user.username}`)
		}
	}, [user])

	const login = async () => {
		if (username === '' || password === '') {
			setButtonActive(false)
			return setUserErrors('The username and password cannot be empty')
		} else {
			setUserErrors('')
		}
		setButtonActive(true)
		setLogRegNotification('The account is being logged in, please wait!')
		try {
			const response = await axios.post(`${process.env.BACK_PORT}auth/login`, {
				username,
				password,
			})
			localStorage.setItem('token', response.data.token)
			setToken(response.data.token)

			setButtonActive(false)
			setTimeout(() => {
				setLogRegNotification('')
			}, 3000)
		} catch (error: any) {
			setButtonActive(false)
			setLogRegNotification('')
			setUserErrors(`${error?.response?.data?.message}!`)
		}
	}

	const register = async () => {
		try {
			const re =
				/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

			if (authButtonTitle === 'Loading...') {
				setLogRegNotification(
					'Происходит регистрация и вход в аккаунт, пожалуйста, подождите!'
				)
			}
			if (!re.test(email)) {
				setButtonActive(false)
				return setValidationEmailError('Email no correct!')
			} else {
				setValidationEmailError('')
			}
			if (username === '' || password === '') {
				setButtonActive(false)
				return setUserErrors('Имя пользователя и пароль не может быть пустым')
			} else {
				setUserErrors('')
			}
			setButtonActive(true)
			const data = await axios.post(`${process.env.BACK_PORT}auth/create`, {
				username,
				email,
				password,
			})
			localStorage.setItem('token', data.data.token)
			if (data) {
				login()
			}
		} catch (error: any) {
			setButtonActive(false)
			console.log(error?.response?.data?.message)
		}
	}

	const handleAuth = () => {
		if (isVariableActive === 0) {
			if (authButtonTitle !== 'Loading...') login()
		} else {
			if (authButtonTitle !== 'Loading...') register()
		}
	}

	const [authButtonTitle, setAuthButtonTitle] = useState('SIGN IN')
	const [buttonActive, setButtonActive] = useState(false)

	useEffect(() => {
		if (isVariableActive === 0) {
			if (buttonActive) {
				return setAuthButtonTitle('Loading...')
			}
			setAuthButtonTitle('SIGN IN')
		} else {
			if (buttonActive) {
				return setAuthButtonTitle('Loading...')
			}
			setAuthButtonTitle('REGISTER')
		}
	}, [isVariableActive, buttonActive])

	useEffect(() => {
		setValidationEmailError('')
		setUserErrors('')

		if (isVariableActive === 0) {
			setAuthButtonTitle('SIGN IN')
		} else {
			setAuthButtonTitle('REGISTER')
		}
	}, [isVariableActive])

	return (
		<Section>
			<Padding>
				<View>
					{/* TITLE  */}
					<Text className='text-[20px] text-center mt-[24px]'>My account</Text>
					{/* LOG REG FORM  */}
					<View className='w-full flex-row justify-between items-center h-[52px] px-[8px] bg-[#EFEFEF] mt-[24px] rounded-[7px] mb-[89px]'>
						{variables.map((item, i) => (
							<Pressable
								onPress={() => setIsVariableActive(i)}
								className={`${
									isVariableActive === i ? 'bg-white' : ''
								} w-[49%] rounded-[5px] h-[40px] items-center justify-center`}
							>
								<Text>{item}</Text>
							</Pressable>
						))}
					</View>
					{/* LOG REG FORM  */}
					<View className='relative'>
						{/* ERROR MESSAGES  */}
						<View className='absolute w-full top-[-50px] mb-[10px]'>
							{validateErrors.map((error, i) => (
								<View className={`${error ? '' : 'hidden'}`}>
									<Text
										key={i}
										className='text-[14px] font-bold text-red-600 text-center'
									>
										{error}
									</Text>
								</View>
							))}
						</View>
						{/* INPUTS  */}
						<View>
							{isVariableActive === 1 && (
								<Input
									classNameContainer='mb-[47px]'
									placeholder='Email'
									value={email}
									onChange={(
										e: NativeSyntheticEvent<TextInputChangeEventData>
									) => setEmail(e.nativeEvent.text)}
								/>
							)}
							<Input
								classNameContainer='mb-[47px]'
								placeholder='Username'
								value={username}
								onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
									setUsername(e.nativeEvent.text)
								}
							/>
							<Input
								placeholder='Password'
								value={password}
								onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
									setPassword(e.nativeEvent.text)
								}
							/>
						</View>
					</View>
					<Button btnTitle='SIGN IN' onClick={() => handleAuth()} />
				</View>
			</Padding>
		</Section>
	)
}

const variables = ['Sign in', 'Register']
