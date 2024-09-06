import { Text, View } from 'react-native'

export const Addresses = () => {
	return (
		<View>
			<Text className='text-[12px] md:text-[16px]'>
				The following addresses will be used on the checkout page by default.
			</Text>
			<View className='gap-[24px] justify-between w-full mt-[15px]'>
				<View className='w-1/2'>
					<Text className='text-[16px] lg:text-[20px] mb-[24px]'>
						Billing address
					</Text>
					<Text className='text-[16px] text-[#A18A68] mb-[14px]'>ADD</Text>
					<Text className='text-[12px] text-[#707070]'>
						You have not set up this type of address yet.
					</Text>
				</View>
				<View className='w-1/2'>
					<Text className='text-[16px] lg:text-[20px] mb-[24px]'>
						Billing address
					</Text>
					<Text className='text-[16px] text-[#A18A68] mb-[14px]'>ADD</Text>
					<Text className='text-[12px] text-[#707070]'>
						You have not set up this type of address yet.
					</Text>
				</View>
			</View>
		</View>
	)
}
