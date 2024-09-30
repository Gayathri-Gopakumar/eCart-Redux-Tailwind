import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { decQuantity, emptyCart, incQuantity, removeCartItem } from '../redux/slices/cartSlice'

const Cart = () => {
  const dispatch = useDispatch()
  const myCart = useSelector(state => state.cartReducer)
  const navigate = useNavigate()
  const [cartTotal, setCartTotal] = useState(0)

  useEffect(() => {
    if (myCart.length > 0) {
      // Calculate total price for each item (price * quantity)
      setCartTotal(
        myCart
          .map(item => item.price * item.quantity)
          .reduce((a, b) => a + b, 0)
      )
    }
  }, [myCart])

  const handleDecrementProduct = (product) => {
    if (product.quantity > 1) {
      dispatch(decQuantity(product.id))
    } else {
      dispatch(removeCartItem(product.id))
    }
  }

  const handleCheckOut = () => {
    dispatch(emptyCart())
    alert('Order Placed successfully')
    navigate('/')
  }

  return (
    <>
      <Header />
      <div style={{ marginTop: '100px' }} className='container mx-auto px-4'>
        {myCart.length > 0 ? (
          <>
            <h1 className='font-bold text-3xl text-green-500'>Cart Summary</h1>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 border rounded p-5 shadow mt-5">
                <table className='table-auto w-full'>
                  <thead>
                    <tr>
                      <td className='font-semibold'>#</td>
                      <td className='font-semibold'>Name</td>
                      <td className='font-semibold'>Image</td>
                      <td className='font-semibold'>Quantity</td>
                      <td className='font-semibold'>Price</td>
                      <td className='font-semibold'>...</td>
                    </tr>
                  </thead>
                  <tbody>
                    {myCart?.map((product, index) => (
                      <tr key={product?.id}>
                        <td>{index + 1}</td>
                        <td>{product?.title}</td>
                        <td>
                          <img style={{ width: '70px', height: '70px' }} src={product?.thumbnail} alt={product?.title} />
                        </td>
                        <td>
                          <div className="flex">
                            <button onClick={() => handleDecrementProduct(product)} className='font-bold'>-</button>
                            <input style={{ width: '40px' }} className='border rounded p-1 me-2 ms-2' value={product?.quantity} type="text" readOnly />
                            <button onClick={() => dispatch(incQuantity(product?.id))} className='font-bold'>+</button>
                          </div>
                        </td>
                        <td>${product?.price * product?.quantity}</td>
                        <td>
                          <button onClick={() => dispatch(removeCartItem(product?.id))}>
                            <i className='fa-solid fa-trash text-red-600'></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="float-right mt-4">
                  <button onClick={() => dispatch(emptyCart())} className='bg-red-500 text-white p-3 me-3 rounded '>EMPTY CART</button>
                  <Link to={'/'} className='bg-green-500 text-white p-3 me-3 rounded '>SHOP MORE</Link>
                </div>
              </div>
              <div style={{ height: '200px' }} className="border rounded shadow p-5">
                <h1 className="text-2xl font-bold">TOTAL AMOUNT: <span className='text-red-700'>${cartTotal}</span></h1>
                <hr />
                <button onClick={handleCheckOut} className="w-full bg-green-600 rounded p-5 text-white font-bold mt-5 text-2xl">CHECKOUT</button>
              </div>
            </div>
          </>
        ) : (
          <div style={{ height: '70vh' }} className="flex flex-col items-center justify-center w-full">
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-illustration-download-in-svg-png-gif-file-formats--state-no-items-zero-page-added-states-pack-design-development-illustrations-4610092.png" alt="" />
            <h1 className='text-3xl font-bold text-red-600'>Your cart is empty!</h1>
          </div>
        )}
      </div>
    </>
  )
}

export default Cart
