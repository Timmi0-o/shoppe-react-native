import { Link, router } from 'expo-router'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
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
import LogOut from '../../../../assets/svg/LogOut'
import Profile from '../../../../assets/svg/Profile'
import ShoppingCart from '../../../../assets/svg/ShoppingCart'
import { useUser } from '../../hooks/useUser'
import { InputSearch } from '../../shared/InputSearch'
import Padding from '../../shared/Padding'

interface MenuProfileModal {
	isVisible: boolean
	setIsVisible: Dispatch<SetStateAction<boolean>>
	setBasketVisible: Dispatch<SetStateAction<boolean>>
}

export const MenuProfileModal = ({
	isVisible,
	setIsVisible,
	setBasketVisible,
}: MenuProfileModal) => {
	const [searchText, setSearchText] = useState('')
	const insets = useSafeAreaInsets()

	// GET USER DATA
	const { user, deleteToken, mutateUser } = useUser()
	const [href, setHref] = useState('/auth')

	useEffect(() => {
		setHref(user ? `/account/${user.username}` : '/auth')
	}, [user, mutateUser, isVisible])

	return (
		<Modal
			visible={isVisible}
			onRequestClose={() => setIsVisible(false)}
			animationType='slide'
			presentationStyle='formSheet'
		>
			<Padding>
				<View
					style={{ marginTop: Platform.OS === 'ios' ? insets.top / 2 : 16 }}
					className='flex-row items-center justify-between mb-[17px]'
				>
					{/* TITLE */}
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
							onPress={() => {
								setIsVisible(false)
								setBasketVisible(true)
							}}
						>
							<View
								style={{ marginRight: 7 }}
								className='items-center justify-center w-[40px] h-[40px] rounded-full'
							>
								<ShoppingCart />
							</View>
						</Pressable>
						<Pressable
							className={`${Platform.OS === 'ios' ? 'mt-[4px]' : ''}`}
							onPress={() => setIsVisible(false)}
						>
							<View className='items-center justify-center w-[40px] h-[40px] rounded-full'>
								<CloseButton />
							</View>
						</Pressable>
					</View>
				</View>
				{/* SEARCH INPUT */}
				<InputSearch
					value={searchText}
					onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
						setSearchText(e.nativeEvent.text)
					}
					placeholder='Search'
				/>
				{/* GENERAL LINKS  */}
				<View className='py-[39px] border-b-[1px] border-b-[#D8D8D8]'>
					{links.map((link, i) => (
						<Pressable
							key={i}
							className={`${i + 1 < links.length ? 'mb-[10px]' : ''} py-[10px]`}
							onPress={() => setIsVisible(false)}
						>
							<Link href={link.link}>
								<Text className='text-[20px] leading-[26px]'>{link.title}</Text>
							</Link>
						</Pressable>
					))}
				</View>
				{/* ACCOUNT & LOGOUT  */}
				<View className='mt-[24px]'>
					{/*GO TO ACCOUNT  */}
					<Pressable
						className='mb-[12px]'
						onPress={() => {
							setIsVisible(false)
							router.push(href)
						}}
					>
						<View className='flex-row items-center rounded-[4px] px-[4px] py-[10px] '>
							<Profile className='mr-[10px]' />
							<Text className='text-[20px] font-normal leading-[26px]'>
								My account
							</Text>
						</View>
					</Pressable>
					{/* LOGOUT  */}
					{user?.username && (
						<Pressable
							onPress={() => {
								deleteToken()
								setIsVisible(false)
								router.push('/')
							}}
						>
							<View className='flex-row items-center rounded-[4px] px-[4px] py-[10px] '>
								<LogOut className='mr-[10px]' />
								<Text className='text-[20px] font-normal leading-[26px]'>
									Log Out
								</Text>
							</View>
						</Pressable>
					)}
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
