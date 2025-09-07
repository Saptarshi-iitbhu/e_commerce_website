import React from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Categories from '../components/Categories'
import PopularProducts from '../components/PopularProducts'
import Blog from '../components/Blog'
import banner from '../assets/banner.png'

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="px-4 sm:px-6 lg:px-8">
        <Features />
      </section>

      {/* Categories Section */}
      <section className="px-4 sm:px-6 lg:px-8">
        <Categories />
      </section>

      {/* Popular Products */}
      <section className="px-4 sm:px-6 lg:px-8">
        <PopularProducts />
      </section>

      {/* Banner Image */}
      <div className="max-padd-container py-6 sm:py-10 md:py-12 overflow-hidden flex justify-center">
        <img 
          src={banner} 
          alt="bannering" 
          className="rounded w-full max-w-6xl object-cover"
        />
      </div>

      {/* Blog Section */}
      <section className="px-4 sm:px-6 lg:px-8">
        <Blog />
      </section>
    </div>
  )
}

export default Home
