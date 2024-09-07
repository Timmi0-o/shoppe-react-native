import React, { ReactNode } from 'react'
import { ViewProps } from 'react-native'
import { GestureDetector } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import { useBgColorMove } from '../../utils/AnimationReady'

interface CircAnimateBlockProps extends ViewProps {
	children: ReactNode
}

const CircAnimateBlock = ({ children, ...props }: CircAnimateBlockProps) => {
	// ANIMATIONS
	const { style, colorMoveAnimation } = useBgColorMove('#ffff', '#d4d4d4', 300)

	return (
		<GestureDetector gesture={colorMoveAnimation}>
			<Animated.View
				{...props}
				className='rounded-full items-center justify-center'
				style={[style, props.style]}
			>
				{children}
			</Animated.View>
		</GestureDetector>
	)
}

export default CircAnimateBlock
