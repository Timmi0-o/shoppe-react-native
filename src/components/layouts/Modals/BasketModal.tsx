import React, { Dispatch, SetStateAction } from 'react'
import { Modal, Platform, Pressable, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ArrowBack from '../../../../assets/svg/ArrowBack'
import Padding from '../../shared/Padding'

interface BasketModal {
	isVisible: boolean
	setIsVisible: Dispatch<SetStateAction<boolean>>
}

export const BasketModal = ({ isVisible, setIsVisible }: BasketModal) => {
	const insets = useSafeAreaInsets()
	return (
		<Modal
			animationType='slide'
			presentationStyle='pageSheet'
			visible={isVisible}
			onRequestClose={(prev) => setIsVisible(!prev)}
		>
			<Padding>
				<View
					style={{ marginTop: Platform.OS === 'ios' ? insets.top / 2 : 0 }}
					className='flex-row items-center'
				>
					<View className='w-[18px] h-[24px]'>
						<Pressable onPress={() => setIsVisible(false)}>
							<ArrowBack />
						</Pressable>
					</View>
					<Text className='text-[22px] w-full text-center'>Basket Modal</Text>
				</View>
			</Padding>
		</Modal>
	)
}
