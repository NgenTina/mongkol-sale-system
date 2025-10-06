import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import dotenv from 'dotenv'

// Import routes
import authRoutes from './routes/auth'
import productRoutes from './routes/products'
import saleRoutes from './routes/sales'
import dashboardRoutes from './routes/dashboard'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(helmet())
app.use(compression())
app.use(cors())
app.use(express.json())

// Public routes
app.use('/api/auth', authRoutes)

// Protected routes
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/products', productRoutes) // These will have auth middleware
app.use('/api/sales', saleRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Staff Management Backend is running!',
    timestamp: new Date().toISOString()
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Staff Management Backend running on http://localhost:${PORT}`)
})