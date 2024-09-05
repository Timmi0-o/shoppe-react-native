import React, { ReactNode } from 'react'
import { View, ViewProps } from 'react-native'

interface Padding extends ViewProps {
	children: ReactNode
}

const Padding = ({ children, ...props }: Padding) => {
	return (
		<View {...props} className='px-[4.5%]'>
			{children}
		</View>
	)
}

export default Padding
