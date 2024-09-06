import axios from 'axios'
import { useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { ProductCard } from './ProductCard'

interface ProductProps {
	additionalImg: string[]
	_id: string
	title: string
	price: number
	description: string
	fullDescription: string
}

export const SimilarItems = () => {
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

	return (
		<View className='w-full'>
			<Text className='text-[16px]'>Similar Items</Text>
			{/* PRODUCT CARD LIST  */}
			<FlatList
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				data={products}
				renderItem={({ item }) => (
					<ProductCard
						key={item._id}
						title={item.title}
						price={item.price}
						id={item._id}
						small={true}
					/>
				)}
			/>
		</View>
	)
}
