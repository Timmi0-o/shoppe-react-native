import { useFonts } from 'expo-font'
import { Stack, usePathname } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { setCustomText } from 'react-native-global-props'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { store } from '../lib/store'

export default function Layout() {
	const path = usePathname()
	const [loaded] = useFonts({
		AllertaStencil: require('../../assets/fonts/AllertaStencil-Regular.ttf'),
		DmSansRegular: require('../../assets/fonts/DMSans-Regular.ttf'),
		DmSansMedium: require('../../assets/fonts/DMSans-Medium.ttf'),
		DmSansBold: require('../../assets/fonts/DMSans-Bold.ttf'),
	})

	if (!loaded) {
		return null
	}

	const customTextProps = {
		style: {
			fontFamily: 'DmSansRegular',
		},
	}
	setCustomText(customTextProps)

	return (
		<Provider store={store}>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<SafeAreaView style={{ flex: 1 }}>
					<Stack
						screenOptions={{
							headerShown: false,
						}}
					/>
				</SafeAreaView>
			</GestureHandlerRootView>
		</Provider>
	)
}
