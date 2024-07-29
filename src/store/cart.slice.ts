import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
    id: number;
    count: number;
}

export interface CartState {
    items: CartItem[],
    count: number
}

const initialState: CartState = {
    items: [],
    count: 0
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
           
        }
    }
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;