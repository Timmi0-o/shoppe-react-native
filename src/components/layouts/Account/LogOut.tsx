import { router } from 'expo-router'
import { Text, View } from 'react-native'
import { useUser } from '../../hooks/useUser'
import Button from '../../shared/Button'

export const LogOut = () => {
	const { deleteToken } = useUser()
	return (
		<View className='flex flex-col items-center'>
			<Text className='text-[18px] text-center mb-[18px] lg:mb-[39px]'>
				We are very attached to you, come back as soon as possible!
			</Text>
			<View className='w-full md:w-[500px]'>
				<Button
					onClick={() => {
						deleteToken()
						router.push('/')
					}}
					btnTitle='LOG OUT OF ACCOUNT'
				/>
			</View>
		</View>
	)
}
