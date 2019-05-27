import app from './app'

const port = process.env.PORT || 2567

app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`)
})
