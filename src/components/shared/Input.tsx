import React from 'react'
import { TextInput, TextInputProps, View } from 'react-native'

interface InputProps extends TextInputProps {
	classNameContainer?: string
}

const Input = ({ classNameContainer, ...props }: InputProps) => {
	return (
		<View
			className={`w-full h-[25px] pb-[5px] border-b-[1px] border-b-[#D8D8D8] ${classNameContainer}`}
		>
			<TextInput
				{...props}
				placeholder={props.placeholder}
				className={`${!props.value ? 'text-[#707070]' : 'text-black'}`}
			/>
		</View>
	)
}

export default Input
