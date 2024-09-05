import { Gesture } from 'react-native-gesture-handler'
import {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withSequence,
	withTiming,
} from 'react-native-reanimated'

export const useBgColorMove = (
	colorFrom: string,
	colorTo: string,
	duration?: number,
	text?: boolean
) => {
	const switchColor = useSharedValue(false)

	const style = useAnimatedStyle(() => {
		return {
			color: text
				? withTiming(switchColor.value ? colorTo : colorFrom, {
						duration: duration || 300,
				  })
				: undefined,
			backgroundColor: !text
				? withTiming(switchColor.value ? colorTo : colorFrom, {
						duration: duration || 300,
				  })
				: undefined,
		}
	})

	const colorMoveAnimation = Gesture.Tap()
		.onBegin(() => {
			switchColor.value = true
		})
		.onFinalize(() => {
			switchColor.value = false
		})

	return {
		style,
		colorMoveAnimation,
	}
}

export const showElement = (from: number, to: number, duration?: number) => {
	return withSequence(
		withTiming(from, {
			duration: duration || 300,
			easing: Easing.bounce,
		}),
		withTiming(to, {
			duration: duration || 300,
			easing: Easing.bounce,
		})
	)
}
