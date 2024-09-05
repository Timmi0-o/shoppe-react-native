import { useState } from 'react'
import { Image, Text, TextInput, View, ViewProps } from 'react-native'
import InputArrowFooter from '../../../assets/svg/InputArrowFooter'
import Padding from '../shared/Padding'
import { Rights } from '../shared/Rights'

export const Footer = ({ ...props }: ViewProps) => {
	const [isRights, setIsRights] = useState(false)
	return (
		<Padding>
			<View {...props} className='mt-[70px] items-center w-full'>
				<View className='flex-row items-center justify-between pb-[6px] border-b-[1px] border-b-black w-full'>
					<TextInput placeholder='Give an email, get the newsletter.' />
					<InputArrowFooter />
				</View>
				<Rights
					className='mb-[40px]'
					rightsState={isRights}
					rightsSetState={setIsRights}
					rightsText='i agree to the website’s terms and conditions'
				/>
				{/* CONTACTS  */}
				<View className='items-start w-full mb-[32px]'>
					{navLinks.map((link, i) => (
						<Text
							key={i}
							className={` ${
								i + 1 < navLinks.length ? 'mb-[8px]' : ''
							} text-[12px] text-gray-600`}
						>
							{link}
						</Text>
					))}
				</View>
				{/* FOLLOW AS  */}
				<View className='w-full flex-row items-center justify-start mb-[36px]'>
					<Text className='text-[12px] mr-[15px]'>Follow us</Text>
					<View className='w-[48px] h-[1px] bg-black mr-[8px]'></View>
					<View className='flex-row justify-center items-center'>
						{socialLinks.map((link, i) => (
							<View
								className='justify-center items-center w-[22px] h-[22px] rounded-full border mr-[16px]'
								key={i}
							>
								<Image
									className={`${link.size}`}
									source={link.img}
									alt={link.title}
								/>
							</View>
						))}
					</View>
				</View>
				<Text className='text-left w-full text-[#707070] mb-[17px]'>
					© 2020 Shelly. Terms of use and privacy policy.
				</Text>
			</View>
		</Padding>
	)
}

const navLinks = ['CONTACT', 'TERMS OF SERVICES', 'SHIPPING AND RETURNS']

const socialLinks = [
	{
		title: 'facebook',
		img: require('../../../assets/facebook.svg'),
		href: '#',
		size: 'w-[7px] h-[12px]',
	},
	{
		title: 'instagram',
		img: require('../../../assets/instagram.svg'),
		href: '#',
		size: 'size-[12px]',
	},
	{
		title: 'x.svg',
		img: require('../../../assets/x.svg'),
		href: '#',
		size: 'w-[14px] h-[12px]',
	},
]
