import { Link } from 'expo-router'
import { Image, Text, View, ViewProps } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated'

interface ProductCardProps extends ViewProps {
	id: string
	img?: string
	title: string
	price: number
	propsKey?: number
	small?: boolean
}

export const ProductCard = ({
	id,
	img,
	title,
	price,
	propsKey,
	small,
	...props
}: ProductCardProps) => {
	const productMoveColor = useSharedValue(false)
	const styleProductCard = useAnimatedStyle(
		() => ({
			backgroundColor: productMoveColor.value
				? withTiming('#d8d8d8', { duration: 250 })
				: withTiming('#fff', { duration: 300 }),
		}),
		[]
	)
	const animateBgColor = Gesture.Fling()
		.onBegin(() => {
			productMoveColor.value = true
		})
		.onFinalize(() => {
			productMoveColor.value = false
		})

	return (
		<View className='mb-[24px]' {...props}>
			<GestureDetector gesture={animateBgColor}>
				<Animated.View
					style={[
						styleProductCard,
						{ borderRadius: 8, paddingHorizontal: 5, paddingVertical: 7 },
					]}
				>
					<Link href={`/product/${id}`}>
						<View
							className={`${small ? 'w-[136px]' : 'w-[42.5vw]'}  items-start`}
						>
							<Image
								// resizeMode='contain'
								className={`${
									small ? 'h-[136px]' : 'h-[180px]'
								} w-full  rounded-[8px]`}
								source={require('../../../assets/Item3.png')}
							/>
							<Text
								className={` ${
									small ? 'text-[12px]' : 'text-[14px]'
								}  mt-[6px] mb-[4px]`}
							>
								{title}
							</Text>
							<Text>$ {price},00</Text>
						</View>
					</Link>
				</Animated.View>
			</GestureDetector>
		</View>
	)
}
