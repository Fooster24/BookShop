import express from 'express'
const app = express()

const PORT = 3000

app.use(express.json)

app.listen(PORT,()=> {
    console.log('Server started on port ${PORT 3000}')
})

app.get('/',(reg, res)=> {
    res.status(200).send("<ch1>Yoo Dawg!/<ch1>")

})

    app.get('/shop',(reg, res)=> {
        res.status(232).send("Welcome to booty claping busic")
    
})

app.get('/shop/:id', (reg, res)=> {
    const data = reg.params
    res.status(232).send(232).send (`<a herf ='/'> Book: ${data.id}</a>`)

})