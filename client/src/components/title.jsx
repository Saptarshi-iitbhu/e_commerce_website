import React from "react"
import { motion } from "framer-motion"

const Title = ({ 
  title1,
  title2,
  titleStyles = "text-center mb-6",
  title1Styles = "text-3xl font-bold text-gray-900",
  paraStyles = "text-gray-600 mt-2 text-base",
  para,
}) => {
  return (
    <div className={titleStyles}>
      {/* Animated Heading */}
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`${title1Styles} capitalize`}
      >
        {title1}{" "}
        <span className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent font-extrabold underline decoration-2 underline-offset-4">
          {title2}
        </span>
      </motion.h3>

      {/* Animated Paragraph */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className={`${paraStyles} max-w-lg mx-auto`}
      >
        {para
          ? para
          : "Explore our collection of stylish clothing and footwear made for comfort, quality, and everyday confidence."}
      </motion.p>
    </div>
  )
}

export default Title
