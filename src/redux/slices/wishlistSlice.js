import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice=createSlice({
    name:'wishlist',
    initialState:[],
    reducers:{
        // add product to wishlist
        addToWishlist:(state,productByComponentAction)=>{
            state.push(productByComponentAction.payload)
        },
        // remove product from wishlist
        removeWishlistItem:(state,productByComponentAction)=>{
          return  state.filter(item=>item.id!=productByComponentAction.payload)
        }
    }
})

export const {addToWishlist,removeWishlistItem}=wishlistSlice.actions
export default wishlistSlice.reducer