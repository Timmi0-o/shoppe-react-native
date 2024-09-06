import { Text, View } from 'react-native'
import { useUser } from '../../components/hooks/useUser'

export default function Account() {
	const { user } = useUser()
	return (
		<View>
			<Text className='text-[20px]'>{user?.username}</Text>
		</View>
	)
}
