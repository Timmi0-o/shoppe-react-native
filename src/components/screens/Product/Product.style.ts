import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { showElement } from '../../../utils/AnimationReady'

export const useProductAnimations = () => {
	// BUTTON ADD TO CARD
	const bgColorButton = useSharedValue('transparent')
	const textColorButton = useSharedValue('black')
	const addToCardErrors = useSharedValue(0)

	const styleTextButton = useAnimatedStyle(() => {
		return {
			color: textColorButton.value,
		}
	})
	const styleAddToCardErrors = useAnimatedStyle(() => {
		return {
			marginLeft: addToCardErrors.value,
		}
	})
	const animateErrors = () => {
		addToCardErrors.value = showElement(0, 20)
	}

	return {
		styleTextButton,
		styleAddToCardErrors,
		animateErrors,
	}
}
