import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types/Product';

interface ShopState {
  products: Product[];
  currency: string;
  delivery_fee: number;
}

const initialState: ShopState = {
  products: [],
  currency: '$',
  delivery_fee: 10,
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setCurrency(state, action: PayloadAction<string>) {
      state.currency = action.payload;
    },
    setDeliveryFee(state, action: PayloadAction<number>) {
      state.delivery_fee = action.payload;
    },
  },
});

export const { setCurrency, setDeliveryFee } = shopSlice.actions;
export default shopSlice.reducer;