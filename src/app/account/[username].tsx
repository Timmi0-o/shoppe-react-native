import { useEffect, useState } from 'react'
import { Platform, Pressable, ScrollView, Text, View } from 'react-native'
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated'
import { useUser } from '../../components/hooks/useUser'
import { AccountDetails } from '../../components/layouts/Account/AccountDetails'
import { Addresses } from '../../components/layouts/Account/Addresses'
import { Dashboard } from '../../components/layouts/Account/Dashboard'
import { LogOut } from '../../components/layouts/Account/LogOut'
import Padding from '../../components/shared/Padding'
import { Section } from '../../components/shared/Section'

type displayType = 'flex' | 'none'

export default function Account() {
	const { user } = useUser()
	const [isNavigateActive, setIsNavigateActive] = useState(0)

	// Separate useSharedValue for each item
	const scales = Array.from({ length: 5 }, () => useSharedValue(1))
	const opacities = Array.from({ length: 5 }, () => useSharedValue(1))
	const translatesX = Array.from({ length: 5 }, () => useSharedValue(0))
	const displays = Array.from({ length: 5 }, () =>
		useSharedValue<displayType>('flex')
	)

	const navigateComponentStyles = Array.from({ length: 5 }, (_, i) =>
		useAnimatedStyle(() => ({
			transform: [
				{ scale: scales[i].value },
				{ translateX: translatesX[i].value },
			],
			opacity: opacities[i].value,
			display: displays[i].value,
		}))
	)

	const handleNavigationSlide = (i: number) => {
		'worklet'
		scales.map((scale, index) => {
			scale.value =
				index === i
					? withTiming(1, { duration: 300 })
					: withTiming(0.9, { duration: 300 })
		})
		opacities.map((opacity, index) => {
			opacity.value =
				index === i
					? withTiming(1, { duration: 300 })
					: withTiming(0, { duration: 300 })
		})
		translatesX.map((translateX, index) => {
			translateX.value =
				index === i
					? withTiming(0, { duration: 300 })
					: withTiming(-100, { duration: 300 })
		})
		displays.map((display, index) => {
			display.value = index === i ? 'flex' : 'none'
		})
		setIsNavigateActive(i)
	}

	useEffect(() => {
		handleNavigationSlide(0)
	}, [])
	return (
		<Section>
			<View>
				{/* USERNAME */}
				<Text className='text-[20px] mt-[39px] text-center mb-[24px]'>
					{user?.username}
				</Text>
				{/* NAVIGATE ACCOUNT */}
				<ScrollView
					showsHorizontalScrollIndicator={false}
					horizontal={true}
					className='flex-row pb-[16px] mb-[23px] border-b-[1px] border-b-[#D8D8D8]'
				>
					{Object.keys(accountNavigation).map((naw, i) => (
						<View key={i} className='mx-[12px]'>
							<Pressable
								onPress={() => {
									handleNavigationSlide(i)
									setIsNavigateActive(i)
								}}
							>
								<Text
									className={`text-center text-[16px] leading-[27px] ${
										isNavigateActive === i ? 'text-black' : 'text-[#707070]'
									}`}
								>
									{naw}
								</Text>
							</Pressable>
						</View>
					))}
				</ScrollView>
				{/* NAVIGATE COMPONENTS */}
				<Padding>
					<View
						className={`mb-[30px] ${
							Platform.OS === 'ios' ? 'min-h-[21vh]' : 'min-h-[24vh]'
						} `}
					>
						{Object.entries(accountNavigation).map(([_, component], i) => (
							<Animated.View style={navigateComponentStyles[i]} key={i}>
								{component}
							</Animated.View>
						))}
					</View>
				</Padding>
			</View>
		</Section>
	)
}

const accountNavigation = {
	Dashboard: <Dashboard />,
	Orders: (
		<View>
			<Text>Orders</Text>
		</View>
	),
	Addresses: <Addresses />,
	AccountDetails: <AccountDetails />,
	Logout: <LogOut />,
}
