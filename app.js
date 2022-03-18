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

let balance = 0, income = 0, outcome = 0
const DELETE = "delete", EDIT = "edit" 


// SHOW/HIDE FUNCTIONS FOR DASHBOARD UI

expenseBtn.addEventListener('click', function(){
    active(expenseBtn);
    inactive([incomeBtn, allBtn]);
    show(expenseEl);
    hide([incomeEl, allEl])
})

incomeBtn.addEventListener('click', function(){
    active(incomeBtn);
    inactive([expenseBtn, allBtn]);
    show(incomeEl);
    hide([expenseEl, allEl])
})

allBtn.addEventListener('click', function(){
    active(allBtn);
    inactive([incomeBtn, expenseBtn]);
    show(allEl);
    hide([incomeEl, expenseEl])
})

function active(element){
    element.classlist.add("active")
}

function show(element){
    element.classlist.remove("hide")
}

function hide(elements){
    elements.forEach(element => {
        element.classlist.add("hide")
    });
}

function inactive(elements){
    elements.forEach(element => {
        element.classlist.remove("active")
    });
}


// ADD ENTRY FUNCTIONS

let ENTRY_LIST = [];

addIncome.addEventListener("click", function(){
    if(!incomeTitle.value || incomeAmount.value) return;
    let income = {
        type: "income",
        title: incomeTitle.value,
        amount: parseFloat(incomeAmount.value),
    }

    ENTRY_LIST.push(income)

    updateUI()
    clearInput([incomeTitle.value, incomeAmount.value])
})

addExpense.addEventListener("click", function(){
    if(!expenseTitle.value || !expenseAmount.value) return;
    let expense = {
        type: "expense",
        title: expenseTitle.value,
        amount: parseFloat(expenseAmount.value),
    }
    ENTRY_LIST.push(expense);

    updateUI()
    clearInput([expenseTitle.value, expenseAmount.value])
})


// CALCULATE TOTALS FUNCTIONS

function calculateTotal (type, ENTRY_LIST){
    let sum = 0;
    ENTRY_LIST.forEach(entry => {
        if(entry.type == type) {
            sum += entry.amount;
        }
    });
    return sum;
}

function calculateBalance (income, outcome){
    return income - outcome;
}

income = calculateTotal("income", ENTRY_LIST);
outcome = calculateTotal("expense", ENTRY_LIST);
balance = calculateBalance(income, outcome);


// INDIVIDUAL ENTRIES

function showEntry(list, type, title, amount, id){
    const entry = `<li id= "${id}" class = "${type}">
                        <div class = "entry">${title}: $${amount}</div>
                        <div id="edit"></div>
                        <div id="delete"></div>
                    </li>`

    const position = "afterbegin";

    list.insertAdjacentHTML(position, entry)
}


// UPDATE TOTALS & CHART FUNCTIONS

function updateUI(){
    income = calculateTotal("income", ENTRY_LIST)
    outcome = calculateTotal("expense" , ENTRY_LIST)
    balance = math.abs(calculateBalance(income, outcome))

    let sign = (income >= outcome) ? "$" : "-$"

    balanceEl.innerHTML = `<small>${sign}</small>${balance}`
    incomeTotalEl.innerHTML = `<small>${sign}</small>${income}`
    outcomeTotalEl.innerHTML = `<small>${sign}</small>${outcome}`

    clearElement([incomeList, expenseList, allList]);

    ENTRY_LIST.forEach( entry , index => {
        if(entry.type == "income"){
            showEntry(incomeList, entry.type, entry.title, entry.amount, index)
        } else if(entry.type == "expense"){
            showEntry(expenseList, entry.type, entry.title, entry.amount, index)
        } 
        showEntry(allList, entry.type, entry.title, entry.amount, index)
    });

    updateChart(income, outcome)
}

function clearInput (inputs){
    inputs.forEach(input => {
        input.value = ""; 
    })
}

function clearElement(elements){
     elements.forEach(element => {
         element.innerHTML = "";
     })
}

updateChart //need to insert chart.js functions here


function deleteEntry (ENTRY){
    ENTRY_LIST.splice(ENTRY.id , 1) 
    updateUI()
}

function editEntry (ENTRY) {
    let entry = ENTRY_LIST[ENTRY.id]
    
    if (entry.type == "income") {
        incomeAmount.value = entry.amount;
        incomeTitle.value = entry.title; 
    } else if (entry.type =="expense"){
        expenseAmount.value = entry.amount;
        expenseTitle.value = entry.title;  
    }
    deleteEntry(ENTRY)
}

incomeList.addEventListener("click", deleteOrEdit)
expenseList.addEventListener("click", deleteOrEdit)
allList.addEventListener("click", deleteOrEdit)

function deleteOrEdit(event){
    const targetBtn = event.target
    const ENTRY = targetBtn.parentNode

    if (targetBtn.id == "delete") {
        deleteEntry(ENTRY);
    } else if (targetBtn.id == "edit"){
        editEntry(ENTRY);
    }
}

// SAVE DATA IN LOCAL STORAGE

