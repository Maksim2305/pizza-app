import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadState } from './storage';

export const  CART_PERSISTENT_STATE = 'cartData';

interface CartItem {
    id: number;
    count: number;
}

export interface CartState {
    items: CartItem[],
    count: number,
    isOrderPlaced: boolean
}

const initialState: CartState = {
    items: loadState<CartState>(CART_PERSISTENT_STATE)?.items ?? [],
    count: 0,
    isOrderPlaced: false
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<number>) => {
            const existed = state.items.find(i => i.id === action.payload);
            if (!existed) {
                state.items.push({ id: action.payload, count: 1 });
            } else {
                state.items = state.items.filter(i => i.id !== action.payload);
            }
           
        }, 
        remove: (state, action: PayloadAction<number>) => {
            console.log(state, action);
            state.items = state.items.filter(i => i.id !== action.payload);
        },
        clear: (state) => {
            state.items = [];
            state.count = 0;
        },
        setOrderPlaced(state, action: PayloadAction<boolean>) {
            state.isOrderPlaced = action.payload;
        }
    }
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;