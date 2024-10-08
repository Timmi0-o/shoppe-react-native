import {
	NativeSyntheticEvent,
	TextInput,
	TextInputChangeEventData,
	TextInputProps,
	View,
} from 'react-native'
import Search from '../../../assets/svg/Search'

interface InputProps extends TextInputProps {
	classNameContainer?: string
	onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void
}

export const InputSearch = ({ ...props }: InputProps) => {
	return (
		<View className='flex-row items-center px-[10px] w-full h-[32px] bg-[#EFEFEF] rounded-[4px]'>
			<Search className='mr-[8px] w-[12px] h-[12px]' />
			<TextInput className='text-[#707070] w-full text-[12px]' {...props} />
		</View>
	)
}
