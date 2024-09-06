import { Platform, TextInput, TextInputProps, View } from 'react-native'
import Search from '../../../assets/svg/Search'

export const InputSearch = ({ ...props }: TextInputProps) => {
	const platformSpecificProps: TextInputProps =
		Platform.select({
			ios: {
				autoCorrect: true,
				clearButtonMode: 'while-editing',
			},
			android: {
				underlineColorAndroid: 'transparent',
			},
		}) || {}

	return (
		<View className='flex-row items-center px-[10px] w-full h-[32px] bg-[#EFEFEF] rounded-[4px]'>
			<Search className='mr-[8px] w-[12px] h-[12px]' />
			<TextInput
				className='text-[#707070] w-full text-[12px]'
				{...props}
				{...platformSpecificProps}
			/>
		</View>
	)
}
