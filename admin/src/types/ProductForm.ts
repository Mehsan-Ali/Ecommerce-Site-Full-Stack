import { z } from 'zod'
export const productSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().positive('Price must be greater than 0'),
  image: z.array(z.instanceof(File)).min(1, 'At least one image is required'),
  category: z.enum(['men', 'women', 'kid']).refine((value) => value !== undefined, { message: "Select a category" }),
  subCategory: z.enum(["topwear", "bottomwear", "winterwear"])
  .refine(val => val !== undefined, { message: "Select a subcategory" }),
  sizes: z.array(z.string()).min(1, 'Select at least one size'),
  bestSeller: z.boolean(),
  date: z.number()
})

export type ProductFormData = z.infer<typeof productSchema>
