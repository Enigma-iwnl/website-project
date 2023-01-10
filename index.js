const express = require("express")
var bodyParser = require("body-parser")
const mongoose = require('mongoose')

const mongoDB = 'mongodb://127.0.0.1:27017'
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const app = express()

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

const port = 1337

/*const ar = [
    {name : "JENSENG", job : "yob"},
    {name : "Sam", job : "yes"}
]*/

const schema = new mongoose.Schema({
    name : String,
    ticketNumber : Number,
    address : String,
    date : String
})

const Customer = mongoose.model('Person', schema)


app.get("/", (req, res) => {
    Customer.find((err, customers)=> {
        console.log("Customers: ", customers)
        res.json(customers)
    })
}
)

app.post("/post",(req, res) => {

    console.log("POSTING: ")

    const customer = new Customer({
        name : req.body.name,
        ticketNumber : req.body.ticketNumber,
        address : req.body.address,
        date : req.body.date
    })
    
    customer.save((err)=>{
        res.json(customer)
    })

})

app.listen(port, ()=>{
    console.log(`Listening on port: ${port}`)
})
 
