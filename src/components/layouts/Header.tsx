import { Link, router, usePathname } from 'expo-router'
import { useEffect, useState } from 'react'
import {
	NativeSyntheticEvent,
	Platform,
	Pressable,
	ScrollView,
	Text,
	TextInputChangeEventData,
	View,
	ViewProps,
} from 'react-native'
import ArrowBack from '../../../assets/svg/ArrowBack'
import { Burger } from '../../../assets/svg/Burger'
import ShoppingCart from '../../../assets/svg/ShoppingCart'
import { Input } from '../shared/Input'
import Padding from '../shared/Padding'
import { BasketModal } from './Modals/BasketModal'
import { MenuProfileModal } from './Modals/MenuProfileModal'

export const Header = ({ ...props }: ViewProps) => {
	const [searchText, setSearchText] = useState('')
	const [navigation, setNavigation] = useState(true)
	const path = usePathname()

	const [basketModalIsVisible, setBasketModalIsVisible] = useState(false)
	const [menuModalIsVisible, setMenuModalIsVisible] = useState(false)

	useEffect(() => {
		if (path.includes('product')) {
			setNavigation(false)
		}
	}, [path])

	return (
		<View {...props}>
			<Padding>
				<View className='flex-row items-center justify-between mb-[17px]'>
					{/* BASKET GO BACK ARROW  */}
					{path.includes('basket') ? (
						<View className='flex-row items-center'>
							<Pressable
								onPress={() => router.back()}
								className='w-[12px] h-[18px]'
							>
								<ArrowBack />
							</Pressable>
							<Text className='text-[16px] w-full text-center'>
								Shopping bag
							</Text>
						</View>
					) : (
						<>
							<Link href={'/'}>
								<Text
									style={{ fontFamily: 'AllertaStencil' }}
									className='text-[24px]'
								>
									<Text className='text-[24px]' style={{ color: '#A18A68' }}>
										S
									</Text>
									HOPPE
								</Text>
							</Link>
							{/* NAVIGATION MENU */}
							<View className='flex-row items-center'>
								<Pressable
									className={`${Platform.OS === 'ios' ? 'mt-[4px]' : ''}`}
									onPress={() => setBasketModalIsVisible(true)}
								>
									<View
										style={{ marginRight: 7 }}
										className='items-center justify-center w-[30px] h-[30px] rounded-full'
									>
										<ShoppingCart />
									</View>
								</Pressable>
								<Pressable
									className={`${Platform.OS === 'ios' ? 'mt-[4px]' : ''}`}
									onPress={() => setMenuModalIsVisible(true)}
								>
									<View className='items-center justify-center w-[30px] h-[30px] rounded-full'>
										<Burger />
									</View>
								</Pressable>
							</View>
						</>
					)}
				</View>
			</Padding>
			<View className={`${navigation ? '' : 'hidden'}`}>
				<Padding>
					{/* SEARCH INPUT */}
					<Input
						value={searchText}
						onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
							setSearchText(e.nativeEvent.text)
						}
						placeholder='Search'
					/>
				</Padding>

				{/* GROUPS */}
				<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
					<View className='flex-row gap-[8px] my-[16px] ml-[1%]'>
						{groupsNavigate.map((item, i) => (
							<View
								className='items-center justify-center w-[140px] h-[40px] border-[1px] border-[#D8D8D8] rounded-[4px]'
								key={i}
							>
								<Text className='text-[12px]'>{item}</Text>
							</View>
						))}
					</View>
				</ScrollView>
			</View>
			{/* MODALS  */}
			<BasketModal
				isVisible={basketModalIsVisible}
				setIsVisible={setBasketModalIsVisible}
			/>
			<MenuProfileModal
				isVisible={menuModalIsVisible}
				setIsVisible={setMenuModalIsVisible}
			/>
		</View>
	)
}

const groupsNavigate = ['Earring', 'Necklace', 'Serge', 'Coco']
