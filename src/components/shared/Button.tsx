import React from 'react'
import { Pressable, ViewProps } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import { useBgColorMove } from '../../utils/AnimationReady'

interface ButtonProps extends ViewProps {
	btnTitle: string
	onClick: () => void
}

const Button = ({ onClick, btnTitle, ...props }: ButtonProps) => {
	// ANIMATIONS
	const {
		style: btnAddToCardStyle,
		colorMoveAnimation: btnAddToCardAnimation,
	} = useBgColorMove('transparent', 'black', 200)

	const { style: textStyle, colorMoveAnimation: textAnimation } =
		useBgColorMove('black', 'white', 200, true)

	return (
		<GestureDetector
			gesture={Gesture.Race(btnAddToCardAnimation, textAnimation)}
		>
			<Animated.View
				{...props}
				style={btnAddToCardStyle}
				className='justify-center items-center h-[40px] border-[1px] border-black rounded-[4px] mt-[24px]'
			>
				<Pressable
					className='flex-row justify-center w-full'
					onPress={() => onClick()}
				>
					<Animated.Text style={textStyle}>{btnTitle}</Animated.Text>
				</Pressable>
			</Animated.View>
		</GestureDetector>
	)
}

export default Button
