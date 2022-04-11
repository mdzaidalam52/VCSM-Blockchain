// import npm packages
const express = require('express')

// import routes
// const route = require('./routes/route')

// express middlewares
const app = express()
app.use(express.json())

// express routes
// eg: app.use('/route', route)


// Listening to the server on port 5000
app.listen(5000, () => {
    console.log('Server is running at port 5000')
})