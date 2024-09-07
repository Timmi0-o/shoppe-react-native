import { Dispatch, SetStateAction } from 'react'
import { Pressable, PressableProps, Text } from 'react-native'
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated'

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
	const color = useSharedValue('transparent')
	const style = useAnimatedStyle(() => {
		return {
			backgroundColor: color.value,
		}
	})

	const switchColor = () => {
		rightsSetState((prev) => !prev)
		if (rightsState) {
			color.value = withTiming('black', { duration: 300 })
		} else {
			color.value = withTiming('transparent', { duration: 200 })
		}
	}

	return (
		<Pressable
			{...props}
			onPress={() => switchColor()}
			className='flex-row items-center mb-[16px] py-[5px]'
		>
			<Animated.View
				style={style}
				className={`w-[13px] h-[13px] border-[1px] border-black rounded-[3px] mr-[8px]`}
			></Animated.View>
			<Text className='text-[12px] text-[#707070]'>{rightsText}</Text>
		</Pressable>
	)
}
