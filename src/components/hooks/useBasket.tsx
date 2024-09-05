import { BACK_PORT } from '@env'
import axios from 'axios'
import { useEffect, useState } from 'react'
import useSWR, { SWRResponse } from 'swr'
import { fetcher } from '../../utils/fetcher'
import { useProduct } from './useProduct'
import { useUser } from './useUser'

interface BasketData {
	product: {
		_id: string
		description: string
		fullDescription: string
		price: number
		title: string
	}
	qty: number
}

interface ProductIsBasket {
	productId: string
	qty: number
}

export const useBasket = () => {
	// GET USER DATA
	const { user } = useUser()
	// GET PRODUCT DATA
	const { productId } = useProduct()
	// GET BASKET DATA
	const {
		data: basketData,
		mutate: mutateBasket,
	}: SWRResponse<BasketData[], any, any> = useSWR(
		() =>
			user && {
				url: `${BACK_PORT}basket/${user._id}`,
			},
		fetcher
	)
	// console.log('basketData', basketData)

	const [isBasked, setIsBasked] = useState<ProductIsBasket[]>([])

	useEffect(() => {
		basketData?.map((item) =>
			item.product?._id === productId
				? setIsBasked((prev) => [
						...prev,
						{ productId: productId, qty: item.qty },
				  ])
				: ''
		)
	}, [basketData, productId])

	// CALCULATED FULL ITEMS && END PRICE
	const [numberItems, setNumberItems] = useState(0)
	const [allPrice, setAllPrice] = useState(0)

	useEffect(() => {
		let countItems = 0
		let countAllPrice = 0
		basketData?.map((item) => {
			countItems += item.qty
			countAllPrice += item.product?.price * item?.qty
		})
		setNumberItems(countItems)
		setAllPrice(countAllPrice)
	}, [basketData])

	// ВКЛЮЧАЕТ ЗАГРУЗОЧНУЮ АНИМАЦИЮ
	const [isAction, setIsAction] = useState(false)

	// DELETE PRODUCT IN BASKET

	const deleteProductToBasket = async (idProduct: string) => {
		try {
			if (!isAction) {
				setIsAction(true)
				const response = await axios.delete(
					`${BACK_PORT}basket/delete-product`,
					{
						data: { idUser: user?._id, idProduct: idProduct },
					}
				)
				if (response) {
					// UPDATING BASKED
					mutateBasket((prevBasketData) => {
						if (!prevBasketData) return prevBasketData
						return prevBasketData.filter(
							(item) => item.product._id !== idProduct
						)
					})

					setIsAction(false)
				}
			}
		} catch (error: any) {
			console.log(error?.response.data)
		}
	}

	// ADD PRODUCT IN BASKET
	const addProductInBasket = async (productId: string, qty: number) => {
		if (!isAction) {
			setIsAction(true)
			const response = await axios.patch(`${BACK_PORT}basket/add-product`, {
				user: user?._id,
				product: { productId, qty },
			})
			if (response) {
				mutateBasket((prevBasketData) => {
					if (!prevBasketData) return prevBasketData
					return [...prevBasketData, { product: response.data.product, qty }]
				})
				setIsAction(false)
				return true
			}
		} else {
			console.log('Ошибка добавления!')
		}
	}

	return {
		basketData,
		numberItems,
		allPrice,
		addProductInBasket,
		deleteProductToBasket,
		isAction,
		isBasked,
		mutateBasket,
	}
}
