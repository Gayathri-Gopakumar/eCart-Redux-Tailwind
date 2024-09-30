import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToWishlist } from '../redux/slices/wishlistSlice'
import {addToCart} from '../redux/slices/cartSlice'

const View = () => {
  const myCart=useSelector(state=>state.cartReducer)
  const myWishlist= useSelector(state=>state.wishlistReducer)
  const dispatch=useDispatch()
  const [product,setProduct]=useState({})
  // id is the path parameter name we gave when we set the path using route in app.jsx
const {id}=useParams()
console.log(id);

useEffect(()=>{
 if(sessionStorage.getItem("allProducts")){
  const allProducts=JSON.parse(sessionStorage.getItem("allProducts"))
  setProduct(allProducts.find(item=>item.id==id))

 }
},[])
// console.log(product);
const handleWishlist=(product)=>{
  if(myWishlist?.includes(product)){
    alert('Product already in your wishlist!!!')
  }
  else{
    // add product
    dispatch(addToWishlist(product))
  }
}

  const handleAddToCart=(product)=>{
    const existingProduct=myCart?.find(item=>item.id==product.id)
    if(existingProduct){
      dispatch(addToCart(product))
      alert('Product quantity is incrementing!!!')
    }
    else{
      dispatch(addToCart(product))

    }
  }
  return (
    <>
      <Header/>
      <div style={{height:'80vh'}} className="flex justify-center items-center mt-5">
        <div className='grid grid-cols-2 items-center'>
          <img style={{width:'90%',height:'400px'}} src={product.thumbnail} alt="" />
          <div>
            <h3 className='font-semibold'>PID:{product.id}</h3>
            <h1 className='text-3xl text-red-800 font-semibold'>{product.title}</h1>
            <h4 className='text-xl text-blue-800 font-bold'>${product.price}</h4>
            <p><span className='font-bold'>Description:</span>{product.description}</p>
            <div className="flex justify-between mt-5 me-3">
              <button onClick={()=>handleWishlist(product)} className='text-white bg-red-500 p-2 rounded'>Add to Wishlist</button>
              <button onClick={()=>handleAddToCart(product)} className='text-white bg-green-500 p-2 rounded'>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default View