import React from 'react'

const ProductDescriptions = () => {
  return (
    <div className='mt-14 bg-white'>
        <div className='flex gap-3'>
            <button 
            className='medium-14 p-3 w-32 border-b-2 border-secondary'>
                Description
            </button>
            <button 
            className='medium-14 p-3 w-32'>
                Color Guide
            </button>
            <button 
            className='medium-14 p-3 w-32'>
                Size Guide
            </button>
        </div> 
        <hr className='h-[1px] w-full'/>
        <div className='flex flex-col gap-3 p-3'>
            <div>
                <h5 className='h5'>Detail</h5>
                <p className='text-sm'>
                    Crafted with premium quality materials, this product offers both durability and comfort. 
                    Designed with a modern aesthetic, it’s perfect for daily use while maintaining a stylish look. 
                    Easy to care for and made to last, this item is a must-have addition to your collection.
                </p>
                <p className='text-sm'>
                    Whether you're dressing up for an occasion or keeping it casual, 
                    this piece adapts effortlessly to your style. 
                    Available in multiple sizes and colors to suit your preference, 
                    it ensures both functionality and elegance.
                </p>
            </div>
            <div>
                <h5 className='h5'>Benefit</h5>
                <ul className='list-disc pl-5 text-sm text-gray-30 flex flex-col gap-1'>
                    <li>High-quality materials ensure long-lasting durability and comfort</li>
                    <li>Designed to meet the needs of mordern, active lifestyles.</li>
                    <li>Available in a wide range of colors and trendy colors</li>
                </ul>
            </div>
        </div>     
    </div>
  )
}

export default ProductDescriptions
