const errorMiddleware = (error, req, res, next) => {
    res.status(error.statusCode || 500);
    res.json({ message: error.message });

    // (optional) next
    // to show stack trace of the error: next(error)
    next(error);
  };
  
export default errorMiddleware;