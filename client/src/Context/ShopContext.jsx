import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import axios from "axios"
import Cookies from "js-cookie";

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL

export const ShopContext = createContext()

const ShopContextProvider = ({ children }) => {

  const navigate = useNavigate()
  const delivery_Charges = 10
  const currency = import.meta.env.VITE_CURRENCY
  const [user, setUser] = useState(null) 
  const [products, setProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [showUserLogin, setShowUserLogin] = useState("")
  const [cartItems, setCartItems] = useState({})
  const [isAdmin, setIsAdmin] = useState(false)

  //Fetch all Products
  const fetchProducts = async () => {
    try {
      const {data} = await axios.get('/api/product/list')
      if(data.success){
        setProducts(data.products)
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  };

  // Fetch User
  const fetchUser = async ()=>{
    try {
      const {data} = await axios.get('/api/user/is-auth')
      if(data.success){
        setUser(data.user)
        setCartItems(data.user.cartData)

      }else{
        setUser(null)
        setCartItems({})
      }
  
    } catch (error) {
      setUser(null)
      setCartItems({})
    }
  }

  // Login (handle after login)
  const handleLoginSuccess = async()=>{
    await fetchUser()
    navigate('/')
  }

  // Logout User
  const logoutUser = async()=>{
    try {
      const {data} = await axios.post('/api/user/logout')
      if(data.success){
        toast.success(data.message)
        setUser(null)
        setCartItems({})
        navigate('/')

      }else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  } 

  // Fetch Admin
  const fetchAdmin = async ()=>{
    try {
      const {data} = await axios.get('/api/admin/is-auth')
      setIsAdmin(data.success)

    } catch (error) {
      setIsAdmin(false)
    }
  }

  //Add Product to the Cart
  const addToCart = async(itemId, size)=>{
    if(!size) return toast.error("PLease select a size first")
    let cartData = structuredClone(cartItems)
    cartData[itemId] = cartData[itemId] || {}
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1
    setCartItems(cartData);

    if(user){
      try {
        const {data} = await axios.post("/api/cart/add", {itemId, size})
        if(data.success){
          toast.success(data.message)
        }else{
          toast.message(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }
  };

  //Get Cart Count
  const getCartCount =()=>{
    let count = 0
    for(const itemId in cartItems){
      for(const size in cartItems[itemId]){
        count += cartItems[itemId][size]
      }
    }
    return count
  };

  //Get Cart Amount
  const getCartAmount =()=>{
    let total = 0
    for(const itemId in cartItems){
      const product = products.find((p)=> p._id === itemId)
      if(!product) continue;
      for(const size in cartItems[itemId]){
        total += product.offerPrice * cartItems[itemId][size]
      }
    }
    return total
  };

  //update Cart Qualtity
  const updateQuatity = async(itemId, size, quantity)=>{
    let cartData = structuredClone(cartItems)
    cartData[itemId][size] = quantity
    setCartItems(cartData)

    if(user){
      try {
        const {data} = await axios.post('/api/cart/update', {itemId, size, quantity})
        if(data.success){
          toast.success(data.message)
        }else{
          toast.message(data.message)
        }

      } catch (error) {
        toast.error(error.message)
      }
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchAdmin()
    fetchUser()
  }, []);

  const value = {
    fetchProducts,
    fetchAdmin,
    fetchUser,
    navigate,
    user,
    setUser,
    products,
    searchQuery,
    setSearchQuery,
    currency,
    showUserLogin,
    setShowUserLogin,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    getCartAmount,
    updateQuatity,
    delivery_Charges,
    isAdmin,
    setIsAdmin,
    axios,
    handleLoginSuccess,
    logoutUser
  }

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider
