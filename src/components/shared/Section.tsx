import { ReactNode } from 'react'
import { Platform, ScrollView, ScrollViewProps, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Footer } from '../layouts/Footer'
import { Header } from '../layouts/Header'

interface SectionProps extends ScrollViewProps {
	children: ReactNode
	noFooter?: boolean
	noHeader?: boolean
}

export const Section = ({
	children,
	noFooter,
	noHeader,
	...props
}: SectionProps) => {
	const insets = useSafeAreaInsets()
	return (
		<ScrollView {...props} contentContainerStyle={styles.wrapper}>
			{!noHeader && (
				<Header
					style={{ marginTop: Platform.OS === 'ios' ? insets.top / 4 : 16 }}
				/>
			)}

			{children}
			{!noFooter && <Footer />}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		backgroundColor: 'white',
	},
})
