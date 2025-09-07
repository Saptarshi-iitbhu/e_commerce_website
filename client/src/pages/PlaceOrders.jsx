import React, { useContext, useState } from 'react'
import Title from '../components/title'
import { ShopContext } from '../Context/ShopContext'
import CartTotal from '../components/CartTotal'
import toast from 'react-hot-toast'

const PlaceOrders = () => {

  const { navigate, cartItems, setCartItems, products, axios } = useContext(ShopContext)
  const [method, setMethod] = useState ("COD")

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e)=>{
    const name = e.target.name
    const value = e.target.value

    setFormData((data)=> ({...data, [name]:value}))
  };

  const onSubmitHandler = async (e)=>{
    e.preventDefault();

    try {
      let orderItems = []
      for(const itemId in cartItems){
        for(const size in cartItems[itemId]){
          if(cartItems[itemId][size] > 0){
            const itemInfo = structuredClone(
              products.find((product)=> product._id === itemId)
            )
            if(itemInfo){
              itemInfo.size = size
              itemInfo.quantity = cartItems[itemId][size]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      // Convert orderItems to items array for backend
      let items = orderItems.map((item)=>({
        product: item._id,
        quantity: item.quantity,
        size: item.size
      }))

      if(method === "COD"){
        // Place order using COD
        const {data} = await axios.post("/api/order/cod", {items, address:formData})
        if(data.success){
          toast.success(data.message)
          setCartItems({})
          navigate('/my-orders')
      
        }else{
          toast.error(data.message)

        }
      }else{
        const {data} = await axios.post("/api/order/stripe", {items, address: formData})
        if(data.success){
          // setCartItems({})
          window.location.replace(data.url)
          // navigate('/my-orders')

        }else{
          toast.error(data.message)
        }
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='max-padd-container py-16 pt-28 bg-primary'>
      <form onSubmit={onSubmitHandler} className=''>
        <div className='flex flex-col xl:flex-row dap-20 xl:gap-28'>
          {/* LEFT SIDE */}
          <div className='flex flex-[2] flex-col gap-3 text-[95%]'>
            <Title 
              title1={"Delivery"} 
              title2={"Information"} 
              titleStyles={"pb-5"}
            />
            <div className='flex gap-3'>
              <input 
                onChange={onChangeHandler} 
                value={FormData.firstName} 
                type='text' 
                name='firstName' 
                placeholder='First Name' 
                className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2' 
                required
              />
              <input 
                onChange={onChangeHandler} 
                value={FormData.lastName} 
                type='text' 
                name='lastName' 
                placeholder='Last Name' 
                className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2' 
                required
              />
            </div>
              <input 
                onChange={onChangeHandler} 
                value={FormData.email} 
                type='email' 
                name='email' 
                placeholder='E-mail' 
                className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none' 
                required
              />
              <input 
                onChange={onChangeHandler} 
                value={FormData.phone} 
                type='phone' 
                name='phone' 
                placeholder='Phone No.' 
                className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none' 
                required
              />
              <input 
                onChange={onChangeHandler} 
                value={FormData.street} 
                type='street' 
                name='street' 
                placeholder='Street' 
                className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none' 
                required
              />
            <div className='flex gap-3'> 
              <input 
                onChange={onChangeHandler} 
                value={FormData.city} 
                type='city' 
                name='city' 
                placeholder='City' 
                className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2' 
                required
              />
              <input 
                onChange={onChangeHandler} 
                value={FormData.state} 
                type='state' 
                name='state' 
                placeholder='State' 
                className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2' 
                required
              />
            </div>
            <div className='flex gap-3'> 
              <input 
                onChange={onChangeHandler} 
                value={FormData.zipcode} 
                type='zipcode' 
                name='zip Code' 
                placeholder='Zip-code' 
                className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2' 
                required
              />
              <input 
                onChange={onChangeHandler} 
                value={FormData.country} 
                type='country' 
                name='country' 
                placeholder='Country' 
                className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2' 
                required
              />
            </div>
          </div>
          {/* RIGHT SIDE */}
          <div className='felx flex-1 flex-col'>
            <div className='max-w-[360px] w-full bg-white p-5 py-10 max-md:mt-10'>
              <CartTotal method={method} setMethod={setMethod} />
              <button type='submit' className='btn-dark w-ful mt-8'>Proceed to Order</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default PlaceOrders
