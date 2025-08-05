export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string[]; // assuming p_img1 is a string (image URL or path)
  category: string;
  subCategory: string;
  sizes: string[];
  date: number; // timestamp
  bestseller: boolean;
}
