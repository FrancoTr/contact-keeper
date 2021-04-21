const express = require('express')


const app = express()

app.get('/', (req, res) => {
    res.json({ msg: 'ContactKeeper API'})
})

const PORT = process.env.PORT || 5000 //first looks for a PORT variable, if not present, uses the localhost port

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`)
})