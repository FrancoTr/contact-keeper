const express = require('express')
const connectDB = require('./config/db')


const app = express()

// Connect Database
connectDB()

app.get('/', (req, res) => {
    res.json({ msg: 'ContactKeeper API'})
})


// Routes
app.use('/api/users', require('./routes/users'))  //whenever some hits a specific endpoint, it will require its specific route file
app.use('/api/auth', require('./routes/auth')) 
app.use('/api/contacts', require('./routes/contacts'))

const PORT = process.env.PORT || 5000 //first looks for a PORT variable, if not present, uses the localhost port

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`)
})