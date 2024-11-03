import 'dotenv/config'
import express from 'express'

const app = express()
const port = process.env.PORT || 3000

//taking data whatever comes in form of express.json
//add a new tea
app.use(express.json())

let teaData = []
let nextId = 1

//save data using post
app.post('/teas', (req, res) => {
    console.log("POST")
    const {name, price} = req.body
    const newTea = {id: nextId++, name, price}
    teaData.push(newTea)
    res.status(201).send(newTea)
})

//get all tea
app.get('/teas', (req,res) => {
    res.status(200).send(teaData)
})


//get a tea with id
app.get('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if (!tea){
        return res.status(404).send('Tea not found')
    }
    res.status(200).send(tea)
})

//update tea
app.put('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if (!tea){
        return res.status(404).send('Tea not found')
    }
    const {name, price} = req.body
    tea.name = name
    tea.price = price
    res.send(200).send(tea)
})

//delete tea

app.delete('/teas/:id', (req, res) => {
    teaData.findIndex(t => t.id === parseInt(req.params.id))
    if (index === -1) {
        return res.status(404).send('tea not found')
    }
    teaData.splice(index, 1)
    return res.status(204).send('deleted')
})

// app.get("/", (req,res) => {
//     res.send("hello from sid")
// })

// app.get("/ice-tea", (req,res) => {
//     res.send("hello from ice tea")
// })


// app.get("/twitter", (req,res) => {
//     res.send("seeedart")
// })

app.listen(port, () => {
    console.log(`Server is running at port: ${port}...`)
})