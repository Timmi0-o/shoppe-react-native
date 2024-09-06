import { usePathname } from 'expo-router'
import { useMemo, useState } from 'react'
import useSWR, { SWRResponse } from 'swr'
import { fetcher } from '../../utils/fetcher'

interface Product {
	_id: string
	title: string
	price: number
	description: string
	fullDescription: string
	img: string
	additionalImg: string[]
	setting: {
		isLike: boolean
	}
}

export const useProduct = () => {
	// CURRENT PRODUCT ID
	const path = usePathname()

	const [productId, setProductId] = useState<string>('')
	// // console.log('productId', productId)

	// ONE PRODUCT BY ID
	const {
		data: productData,
		mutate: mutateProductData,
	}: SWRResponse<Product, any, any> = useSWR(
		() =>
			productId
				? { url: `${process.env.BACK_PORT}products/${productId}` }
				: null,
		fetcher
	)

	useMemo(() => {
		if (path.includes('product')) {
			setProductId(path.split('/')[2])
		}

		return () => {
			setProductId('')
		}
	}, [path, productData])

	return {
		product: productData,
		mutateProductData,
		productId,
		setProductId,
	}
}
