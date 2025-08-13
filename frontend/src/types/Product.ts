export interface Product {
  _id: string
  name: string
  description: string
  price: number
  image: string[] // assuming p_img1 is a string (image URL or path)
  category: string
  subCategory: string
  sizes: string[]
  date: number // timestamp
  bestSeller: boolean
}

export interface CartItem extends AddToCartData {
  quantity: number
}

export interface CartState {
  items: CartItem[]
  totalAmount: number
  totalItems: number
  delivery_fee: number
  total: number
}

export interface AddToCartData {
  _id: string
  name: string
  image: string
  price: number
  size: string
}
