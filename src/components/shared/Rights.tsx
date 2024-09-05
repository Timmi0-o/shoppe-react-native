import { Dispatch, SetStateAction } from 'react'
import { Pressable, PressableProps, Text, View } from 'react-native'

interface RightsProps extends PressableProps {
	rightsText: string
	rightsState: boolean
	rightsSetState: Dispatch<SetStateAction<boolean>>
}

export const Rights = ({
	rightsText,
	rightsState,
	rightsSetState,
	...props
}: RightsProps) => {
	return (
		<Pressable
			{...props}
			onPress={() => rightsSetState(!rightsState)}
			className='flex-row items-center gap-[8px] w-full mb-[26px] mt-[11px]'
		>
			<View
				className={`w-[13px] h-[13px] lg:size-[18px] border-[1px] border-black rounded-[3px] ${
					rightsState && 'bg-black'
				}`}
			></View>
			<Text className='w-fit text-[12px] md:text-[16px] text-[#707070]'>
				{rightsText}
			</Text>
		</Pressable>
	)
}
