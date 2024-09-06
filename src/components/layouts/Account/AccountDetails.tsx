import { useState } from 'react'
import { Text, View } from 'react-native'
import Button from '../../shared/Button'
import Input from '../../shared/Input'

export const AccountDetails = () => {
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [displayName, setDisplayName] = useState('')
	const [email, setEmail] = useState('')
	const [currentPassword, setCurrentPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [confirm, setConfirm] = useState('')

	return (
		<View className='w-full'>
			<Text className='text-[20px] text-center'>Account details</Text>
			<View className='my-[24px]'>
				<Input
					setValue={setFirstName}
					value={firstName}
					onChange={(e) => setFirstName(e.nativeEvent.text)}
					placeholder='First name*'
				/>
				<Input
					setValue={setLastName}
					value={lastName}
					onChange={(e) => setLastName(e.nativeEvent.text)}
					placeholder='Last name*'
				/>
				<View>
					<Input
						setValue={setDisplayName}
						value={displayName}
						onChange={(e) => setDisplayName(e.nativeEvent.text)}
						placeholder='Display name*'
					/>
					<Text className='text-[12px] text-[#707070] mt-[8px]'>
						This will be how your name will be displayed in the account section
						and in reviews.
					</Text>
				</View>
				<Input
					setValue={setEmail}
					value={email}
					onChange={(e) => setEmail(e.nativeEvent.text)}
					placeholder='Email address*'
				/>
			</View>
			<View className='mb-[64px]'>
				<Text className='text-[16px] font-bold'>Password change</Text>
				<View className='mt-[25px]'>
					<Input
						setValue={setCurrentPassword}
						value={currentPassword}
						onChange={(e) => setCurrentPassword(e.nativeEvent.text)}
						placeholder='Current password (leave blank to leave unchanged)'
					/>
					<Input
						setValue={setNewPassword}
						value={newPassword}
						onChange={(e) => setNewPassword(e.nativeEvent.text)}
						placeholder='New password (leave blank to leave unchanged)'
					/>
					<Input
						setValue={setConfirm}
						value={confirm}
						onChange={(e) => setConfirm(e.nativeEvent.text)}
						placeholder='Confirm new password'
					/>
				</View>
			</View>
			<View>
				<Button onClick={() => {}} btnTitle='SAVE CHANGES' />
			</View>
		</View>
	)
}
