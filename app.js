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

function hide(elementsArray){
    elementsArray.forEach(element => {
        element.classlist.add("hide")
    });
}

function inactive(elementsArray){
    elementsArray.forEach(element => {
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

    clearInput([incomeTitle, incomeAmount])
})

addExpense.addEventListener("click", function(){
    if(!expenseTitle.value || expenseAmount.value) return;
    let expense = {
        type: "expense",
        title: expenseTitle.value,
        amount: parseFloat(expenseAmount.value),
    }
    ENTRY_LIST.push(expense);

    updateUI()
    clearInput([expenseTitle, expenseAmount])
})


// CALCULATE TOTALS FUNCTIONS

function calculateTotal (type, ENTRY_LIST){
    let sum = 0;
    ENTRY_LIST.forEach(entry => {
        if(entry.type == type) {
            sum += entry.amount
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


// UPDATE TOTALS

function updateUI(){
    income = calculateTotal("income", ENTRY_LIST)
    outcome = calculateTotal("expense" , ENTRY_LIST)
    balance = calculateBalance(income, outcome)

    balanceEl.innerHTML = `<small>$</small>${balance}`
    incomeTotalEl.innerHTML = `<small>$</small>${income}`
    outcomeTotalEl.innerHTML = `<small>$</small>${outcome}`

    clearElement([incomeList, expenseList, allList]);

    ENTRY_LIST.forEach( entry => {
        if(entry.type == "income"){
            showEntry(incomeList, entry.type, entry.title, entry.amount, index)
        } else if(entry.type == "expense"){
            showEntry(expenseList, entry.type, entry.title, entry.amount, index)
        } 
        showEntry(allList, entry.type, entry.title, entry.amount, index)
    });




}