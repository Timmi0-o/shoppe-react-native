import { Link } from 'expo-router'
import React, { Dispatch, SetStateAction, useState } from 'react'
import {
	Modal,
	NativeSyntheticEvent,
	Platform,
	Pressable,
	Text,
	TextInputChangeEventData,
	View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import CloseButton from '../../../../assets/svg/CloseButton'
import ShoppingCart from '../../../../assets/svg/ShoppingCart'
import { Input } from '../../shared/Input'
import Padding from '../../shared/Padding'

interface MenuProfileModal {
	isVisible: boolean
	setIsVisible: Dispatch<SetStateAction<boolean>>
}

export const MenuProfileModal = ({
	isVisible,
	setIsVisible,
}: MenuProfileModal) => {
	const [searchText, setSearchText] = useState('')
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
					className='flex-row items-center justify-between mb-[17px]'
				>
					{/* BASKET GO BACK ARROW  */}

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
							onPress={() => setIsVisible(true)}
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
							onPress={() => setIsVisible(false)}
						>
							<View className='items-center justify-center w-[30px] h-[30px] rounded-full'>
								<CloseButton />
							</View>
						</Pressable>
					</View>
				</View>
				{/* SEARCH INPUT */}
				<Input
					value={searchText}
					onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
						setSearchText(e.nativeEvent.text)
					}
					placeholder='Search'
				/>
				<View className='py-[39px] border-b-[1px] border-b-[#D8D8D8]'>
					<View>
						{links.map((link, i) => (
							<Pressable
								key={i}
								className={`${i + 1 < links.length ? 'mb-[24px]' : ''}`}
								onPress={() => setIsVisible(false)}
							>
								<Link href={link.link}>
									<Text className='text-[20px] leading-[26px]'>
										{link.title}
									</Text>
								</Link>
							</Pressable>
						))}
					</View>
				</View>
			</Padding>
		</Modal>
	)
}

const links = [
	{ title: 'Home', link: '/' },
	{ title: 'Shop', link: '/shop' },
	{ title: 'About', link: '/about' },
	{ title: 'Blog', link: '/blog' },
	{ title: 'Help', link: '/help' },
	{ title: 'Contact', link: '/contact-as' },
	{ title: 'Search', link: '/search' },
]
