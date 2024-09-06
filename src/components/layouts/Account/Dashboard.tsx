import { router } from 'expo-router'
import { Pressable, Text, View } from 'react-native'
import { useUser } from '../../hooks/useUser'

export const Dashboard = () => {
	const { user, deleteToken } = useUser()

	return (
		<View className='flex-row flex-wrap'>
			<View className='flex-row flex-wrap gap-[5px] mb-[10px]'>
				<Text>
					Hello {user?.username} (not {user?.username}?)
				</Text>
				<Pressable
					onPress={() => {
						deleteToken()
						router.push('/')
					}}
				>
					<Text className='text-[#A18A68]'>Log out</Text>
				</Pressable>
			</View>
			<View className='flex-row flex-wrap gap-[5px]'>
				<Text>From your account dashboard you can view your</Text>
				<Text className='text-[#A18A68]'>recent orders,</Text>
				<Text> manage your</Text>
				<Text className='text-[#A18A68]'>shining and billing addresses,</Text>
				<Text>and edit your</Text>
				<Text className='text-[#A18A68]'>password and account details</Text>
			</View>
		</View>
	)
}
