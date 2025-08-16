import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "./slice/shopSlice";
import cartReducer from "./slice/cartSlice";
import userReducer from "./slice/userSlice";
import orderReducer from "./slice/orderSlice";

export const store = configureStore({
    reducer: {
        shop: shopReducer,
        cart: cartReducer,
        user: userReducer,
        orders: orderReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;