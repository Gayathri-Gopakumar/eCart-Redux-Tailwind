import React from 'react'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    <div style={{height:'200px'}} className='w-full grid grid-cols-3 gap-4 bg-indigo-800 mt-5 mb-0 text-white p-5'>
      
      <div className='mt-5 text-start '>
        <Link className='text-white font-bold m-5 p-3 ' to={'/'}><i className="fa-solid fa-truck-fast me-1"></i>eCart</Link>
        <p >Lorem ipsum dolor sit amet Asperiores obcaecati atque qui fuga. Optio, doloribus. Asperiores obcaecati atque qui fuga. Optio,Saepe impedit eligendi acilis?</p>
      </div>

      <div className='m-5 p-2 text-center'>
        <ul>
          <li>HOME</li>
          <li>SERVICES</li>
          <li>MEMBERSHIPS</li>
          <li>ABOUT US</li>
        </ul>
      </div>

      <div className='m-5 p-2 text-center'>
        <h5>FOLLOW US ON</h5>
        <i class="fa-brands fa-facebook me-1 p-3"></i>
        <i className="fa-brands fa-x-twitter me-1 p-3"></i>
        <i className="fa-brands fa-instagram me-1 p-3"></i>
      </div>
      
    </div>
  )
}

export default Footer