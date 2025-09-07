import cookieParser from 'cookie-parser'
import 'dotenv/config'
import express from "express"
import cors from "cors"
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'
import adminRouter from './routes/adminRoute.js'
import connectCloudinary from './config/cloudinary.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import { stripeWebhooks } from './controllers/orderController.js'


const app = express()
const port = process.env.PORT || 4000

await connectDB(); // Establish connection to the Database
await connectCloudinary(); // Setup Cloudinary for image storage

//Allow multiple origins
const allowedOrigins = ['http://localhost:5173']

app.post('/stripe', express.raw({type: 'application/json'}), stripeWebhooks)

//Middleware Setup
app.use(express.json()) // Enables JSON request body parsing
app.use(cookieParser()) // Cookie-parser middleware to parse HTTP request cookies
app.use(cors({
    origin: allowedOrigins, // whitelist of allowed domains
    credentials: true //Required for cookies/ authorizarion headers
}))

//Define APIs
app.use('/api/user', userRouter) //Routes for user-related operations
app.use('/api/admin', adminRouter) //Routes for admin-related operations
app.use('/api/product', productRouter) //Routes for admin-related operations
app.use('/api/cart', cartRouter) //Routes for cart-related operations
app.use('/api/order', orderRouter ) //Routes for order-related operations

// Root endpoint to check API status
app.get("/", (req, res) => {
  res.send("API successfully connected!")
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
