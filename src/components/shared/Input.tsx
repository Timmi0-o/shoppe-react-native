import React, { Dispatch, SetStateAction } from 'react'
import {
	NativeSyntheticEvent,
	Pressable,
	TextInput,
	TextInputChangeEventData,
	TextInputProps,
	View,
} from 'react-native'
import ClearTextInput from '../../../assets/svg/ClearTextInput'

interface InputProps extends TextInputProps {
	classNameContainer?: string
	onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void
	setValue: Dispatch<SetStateAction<string>>
}

const Input = ({ classNameContainer, setValue, ...props }: InputProps) => {
	return (
		<View
			className={`relative flex-row items-center justify-between w-full ${classNameContainer}`}
		>
			<TextInput
				{...props}
				placeholder={props.placeholder}
				className={`${
					!props.value ? 'text-[#707070]' : 'text-black'
				} flex-1 h-[50px]`}
			/>
			<View className='absolute bottom-[10px] w-full h-[1px] border-b-[1px] border-b-[#D8D8D8]'></View>
			<Pressable
				onPress={() => setValue('')}
				className={`${
					props.value ? '' : 'hidden'
				} items-center justify-center ml-[10px] w-[30px] h-[30px]`}
			>
				<ClearTextInput />
			</Pressable>
		</View>
	)
}

export default Input
