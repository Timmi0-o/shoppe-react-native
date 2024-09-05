import axios from 'axios'
import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { RefreshControl } from 'react-native-gesture-handler'
import Filters from '../../assets/svg/Filters'
import { Colors } from '../Constant.app'
import { ProductCard } from '../components/layouts/ProductCard'
import Padding from '../components/shared/Padding'
import { Section } from '../components/shared/Section'

interface ProductProps {
	additionalImg: string[]
	_id: string
	title: string
	price: number
	description: string
	fullDescription: string
}

export default function Home() {
	const [refreshing, setRefreshing] = useState(false)
	const [products, setProducts] = useState<ProductProps[] | null>(null)

	const getProducts = async () => {
		try {
			const response = await axios.get(`${process.env.BACK_PORT}products`)
			setProducts(response.data)
		} catch (error: any) {
			console.error('Ошибка запроса товаров:', error.response.message)
		}
	}

	useEffect(() => {
		getProducts()
	}, [])

	const onRefresh = async () => {
		setRefreshing(true)
		await getProducts()
		setRefreshing(false)
	}

	return (
		<Section
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}
		>
			<Padding>
				<Text className='text-[26px] w-full mb-[15px]'>Shop</Text>
				<View className='flex-row justify-start gap-[8px] w-full'>
					<Filters />
					<Text style={{ color: Colors.accentColor }}>Filters</Text>
				</View>
				{/* PRODUCT CARD LIST  */}
				<View
					className={`flex-row flex-wrap justify-between w-full ${
						products ? '' : 'mt-[20px] invisible opacity-0'
					}`}
				>
					{products?.map((item: ProductProps) => (
						<ProductCard
							key={item._id}
							title={item.title}
							price={item.price}
							id={item._id}
						/>
					))}
				</View>
				{/* PRODUCT NOT FOUND  */}
				<Text className={`text-[22px] mt-[10vw] ${!products ? '' : 'hidden'}`}>
					Упс, кажется сейчас ничего нет...
				</Text>
			</Padding>
		</Section>
	)
}
