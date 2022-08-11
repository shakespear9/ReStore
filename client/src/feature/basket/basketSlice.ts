import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Basket, BasketItem } from "../../app/models/basket";

interface BasketState { 
    basket: Basket | null;
    status: string;

}

const initialState :BasketState = {
    basket: null,
    status:'idle'
}

type PickAddBasket = Pick<BasketItem, "productId" | "quantity">


// first Generic is Return type, second Generic is parameter type in 2nd parameter
export const addBasketItemAsync = createAsyncThunk<Basket, PickAddBasket>(
    'basket/addBasketItemAsync',
    async ({productId, quantity}) => {
        try {
            return await agent.Basket.addItem(productId, quantity)
        } catch (error) {
            console.log(error)
        }
    }

)

export const basketSlice = createSlice({
    name:"basket",
    initialState,
    reducers:{
        setBasket: (state, action) => {
            state.basket = action.payload
        }, 
        removeItem: (state, action) => {
            const {productId, quantity} = action.payload;
            const itemIndex = state.basket?.items.findIndex(i => i.productId === productId);
            if (itemIndex === -1 || itemIndex === undefined) return;
            state.basket!.items[itemIndex].quantity -= quantity;
            if (state.basket!.items[itemIndex].quantity === 0 ) state.basket?.items.splice(itemIndex, 1)
        }
    },
    extraReducers:(builder => { 
        builder.addCase(addBasketItemAsync.pending, (state,action) => {
            console.log(action);
            state.status = 'pedingAddItem';
        });
        builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
            state.basket = action.payload;
            state.status = 'idle';
        })
        builder.addCase(addBasketItemAsync.rejected, (state) =>  {
            state.status = 'idle';
        })
    })
})

export const {setBasket, removeItem } = basketSlice.actions;