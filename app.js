import express from 'express'
import {PORT,MongoDBURL} from './config.js'
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb"
const app = express()

app.use(express.json())

const client = new MongoClient(MongoDBURL,  {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
    const booksDB = client.db("myBookShop")
    const mybooks = booksDB.collection("booksCollection")

app.listen(PORT,()=> {
    console.log(`Server started on port ${PORT}`)
})

app.get('/',(req, res)=> {
   return res.status(200).send("<ch1>Yoo Dawg!/<ch1>")

})

    app.get('/shop',(req, res)=> {
    //return    res.status(232).send("Welcome to booty claping basic")
    mybooks.find().toArray()
    .then(response=>{
        //console.log(response)
        res.status(200).send(response)
    })
    
})

app.get('/shop/:id', (req, res)=> {
    //route ahow specific book
    const data = req.params

    const filter = {
        "_id": new ObjectId(data.id)
    }

    mybooks.findOne()
    .then(response=>{
        //console.log(response)
        res.status(200).send(response)

    })
    .catch(err=>console.log(err))
    //return res.status(232).send(232).send (`<a herf ='/'> Book: ${data.id}</a>`)

})

app.post('/admin/savebook',(req, res)=> {
    // route adds a new book
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

app.delete('/admin/remove/:id', (req, res)=>{
    const data = req.params
    
    const filter = {
        "_id": new ObjectId(data.id)
    }

    mybooks.deleteOne(filter)
    .then(response=>{
        //console.log(response)
        res.status(200).send(response)

    })
    .catch(err=>console.log(err))
})

app.put('/admin/update/:id/', (req,res)=>{
    const docData = req.body
    const data = req.params
    const filter = {
        "_id": new ObjectId(data.id)
    }
    
    const updDoc = {
        $set: {
            ...docData //docData.price, docData.cover
            
        }
    }
    mybooks.updateOne(filter, updDoc)
    .then(response=>{
        res.status(200).send(response)  
     })
     .catch(err=>console.log(err))
})

