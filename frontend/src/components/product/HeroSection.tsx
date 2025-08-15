import { useEffect, useState } from 'react'
import { assets, products } from '../../assets/assets'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { addToCart, addtToCartAsync, getCartAsync } from '../../store/slice/cartSlice'
import type { AddToCartData } from '../../types/Product'
import { toast } from 'react-toastify'

export default function HeroSection({ id }: { id?: string }) {
    const dispatch = useAppDispatch()
    const { user } = useAppSelector((state) => state.user)
    const products = useAppSelector(state => state.shop.products)
    const [productData, setProductData] = useState(products)
    const [selectedSize, setSelectedSize] = useState('')
    const [selectedImage, setSelectedImage] = useState(0)
    const productId = id || null

    const colors = [
        { id: 'white', name: 'White', classes: 'bg-white checked:outline-gray-400' },
        { id: 'gray', name: 'Gray', classes: 'bg-gray-200 checked:outline-gray-400' },
        { id: 'black', name: 'Black', classes: 'bg-gray-900 checked:outline-gray-900' },
    ]
    const fetchProduct = () => {
        products.map((item: any) => {
            if (productId === item._id) {
                setProductData([item])
            }
        })
    }

    useEffect(() => {
        fetchProduct()
    }, [productId])
    const handleAddToCart = async (data: AddToCartData) => {
        if (!user) {
            toast.error('Please login first')
            return
        }
        if (!selectedSize) {
            toast.error('Please select a size')
            return
        }
        try {
            const result = await dispatch(addtToCartAsync({ userId: user._id, itemId: data._id, size: selectedSize }))
            if (addtToCartAsync.fulfilled.match(result)) {
                dispatch(addToCart(data))
                toast.success('Added to cart successfully!')
                // Refresh cart data
                dispatch(getCartAsync({ userId: user._id }))
            } else {
                toast.error(result.payload as string || 'Failed to add item to cart')
            }
        } catch (error: any) {
            console.log(error)
            toast.error(error.response?.data?.message || error)
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            {/* <h1 className='text-2xl font-bold text-black'>{filteredData.map((item: any) => item.name)}</h1> */}
            {
                productData.map((item: any) => (
                    <div key={item._id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                        {/* Thumbnail Images */}
                        <div className="lg:col-span-1 order-2 lg:order-1">
                            <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                                {item.image.map((img: string, index: number) => (
                                    <div
                                        key={index}
                                        className={`flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 border-2 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:border-gray-800 ${selectedImage === index ? 'border-gray-800' : 'border-transparent'
                                            }`}
                                        onClick={() => setSelectedImage(index)}
                                    >
                                        <img
                                            src={img || "/placeholder.svg"}
                                            alt={`Product view ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Main Product Image */}
                        <div className="lg:col-span-6 order-1 lg:order-2">
                            <div className="bg-gray-50 rounded-xl overflow-hidden aspect-square">
                                <img
                                    src={item.image[selectedImage] || "/placeholder.svg"}
                                    alt="Main product view"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="lg:col-span-5 order-3 space-y-6">
                            <div>
                                <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 leading-tight">
                                    {item.name}
                                </h1>

                                <div className="flex items-center gap-3 mt-4">
                                    <div className="flex items-center">
                                        {[1, 2, 3, 4, 5].map((_, index) => (
                                            <img key={index} src={assets.star_icon} alt="" className='w-5 h-5' />
                                        ))}
                                    </div>
                                    <span className="text-gray-600 text-sm">(122)</span>
                                </div>
                            </div>

                            <div className="text-3xl lg:text-4xl font-bold text-gray-900">
                                ${item.price.toFixed(2)}
                            </div>

                            <p className="text-gray-600 leading-relaxed">{item.description}</p>
                            {/* ------------ Color ------------ */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">Color</h3>

                                <fieldset aria-label="Choose a color" className="mt-4">
                                    <div className="flex items-center gap-x-3">
                                        {colors.map((color) => (
                                            <div key={color.id} className="flex rounded-full outline -outline-offset-1 outline-black/10">
                                                <input
                                                    defaultValue={color.id}
                                                    defaultChecked={color === colors[0]}
                                                    name="color"
                                                    type="radio"
                                                    aria-label={color.name}
                                                    className={`${color.classes} size-8 appearance-none rounded-full forced-color-adjust-none checked:outline-2 checked:outline-offset-2 focus-visible:outline-3 focus-visible:outline-offset-3`}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </fieldset>
                            </div>

                            {/* ------------ Size ------------ */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900">Select Size</h3>
                                <div className="flex flex-wrap gap-3">
                                    {item.sizes.map((size: string, index: number) => (
                                        <button
                                            key={index}
                                            className={`px-6 py-3 border rounded-lg font-medium transition-all duration-200 min-w-[60px] ${selectedSize === size
                                                ? 'bg-gray-900 text-white border-gray-900'
                                                : 'bg-white text-gray-900 border-gray-300 hover:border-gray-900'
                                                }`}
                                            onClick={() => setSelectedSize(size)}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                className="w-full bg-black text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors duration-200"
                                onClick={() => handleAddToCart({ _id: item._id, name: item.name, image: item.image[selectedImage], price: item.price, size: selectedSize })}
                            >
                                ADD TO CART
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}