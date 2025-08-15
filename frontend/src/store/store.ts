import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "./slice/shopSlice";
import cartReducer from "./slice/cartSlice";
import userReducer from "./slice/userSlice";

export const store = configureStore({
    reducer: {
        shop: shopReducer,
        cart: cartReducer,
        user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;