import React from 'react'
import Header from '../components/Header'

import { useDispatch, useSelector } from 'react-redux'
import { removeWishlistItem } from '../redux/slices/wishlistSlice'
import { addToCart } from '../redux/slices/cartSlice'

const Wishlist = () => {
  const myWishlist = useSelector(state => state.wishlistReducer)
  const myCart = useSelector(state => state.cartReducer)

  const dispatch = useDispatch()

  const handleAddToCart = (product) => {
    const existingProduct = myCart?.find(item => item.id === product.id)
    if (existingProduct) {
      // If the item already exists in the cart, increment the quantity
      dispatch(addToCart({ ...product, quantity: existingProduct.quantity + 1 }))
      alert('Product quantity is incrementing!!!')
    } else {
      // If it's a new item in the cart, set initial quantity and total price
      dispatch(addToCart({ ...product, quantity: 1, totalPrice: product.price }))
    }
    dispatch(removeWishlistItem(product.id)) // Remove from wishlist
  }

  return (
    <>
      <Header />
      <div style={{ marginTop: '80px' }} className='container mx-auto px-5'>
        {myWishlist.length > 0 ? (
          <>
            <h1 className='text-red-400 font-bold text-center text-3xl'>Your Wishlist</h1>
            <div className='grid grid-cols-4 gap-4'>
              {myWishlist?.map(product => (
                <div className="rounded border p-3 shadow" key={product?.id}>
                  <img style={{ width: '100%', height: '300px' }} src={product.thumbnail} alt={product?.title} />
                  <div className="text-center">
                    <h3 className='text-xl'>{product.title}</h3>
                    <div className="flex justify-evenly mt-3">
                      <button onClick={() => dispatch(removeWishlistItem(product?.id))} className='text-xl'>
                        <i className='fa-solid fa-heart-circle-xmark text-red-600'></i>
                      </button>
                      <button onClick={() => handleAddToCart(product)} className='text-xl'>
                        <i className='fa-solid fa-cart-plus text-green-600'></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div style={{ height: '70vh' }} className="flex flex-col items-center justify-center w-full">
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-illustration-download-in-svg-png-gif-file-formats--state-no-items-zero-page-added-states-pack-design-development-illustrations-4610092.png" alt="" />
            <h1 className='text-3xl font-bold text-red-600'>Your WISHLIST is empty!</h1>
          </div>
        )}
      </div>
    </>
  )
}

export default Wishlist
