import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "./slice/shopSlice";
import cartReducer from "./slice/cartSlice";

export const store = configureStore({
    reducer: {
        shop: shopReducer,
        cart: cartReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;