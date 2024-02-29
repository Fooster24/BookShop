import express from 'express'
import {PORT,MongoDBURL} from './config.js'
import { MongoClient, ServerApiVersion } from "mongodb"
const app = express()

app.use(express.json())

const client = new MongoClient(MongoDBURL,  {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
    const booksDB = client.db("my BookShop")
    const mybooks = booksDB.collection("booksCollection")

app.listen(PORT,()=> {
    console.log('Server started on port ${PORT 3000}')
})

app.get('/',(reg, res)=> {
   return res.status(200).send("<ch1>Yoo Dawg!/<ch1>")

})

    app.get('/shop',(reg, res)=> {
    return    res.status(232).send("Welcome to booty claping basic")
    
})

app.get('/shop/:id', (reg, res)=> {
    const data = reg.params
    return res.status(232).send(232).send (`<a herf ='/'> Book: ${data.id}</a>`)

})

app.post('/savebook',(req, res)=> {
    const data = req.body
    if (!data.title)
    return res.status(400).send("No title found.")

    if (!data.price)
    return res.status (400).send("No price found.")

    if (!data.author)
    return res.status (400).send("No author found.")


    mybooks.insertOne(data, (error, respones)=>{
        if (error){
            console.log("An error occurred")
            return res.sendStatus(500)
        }
    })
    return res.status(201).send(JSON.stringify(data))

})