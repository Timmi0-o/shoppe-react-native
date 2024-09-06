import { router } from 'expo-router'
import React, { Dispatch, SetStateAction, useMemo, useState } from 'react'
import {
	Image,
	Modal,
	Platform,
	Pressable,
	ScrollView,
	Text,
	View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ArrowBack from '../../../../assets/svg/ArrowBack'
import CloseButtonMini from '../../../../assets/svg/CloseButtonMini'
import { Colors } from '../../../Constant.app'
import { useBasket } from '../../hooks/useBasket'
import { useProduct } from '../../hooks/useProduct'
import { useUser } from '../../hooks/useUser'
import Button from '../../shared/Button'
import Padding from '../../shared/Padding'

interface BasketModal {
	isVisible: boolean
	setIsVisible: Dispatch<SetStateAction<boolean>>
}

export const BasketModal = ({ isVisible, setIsVisible }: BasketModal) => {
	const insets = useSafeAreaInsets()

	// BASKET
	const { basketData, numberItems, allPrice, deleteProductToBasket, isAction } =
		useBasket()

	// USER
	const { user } = useUser()
	// PRODUCT
	const { productId, setProductId } = useProduct()

	const [basketInformation, setBasketInformation] = useState('')

	useMemo(() => {
		if (user && !basketData?.length) {
			setBasketInformation(() => {
				return 'The basket is empty...'
			})
		} else if (!user) {
			setBasketInformation(() => {
				return 'To add products to the cart, log in to your profile account!'
			})
		} else {
			setBasketInformation(() => {
				return ''
			})
		}

		return () => {
			setBasketInformation(() => {
				return ''
			})
		}
	}, [user, basketData])

	return (
		<Modal
			animationType='slide'
			presentationStyle='formSheet'
			visible={isVisible}
			onRequestClose={(prev) => setIsVisible(!prev)}
		>
			<Padding>
				{/* HEADER  */}
				<View
					style={{ marginTop: Platform.OS === 'ios' ? insets.top / 2 : 0 }}
					className='flex-row items-center'
				>
					<Pressable
						onPress={() => setIsVisible(false)}
						className='w-[40px] h-[40px] items-center justify-center'
					>
						<View className='w-[18px] h-[24px]'>
							<ArrowBack />
						</View>
					</Pressable>
					<Text className='text-[22px] mr-[10px] mx-auto'>Shopping bag</Text>
				</View>
				{/* BASKET DATA  */}
				<ScrollView className='h-[84vh]'>
					{/* IS NOT BASKET or USER INFO */}
					<View
						className={`${
							basketInformation ? 'h-[70vh] justify-center' : 'hidden'
						}`}
					>
						<Text className={'text-[26px] text-center opacity-70'}>
							{basketInformation}
						</Text>
					</View>
					<View
						className={`justify-between min-h-[84vh] ${
							!basketInformation ? '' : 'hidden'
						}`}
					>
						{/* PRODUCTS  */}
						<View className={`mt-[25px]`}>
							<Text
								style={{ color: Colors.grey, fontSize: 12 }}
								className='mb-[3px]'
							>
								{numberItems} items
							</Text>
							{basketData?.map((product, i) => (
								<Pressable
									className={`${
										isAction && product?.product?._id === productId
											? 'opacity-40'
											: ''
									}`}
									onPress={() => {
										setIsVisible(false)
										router.push(`product/${product?.product?._id}`)
									}}
									key={i}
								>
									<View
										className={`flex-row w-full h-[136px] ${
											i + 1 < basketData?.length ? 'mb-[22]' : ''
										}`}
									>
										<Image
											className={`w-[136px] h-[136px] mr-[8px] rounded-[8px]`}
											resizeMode='contain'
											source={require('../../../../assets/Item2.png')}
										/>
										<View className='flex-1 flex-row justify-between'>
											<View className='justify-between'>
												<View>
													<Text>{product?.product?.title}</Text>
													<Text
														className='my-[5px]'
														style={{ color: Colors.grey }}
													>
														Black / Medium
													</Text>
													<Text style={{ color: Colors.grey }}>
														$ {product?.product?.price},00
													</Text>
												</View>
												<Text
													style={{ color: Colors.grey }}
												>{`QTY: - ${product?.qty} +`}</Text>
											</View>
											{/* DELETE PRODUCT IN BASKET  */}
											<Pressable
												onPress={() => {
													setProductId(product?.product?._id)
													deleteProductToBasket(productId)
												}}
												className='w-[40px] h-[40px] items-end justify-center translate-y-[-10px]'
											>
												<CloseButtonMini width={20} height={20} />
											</Pressable>
										</View>
									</View>
								</Pressable>
							))}
						</View>
						<View className='mb-[10px] pt-[20px]'>
							<View className='flex-row justify-between items-center mb-[16px]'>
								<Text className='text-[16px] font-medium'>
									Subtotal ({basketData?.length} items)
								</Text>
								<Text className='text-[16px] font-medium'>$ {allPrice},00</Text>
							</View>
							<Button
								onClick={() => {
									router.push('/shopping-cart')
									setIsVisible(false)
								}}
								btnTitle='View Cart'
							/>
						</View>
					</View>
				</ScrollView>
			</Padding>
		</Modal>
	)
}
