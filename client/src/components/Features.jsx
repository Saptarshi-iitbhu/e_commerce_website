import React from 'react'
import {LiaShippingFastSolid} from "react-icons/lia"
import{MdCurrencyExchange} from "react-icons/md"
import {BiSupport} from "react-icons/bi"
import{TbPackageImport} from "react-icons/tb"

const Features = () => {
  return (
    <section className='max-padd-container mt-10'>
        <div className='grid grid-cols-2 sm:grid-cols-2 md:gris-cols-3 xl:grid-cols-4 gap-8'>
          <div className='flexCenter gap-x-4'>
            <LiaShippingFastSolid className='text-4xl'/>
            <div>
              <h5 className='medium-15'>Free Ship</h5>
              <p>On above $100 order</p>
            </div>
          </div>
          <div className='flexCenter gap-x-4'>
            <MdCurrencyExchange className='text-4xl'/>
            <div>
              <h5 className='medium-15'>Free Ship</h5>
              <p>Discount for Elite Members</p>
            </div>
          </div>
          <div className='flexCenter gap-x-4'>
            <BiSupport className='text-4xl'/>
            <div>
              <h5 className='medium-15'>Free Ship</h5>
              <p>24/7 Customer Support</p>
            </div>
          </div>
          <div className='flexCenter gap-x-4'>
            <TbPackageImport className='text-4xl'/>
            <div>
              <h5 className='medium-15'>Free Ship</h5>
              <p>14 Days easy returns</p>
            </div>
          </div>
        </div>
    </section>
  )
}

export default Features
