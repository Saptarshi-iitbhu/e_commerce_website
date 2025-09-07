import React, { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import { FaListAlt } from 'react-icons/fa'
import { FaSquarePlus } from 'react-icons/fa6'
import { MdFactCheck } from 'react-icons/md'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { BiLogOut } from 'react-icons/bi'
import toast from 'react-hot-toast'

const Sidebar = () => {
  const { navigate, axios } = useContext(ShopContext)

  const navItems = [
    {
      path: "/admin",
      label: "Add Item",
      icon: <FaSquarePlus />
    },
    {
      path: "/admin/list",
      label: "List",
      icon: <FaListAlt />
    },
    {
      path: "/admin/orders",
      label: "Orders",
      icon: <MdFactCheck />
    },
  ];

  const logout = async ()=>{
    try {
      const {data} = await axios.post('/api/admin/logout')
      if(data.success){
        toast.success(data.message)
        navigate('/')

      }else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="flex">
      {/* Sidebar for large screens */}
      <div className="hidden sm:flex fixed left-0 top-0 h-screen w-64 bg-primary shadow-lg flex-col justify-between p-4">
        {/* Logo */}
        <div>
          <Link
            to={'/admin'}
            className="bold-20 md:bold-24 uppercase font-paci flex items-center gap-1"
          >
            Shopper <span className="text-secondary bold-28">.</span>
          </Link>

          {/* Navigation */}
          <div className="mt-10 flex flex-col gap-y-4">
            {navItems.map((link) => (
              <NavLink
                to={link.path}
                key={link.label}
                end={link.path === '/admin'}
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-x-2 p-3 rounded-lg text-secondary bg-tertiary/20 border-l-4 border-secondary transition"
                    : "flex items-center gap-x-2 p-3 rounded-lg hover:bg-tertiary/10 transition"
                }
              >
                {link.icon}
                <span>{link.label}</span>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Logout */}
        <button onClick={logout} className="flex items-center gap-x-2 p-3 rounded-lg text-red-500 hover:bg-red-100 transition">
          <BiLogOut className="text-lg" />
          <span>Logout</span>
        </button>
      </div>

      {/* Topbar for small screens */}
      <div className="sm:hidden fixed top-0 left-0 w-full bg-primary shadow-md flex flex-col p-3">
        {/* Logo (slightly higher) */}
        <Link
          to={'/admin'}
          className="bold-16 uppercase font-paci flex items-center gap-1 text-dark mb-2"
        >
          Shopper <span className="text-secondary bold-20">.</span>
        </Link>

        {/* Row: nav in center, logout right */}
        <div className="flex items-center justify-between">
          {/* Navigation (center) */}
          <div className="flex-1 flex justify-center gap-6">
            {navItems.map((link) => (
              <NavLink
                to={link.path}
                key={link.label}
                end={link.path === '/admin'}
                className={({ isActive }) =>
                  isActive
                    ? "flex flex-col items-center text-secondary"
                    : "flex flex-col items-center text-dark"
                }
              >
                {link.icon}
                <span className="text-[10px]">{link.label}</span>
              </NavLink>
            ))}
          </div>

          {/* Logout button (right side) */}
          <button className="ml-3 text-red-500 flex flex-col items-center">
            <BiLogOut className="text-lg" />
            <span className="text-[10px]">Logout</span>
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="sm:ml-64 flex-1 p-6 mt-20 sm:mt-0">
        {/* Page content will be injected here */}
        <Outlet />
      </div>
    </div>
  )
}

export default Sidebar
