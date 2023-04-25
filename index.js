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


app.get("/", (req, res) => {//testing
    Customer.find((err, customers)=> {
        console.log("Customers: ", customers)
        res.json(customers)
    })
}
)

app.post("/post",(req, res) => {//Post Req, make new customer

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


app.put("/update/:id", (req, res) => { //Put req, find a customer and update their record
    Customer.findByIdAndUpdate(req.params.id, {
        name : req.body.name,
        ticketNumber : req.body.ticketNumber,
        address : req.body.address,
        date : req.body.date
    }, { new: true }, (err, customer) => {
        if (err) return res.status(500).send(err);
        return res.send(customer);
    });
})

app.delete("/delete/:id", (req, res) => {
    Customer.findByIdAndRemove(req.params.id, (err, customer) => {
        if (err) return res.status(500).send(err);
        return res.send(customer);
    });
});



app.listen(port, ()=>{
    console.log(`Listening on port: ${port}`)
})
 
