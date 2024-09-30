import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts } from '../redux/slices/productSlice'

const Home = () => {
  const dispatch= useDispatch()
 const {allProducts,loading,error}= useSelector(state=>state.productReducer)
//  console.log(allProducts);
 
const [currentPage,setcurrentPage]=useState(1)
const productPerPage=8
const totalPages=Math.ceil(allProducts?.length/productPerPage)
const currentPageLastProductIndex=currentPage*productPerPage
const currentPageStartProductIndex=currentPageLastProductIndex-productPerPage
const visibleProductsCard=allProducts?.slice(currentPageStartProductIndex,currentPageLastProductIndex)

  useEffect(()=>{
    dispatch(fetchAllProducts())
  },[])

  const navigateToNextPage=()=>{
    if(currentPage!=totalPages){
      setcurrentPage(currentPage+1)
    }
  }
  const navigateToPrevPage=()=>{
    if(currentPage!=1){
      setcurrentPage(currentPage-1)
    }
  }

  return (
    <>
      <Header insideHome={true}/>
      <div style={{marginTop:'80px'}} className='container mx-auto px-5'>
        {
         loading? 
          <div style={{height:'60vh'}} className="flex justify-center items-center font-bold">
            <img height={'90px'} width={'90px'} src="https://i.pinimg.com/originals/b2/d4/b2/b2d4b2c0f0ff6c95b0d6021a430beda4.gif" alt="" />
            <h5 className='text-red-600'>LOADING...</h5>
          </div>
          :
          <>
            <div className='grid grid-cols-4 gap-4'>
            {
              allProducts.length > 0 ?
              visibleProductsCard?.map(product=>(
                <div key={product?.id} className="rounded border p-3 shadow">
                    <img style={{width:'100%',height:'300px'}} src={product.thumbnail} alt="" />
                    <div className="text-center">
                      <h3 className='text-xl'>{product.title}</h3>
                      <Link className='bg-indigo-700 text-white p-1 inline-block rounded' to={`/${product?.id}/view`}>View Details</Link>
                    </div>
                </div>
  
              ))
              :
              <div className="font-bold text-center mt-5 mb-5 text-red-600">
                Product not found....
              </div>
            }
            </div>
            {/* pagination */}
            <div className="flex justify-center items-center mt-5 mb-5">
                <span><i onClick={navigateToPrevPage} style={{cursor:'pointer'}} className='fa-solid fa-backward me-5 text-red-600'></i></span>
                <span className='font-bold'>{currentPage} of {totalPages}</span>
                <span><i onClick={navigateToNextPage} style={{cursor:'pointer'}} className='fa-solid fa-forward ms-5  text-red-600'></i></span>
            </div>
          </>
        }
      </div>
    </>
  )
}

export default Home
