import { useEffect, useState } from 'react'
import { useAppSelector } from '../store/hooks'
import { Title } from '../components/Title'
import { ProductItem } from '../components/ProductItem'
import { type Product } from '../types/Product'
import { SearchBar } from '../components/SearchBar'

export const Collection = () => {
    const products = useAppSelector((state) => state.shop.products)
    const [filters, setFilters] = useState(true)
    const [filterProducts, setFilterProducts] = useState<Product[]>([])
    const [category, setCategory] = useState<string[]>([])
    const [subcategory, setSubCategory] = useState<string[]>([])
    const [sorType, setSortType] = useState('relavent')
    const { search } = useAppSelector((state) => state.shop)
    const debounce = (func: any, delay: number) => {
        let timeout: any
        return (...args: any) => {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                func(...args)
            }, delay)
        }
    }

    const toggleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (category.includes(e.target.value)) {
            setCategory(prev => prev.filter(item => item !== e.target.value))
            console.log(category)
        } else {
            setCategory(prev => [...prev, e.target.value])
        }
    }
    const toggleSubCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (subcategory.includes(value)) {
            setSubCategory(prev => prev.filter(item => item !== value))
        } else {
            setSubCategory(prev => [...prev, value])
        }
    }
    const applyFilter = () => {
        let productsCopy = products.slice()

        if (category.length > 0) {
            productsCopy = productsCopy.filter(item => category.includes(item.category))
        }

        if (subcategory.length > 0) {
            productsCopy = productsCopy.filter(item => subcategory.includes(item.subCategory))
        }
        if (search.trim() !== '') {
            productsCopy = productsCopy.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase()) || item.price.toString().includes(search))
        }
        setFilterProducts(productsCopy)
    }

    const sortProduct = () => {
        let fyp = filterProducts.slice()
        switch (sorType) {
            case 'low-high':
                setFilterProducts(fyp.sort((a, b) => a.price - b.price))
                break;

            case 'high-low':
                setFilterProducts(fyp.sort((a, b) => b.price - a.price))
                break;

            default:
                applyFilter()
                break;
        }
    }

    useEffect(() => {
        const optimizedSearch = debounce(applyFilter, 2000);
        optimizedSearch()
    }, [category, subcategory, search])

    useEffect(() => {
        sortProduct()
    }, [sorType])

    return (
        <>
            <SearchBar />

            <div className='flex flex-col md:flex-row gap-5 sm:gap-10 pt-10 px-4 sm:px-[5vw]'>
                {/* ------------ Filter Options --------------- */}
                <div className='min-w-60 grow'>
                    <p onClick={() => setFilters(!filters)} className='my-4.5 text-gray-700 flex items-center text-xl cursor-pointer gap-2'>Filters</p>

                    {
                        filters ?
                            <div className='flex flex-col gap-5'>
                                {/* ------------------ Categories ------------------- */}
                                <div className='border border-gray-300 rounded-md p-4'>
                                    <p className='uppercase my-2 text-lg'>Categories</p>
                                    <div className='flex flex-col gap-1 text-sm text-gray-700'>
                                        <div className='flex items-center gap-2'>
                                            <input value={'Men'} onChange={toggleCategory} type="checkbox" name="men" id="men" className='w-3' />
                                            <label htmlFor="men">Men</label>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <input value={'Women'} onChange={toggleCategory} type="checkbox" name="women" id="women" className='w-3' />
                                            <label htmlFor="women">Women</label>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <input value={'Kids'} onChange={toggleCategory} type="checkbox" name="kids" id="kids" className='w-3' />
                                            <label htmlFor="kids">Kids</label>
                                        </div>
                                    </div>
                                </div>

                                {/* ------------------ Type ------------------- */}

                                <div className='border border-gray-300 rounded-md p-4'>
                                    <p className='uppercase my-2 text-lg'>TYPE</p>
                                    <div className='flex flex-col gap-1 text-gray-700 text-sm'>
                                        <div className='flex items-center gap-2'>
                                            <input type="checkbox" name="topwear" id="topwear" onChange={toggleSubCategory} value={'Topwear'} className='w-3' />
                                            <label htmlFor="topwear">Topwear</label>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <input type="checkbox" name="bottomwear" id="bottomwear" className='w-3' onChange={toggleSubCategory} value={'Bottomwear'} />
                                            <label htmlFor="bottomwear">Bottomwear</label>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <input type="checkbox" name="winterwear" id="winterwear" className='w-3' onChange={toggleSubCategory} value={'Winterwear'} />
                                            <label htmlFor="winterwear">Winterwear</label>
                                        </div>
                                    </div>
                                </div>
                            </div> : null
                    }
                </div>

                {/* ------------ All Collections --------------- */}
                <div className='flex-9/12 pb-10 sm:pb-28'>
                    <div className='flex justify-between items-center py-2 text-center sm:text-start text-lg sm:text-3xl'>
                        <Title text1='All' text2='Collections' />
                        <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-200 py-2 text-sm px-2 outline-0 w-fit'>
                            <option value="relavent">Sort by: Relavent</option>
                            <option value="low-high">Sort by: Low to High</option>
                            <option value="high-low">Sort by: High to Low</option>
                        </select>
                    </div>
                    {
                        filterProducts.length > 0 ? (
                            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                                {
                                    filterProducts.map((product) => (
                                        <ProductItem key={product._id} {...product} />
                                    ))
                                }
                            </div>
                        ) : (
                            <div className='flex flex-col items-center h-full justify-center'>
                                <p className=' text-gray-500'>No products found</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}
