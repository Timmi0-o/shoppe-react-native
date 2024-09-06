import { Link } from 'expo-router'
import { useEffect, useMemo, useState } from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import Animated from 'react-native-reanimated'
import Swiper from 'react-native-swiper'
import { useDispatch, useSelector } from 'react-redux'
import ArrowBack from '../../../../assets/svg/ArrowBack'
import Share from '../../../../assets/svg/Share'
import { useBasket } from '../../../components/hooks/useBasket'
import { useProduct } from '../../../components/hooks/useProduct'
import { useReview } from '../../../components/hooks/useReview'
import { useUser } from '../../../components/hooks/useUser'
import { Colors } from '../../../Constant.app'
import {
	addedProductInBasket,
	deletedProductInBasket,
} from '../../../lib/reducers/Product'
import { SimilarItems } from '../../layouts/SimilarItems'
import Button from '../../shared/Button'
import Padding from '../../shared/Padding'

export default function Product() {
	const dispatch = useDispatch()

	const { user } = useUser()
	const { allReview } = useReview()
	const { product: productHook } = useProduct()
	const { addProductInBasket, isAction, isBasked } = useBasket()

	const [qty, setQty] = useState<number | null>(null)

	const productInBasket = useSelector(
		(state: any) => state.product.productInBasket
	)

	// КОЛИЧЕСТВО ВЫБРАННОГО ТОВАРА И НОМЕР ПОДРОБНОСТЕЙ
	const [productNumber, setProductNumber] = useState(1)
	const [productErrors, setProductErrors] = useState<JSX.Element | string>('')
	const [isSwitchesActive, setIsSwitchesActive] = useState(0)

	useMemo(() => {
		if (isBasked) {
			isBasked.map((product) => {
				if (product.productId === productHook?._id) {
					setQty(product.qty)
					dispatch(addedProductInBasket())
				} else {
					setQty(null)
					dispatch(deletedProductInBasket())
					setProductNumber(1)
				}
			})
		} else {
			setQty(null)
			dispatch(deletedProductInBasket())
			setProductNumber(1)
		}
	}, [isBasked, productHook, dispatch])

	// КАЛИБРОВКА ЦЕНЫ ТОВАРА
	// const [allPrice, setAllPrice] = useState(productHook?.price)
	// useEffect(() => {
	// 	setAllPrice(productHook?.price)
	// }, [productHook])

	// button title
	const [btnTitle, setBtnTitle] = useState('ADD TO CART')

	// DESCRIPTION SETTINGS
	const [isFullDescriptions, setIsFullDescriptions] = useState(false)
	const [switchTitle, setSwitchTitle] = useState('View more')
	useEffect(() => {
		if (isFullDescriptions) {
			setSwitchTitle('Roll up')
		} else {
			setSwitchTitle('View more')
		}
	}, [isFullDescriptions])

	// ADDED NEW ITEM TO BASKET
	const handleAddNewItemToBasket = async () => {
		if (!user) {
			setBtnTitle('ERROR!')
			setTimeout(() => {
				setBtnTitle('ADD TO CART')
			}, 2000)

			return setProductErrors(
				<Text>
					Only registered users can add products to the cart,
					<Link href={'/auth'}>
						<Text className='text-black ml-[5px] underline'>log in!</Text>
					</Link>
				</Text>
			)
		} else {
			setBtnTitle('ADDED!')
		}
		try {
			if (productHook && !productErrors) {
				const response = await addProductInBasket(
					productHook._id,
					productNumber
				)
				if (response) {
					setProductNumber(1)
				}
			}
		} catch (error: any) {
			console.log(error.response?.data)
		}
	}

	// INITIAL PRICE PRODUCT
	useMemo(() => {
		if (productInBasket && qty) {
			setBtnTitle('IN THE BASKET')
		} else {
			setBtnTitle('ADD TO CART')
		}
	}, [productInBasket, qty])

	return (
		<View>
			{/* LOADING  */}
			<Text
				className={`${!productHook ? '' : 'hidden'} text-[32px] text-center`}
			>
				Loading...
			</Text>
			{/* DATA  */}
			<View className={`${productHook ? '' : 'hidden'}`}>
				{/* IMAGE SWIPER  */}
				<Swiper
					className='h-[380px]'
					loop={false}
					autoplay={false}
					scrollEnabled={true}
					showsButtons={false}
					showsPagination={false}
				>
					{images.map((img, i) => (
						<View key={i} className={`items-center justify-center`}>
							<Image className={`rounded-[12px]`} source={img} />
						</View>
					))}
				</Swiper>
				<Padding>
					{/* PRODUCT DETAILS */}
					<Text className='text-[20px] mt-[24px]'>{productHook?.title}</Text>
					{/* PRICE & SHARED  */}
					<View className='flex-row justify-between mb-[24px]'>
						<Text className='text-[18px] text-[#A18A68] mt-[5px]'>
							$ {productHook?.price},00
						</Text>
						<Share />
					</View>
					{/* BTN ADD TO CARD  */}
					<View className='mt-[5px]'>
						{/* ERRORS  */}
						<Animated.Text
							// style={styleAddToCardErrors}
							className='absolute top-[-25px] text-[12px] text-red-600'
						>
							{productErrors}
						</Animated.Text>
						{/* BUTTON  */}
						<View className='flex-row items-center justify-between'>
							<View className='flex-1 pr-[20px]'>
								<Button
									disabled={productInBasket && qty ? true : false}
									btnTitle={btnTitle}
									onClick={handleAddNewItemToBasket}
								/>
							</View>
							<View
								className={`${
									productInBasket && qty ? '' : 'hidden'
								} items-center justify-center w-[100px] h-[40px] rounded-[6px] bg-[#eee]`}
							>
								<Text className='text-[16px]'>{qty}</Text>
							</View>
						</View>
					</View>
					{/* DESCRIPTION  */}
					<Text className='mt-[16px] text-[#707070]'>
						{isFullDescriptions
							? productHook?.description
							: `${productHook?.description.slice(0, 126)}...`}
					</Text>
					{/* VIEW MORE  */}
					<Pressable
						onPress={() => setIsFullDescriptions((prev) => !prev)}
						className={`${
							productHook && productHook?.description?.length > 150
								? ''
								: 'hidden'
						} flex-row items-center gap-[5px] mt-[6px] pb-[14px] border-b-[1px] border-b-[#D8D8D8]`}
					>
						<Text className='text-[#A18A68] mt-[6px]'>{switchTitle}</Text>
						<View className='w-[6px] h-[14px]'>
							<ArrowBack
								className={`${
									isFullDescriptions ? 'hidden' : 'rotate-180'
								} stroke-[#979797]`}
							/>
						</View>
					</Pressable>
					{/* REVIEWS & DESCRIPTION  */}
					<View className='pt-[16px] gap-[9px] pb-[14px] border-b-[1px] border-b-[#D8D8D8]'>
						<View className='flex-row items-center justify-between'>
							<Text>Description</Text>
							<View className='w-[6px] h-[12px] rotate-180'>
								<ArrowBack />
							</View>
						</View>
						<View className='flex-row items-center justify-between'>
							<Text>Additional information</Text>
							<View className='w-[6px] h-[12px] rotate-180'>
								<ArrowBack />
							</View>
						</View>
						<View className='flex-row items-center justify-between'>
							<Text>{`Reviews(${
								allReview && allReview.length ? allReview.length : 0
							})`}</Text>
							<View className='w-[6px] h-[12px] rotate-180'>
								<ArrowBack />
							</View>
						</View>
					</View>
					{/* SIMILAR ITEMS  */}
					<View className='mt-[21px] mb-[39px]'>
						<SimilarItems />
					</View>
					<View className='flex-row justify-between items-center'>
						<Text style={{ color: Colors.accentColor }}>Continue shopping</Text>
						<View className='w-[8px] h-[12px]'>
							<ArrowBack className='rotate-180' />
						</View>
					</View>
				</Padding>
			</View>
		</View>
	)
}

const images = [
	require('../../../../assets/Item1.png'),
	require('../../../../assets/Item2.png'),
	require('../../../../assets/Item3.png'),
	require('../../../../assets/Item4.png'),
	require('../../../../assets/Item5.png'),
]
