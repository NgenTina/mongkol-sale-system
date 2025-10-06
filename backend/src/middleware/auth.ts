import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { ApiResponse } from '../types'

export interface AuthRequest extends Request {
  user?: any
}

export const authenticate = (req: AuthRequest, res: Response<ApiResponse<any>>, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Access denied. No token provided.'
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret')
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({
      success: false,
      error: 'Invalid token.'
    })
  }
}

export const requireRole = (roles: UserRole[]) => {
  return (req: AuthRequest, res: Response<ApiResponse<any>>, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: 'Access denied. Insufficient permissions.'
      })
    }
    next()
  }
}