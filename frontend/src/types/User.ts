export interface User {
  _id: string
  name: string
  email: string
  cartData: Record<string, unknown>
  createdAt: string
  updatedAt: string

}

export interface UserState {
  user: User | null;
  token: string | null;
}