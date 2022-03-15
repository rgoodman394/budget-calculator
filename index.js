// Bring in the express server and create the application
let express = require('express')
let app = express()

// Use the express router object
let router = express.Router()

// Create a GET 
router.get('/', function(req, res, next) {
    res.send("this is a test")
}) 

// Configure router so that all routes are prefixed with /api/
app.use('/api/', router)

// Create server to listen on port 3000
var server = app.listen(3000, function(){
    console.log('Node server is running on http://localhost:3000...')
})

const balanceEl = document.querySelector(".balance .value");
const incomeTotalEl = document.querySelector(".outcome-total")
const outcomeTotalEl = document.querySelector(".income-total")
const chartEl = document.querySelector(".chart")

const expenseBtn = document.querySelector(".tab1")
const incomeBtn = document.querySelector(".tab2")
const allBtn = document.querySelector(".tab3")

const expenseEl = document.querySelector("#expense")
const incomeEl = document.querySelector("#income")
const allEl = document.querySelector("#all")

const incomeList = document.querySelector("#income .list")
const expenseList = document.querySelector("#expense .list")
const allList = document.querySelector("#all .list")

const addIncome = document.querySelector(".add-income")
const incomeTitle = document.getElementById("income-title-input")
const incomeAmount = document.getElementById("income-amount-input")

const addExpense = document.querySelector(".add-expense")
const expenseTitle = document.getElementById("expense-title-input")
const expenseAmount = document.getElementById("expense-amount-input")
