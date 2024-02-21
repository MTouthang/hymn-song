import { ErrorRequestHandler, NextFunction, Request, Response
 } from "express";
import AppError from "../utils/appErr.utils";

const errorMiddleware: ErrorRequestHandler = async(err: AppError, _req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500
  err.message = err.message || "Internal server error" 

    // Wrong MongoDB ID error
    if (err.name === 'CastError') {
      const message = `Resource not found. Invalid ${err.path}`;
      err = new AppError(message, 400);
    }
  
    // Mongoose duplicate key error
    if (err.statusCode === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
      err = new AppError(message, 409);
    }
  
    // Wrong JWT Error
    if (err.name === 'JsonWebTokenError') {
      const message = `Json Web Token is invalid, try again`;
      err = new AppError(message, 400);
    }
  
    // JWT expired Error
    if (err.name === 'TokenExpiredError') {
      const message = `Json Web Token is expired, try again`;
      err = new AppError(message, 401);
    }
  
    if (process.env.NODE_ENV === 'production') {

      res.status(err.statusCode).json({
        success: false,
        message: err.message,
      });
    } else {
      res.status(err.statusCode).json({
        success: false,
        message: err.message,
        stack: err.stack,
      });
    }
}

export default errorMiddleware