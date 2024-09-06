import React from 'react'
import { Pressable, ViewProps } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import { useBgColorMove } from '../../utils/AnimationReady'

interface ButtonProps extends ViewProps {
	btnTitle: string
	onClick: () => void
	disabled?: boolean
}

const Button = ({ onClick, btnTitle, disabled, ...props }: ButtonProps) => {
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
				style={[
					disabled ? null : btnAddToCardStyle,
					{ backgroundColor: disabled ? 'black' : 'transparent' },
				]}
				className={`justify-center items-center h-[40px] border-[1px] border-black rounded-[4px]`}
			>
				<Pressable
					disabled={disabled}
					className={`flex-row justify-center w-full`}
					onPress={() => (disabled ? null : onClick())}
				>
					<Animated.Text
						style={[
							disabled ? null : textStyle,
							{ color: disabled ? 'white' : 'black' },
						]}
					>
						{btnTitle}
					</Animated.Text>
				</Pressable>
			</Animated.View>
		</GestureDetector>
	)
}

export default Button
