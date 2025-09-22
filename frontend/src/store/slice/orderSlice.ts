import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface OrderState {
    orders: any[];
    isLoading: boolean;
    error: string | null;
}

const initialState: OrderState = {
    orders: [],
    isLoading: false,
    error: null
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrders: (state, action: PayloadAction<any[]>) => {
            state.orders = action.payload
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
        }
    }
})

export const { setOrders, setLoading, setError } = orderSlice.actions
export default orderSlice.reducer