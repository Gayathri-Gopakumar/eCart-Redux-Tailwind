import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchProduct } from '../redux/slices/productSlice'

const Header = ({insideHome}) => {
  const dispatch=useDispatch()
  const myWishlist=useSelector(state=>state.wishlistReducer)
  const myCart=useSelector(state=>state.cartReducer)
  return (
    <nav className='flex w-full bg-indigo-800 fixed top-0 p-5 items-center'>
      <Link className='text-white font-bold' to={'/'}><i className="fa-solid fa-truck-fast me-1"></i>eCart</Link>
      
      <ul className='flex-1 text-right'>
       { insideHome && <li onChange={e=>dispatch(searchProduct(e.target.value.toLowerCase()))} className='list-none px-5 inline-block'><input style={{width:'300px'}} className='rounded p-1' type="text" placeholder='search products here!' /></li>}
        <li  className='list-none px-5 inline-block text-white  font-bold '><Link  to={'/wishlist'}><i className="fa-solid fa-heart text-red-600 me-2"></i>Wishlist <span className='bg-black rounded p-1'>{myWishlist.length}</span></Link> </li>
        <li  className='list-none px-5 inline-block text-white  font-bold'><Link  to={'/cart'}><i className="fa-solid fa-cart-plus text-green-400 me-2"></i>Cart <span className='bg-black rounded p-1'>{myCart.length}</span></Link> </li>
      </ul>
    </nav>
  )
}

export default Header