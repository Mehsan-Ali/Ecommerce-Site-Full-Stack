import { z } from 'zod'

export const orderFormSchema = z.object({
  firstName: z.string().min(3, 'Name must be at least 3 characters'),
  lastName: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.email('Invalid email address'),
  address: z.string().min(10, 'Address must be at least 10 characters'),
  city: z.string().min(3, 'City must be at least 3 characters'),
  state: z.string().min(3, 'State must be at least 3 characters'),
  zipCode: z.string().min(3, 'Zip Code must be at least 3 characters'),
  country: z.string().min(3, 'Country must be at least 3 characters'),
  phoneNumber: z.string().min(11, 'Phone Number must be at least 11 characters')
})

export type OrderFormData = z.infer<typeof orderFormSchema>
