export = {
  notFound(req: any, res: any, next: any) {
    res.status(404)
    const error = new Error(`Not Found - ${req.originalUrl}`)
    next(error)
  },

  errorHandler(err: any, req: any, res: any, next: any) {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500
    res.status(statusCode)
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? 'Please change to dev mode to trace the error.' : err.stack,
    })
  },
}
