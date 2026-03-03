class ErrorHandler extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export default ErrorHandler;
  
  export const errorMiddleware = (err, req, res, next) => {
    let message = err.message || "Internal Server Error";
    let statusCode = err.statusCode || 500;
  
    // 🔴 PostgreSQL Errors
  
    // Unique constraint violation
    if (err.code === "23505") {
      const field = err.detail?.match(/\((.*?)\)/)?.[1];
      message = field
        ? `${field} already exists.`
        : "Duplicate value. This record already exists.";
      statusCode = 400;
    }
  
    // Foreign key violation
    if (err.code === "23503") {
      message = "Invalid reference. Related record does not exist.";
      statusCode = 400;
    }
  
    // Not null violation
    if (err.code === "23502") {
      message = "Required field is missing.";
      statusCode = 400;
    }
  
    // Invalid UUID / invalid input syntax
    if (err.code === "22P02") {
      message = "Invalid input format.";
      statusCode = 400;
    }
  
    // 🔐 JWT Errors
    if (err.name === "JsonWebTokenError") {
      message = "Invalid token. Please log in again.";
      statusCode = 401;
    }
  
    if (err.name === "TokenExpiredError") {
      message = "Your token has expired. Please log in again.";
      statusCode = 401;
    }
  
    res.status(statusCode).json({
      success: false,
      message,
    });
  };