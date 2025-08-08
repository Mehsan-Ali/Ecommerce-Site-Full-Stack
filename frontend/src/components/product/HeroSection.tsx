import { useState } from 'react'
import { assets } from '../../assets/assets'

export default function HeroSection() {
    const [selectedSize, setSelectedSize] = useState('')
    const [selectedImage, setSelectedImage] = useState(0)

    const productImages = [
        'https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img2_1.png',
        'https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img2_2.png',
        'https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img2_3.png',
        'https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img2_4.png',
    ]
    const colors = [
        { id: 'white', name: 'White', classes: 'bg-white checked:outline-gray-400' },
        { id: 'gray', name: 'Gray', classes: 'bg-gray-200 checked:outline-gray-400' },
        { id: 'black', name: 'Black', classes: 'bg-gray-900 checked:outline-gray-900' },
    ]
    const sizes = ['S', 'M', 'L', 'XL', 'XXL']

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('Please select a size')
            return
        }
        alert(`Added to cart: Size ${selectedSize}`)
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                {/* Thumbnail Images */}
                <div className="lg:col-span-1 order-2 lg:order-1">
                    <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                        {productImages.map((image, index) => (
                            <div
                                key={index}
                                className={`flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 border-2 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:border-gray-800 ${selectedImage === index ? 'border-gray-800' : 'border-transparent'
                                    }`}
                                onClick={() => setSelectedImage(index)}
                            >
                                <img
                                    src={image || "/placeholder.svg"}
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
                            src={productImages[selectedImage] || "/placeholder.svg"}
                            alt="Main product view"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Product Details */}
                <div className="lg:col-span-5 order-3 space-y-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 leading-tight">
                            Men Round Neck Pure Cotton T-shirt
                        </h1>

                        <div className="flex items-center gap-3 mt-4">
                            <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg
                                        key={star}
                                        className={`w-5 h-5 ${star <= 4 ? 'text-orange-400' : 'text-gray-300'}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-gray-600 text-sm">(122)</span>
                        </div>
                    </div>

                    <div className="text-3xl lg:text-4xl font-bold text-gray-900">
                        $80
                    </div>

                    <p className="text-gray-600 leading-relaxed">
                        A lightweight, usually knitted, pullover shirt, close-fitting and
                        with a round neckline and short sleeves, worn as an undershirt or
                        outer garment.
                    </p>
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

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">Select Size</h3>
                        <div className="flex flex-wrap gap-3">
                            {sizes.map((size) => (
                                <button
                                    key={size}
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
                        onClick={handleAddToCart}
                    >
                        ADD TO CART
                    </button>

                    <div className="space-y-2 text-sm text-gray-600 pt-4 border-t border-gray-200">
                        {/* <p><span className="font-semibold text-gray-900">100%</span> Original product.</p>
                        <p>Cash on delivery is available on this product.</p>
                        <p>Easy return and exchange policy within 7 days.</p> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
