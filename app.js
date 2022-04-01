const balanceEl = document.querySelector(".balance .value");
const incomeTotalEl = document.querySelector(".income-total")
const outcomeTotalEl = document.querySelector(".outcome-total")
const chartEl = document.querySelector(".chart")

const expenseBtn = document.querySelector(".tab1")
const incomeBtn = document.querySelector(".tab2")
const allBtn = document.querySelector(".tab3")

const expenseEl = document.querySelector("#expense")
const incomeEl = document.querySelector("#income")
const allEl = document.querySelector("#all")

const incomeList = document.querySelector("#income .list");
const expenseList = document.querySelector("#expense .list");
const allList = document.querySelector("#all .list");


const addIncome = document.querySelector(".add-income")
const incomeTitle = document.getElementById("income-title-input")
const incomeAmount = document.getElementById("income-amount-input")


const addExpense = document.querySelector(".add-expense")
const expenseTitle = document.getElementById("expense-title-input")
const expenseAmount = document.getElementById("expense-amount-input")
const expenseCategory = document.getElementById("expense-category")

// CHART FUNCTIONS
Chart.defaults.font.family = 'Montserrat'
const ctx = document.getElementById('myChart');
const pieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Rent/Mortgage', 'Car payment', 'Utilities', 'Food/Groceries', 'Miscellaneous', 'Remaining Income'],
        datasets: [{
            label: 'Expenses',
            data: [],
            backgroundColor: [
                '#f0624d',
                '#188FA7',
                '#33673B',
                '#89B6A5',
                '#4B296B',
                '#fff'
            ],
            borderColor: [
                '#fff',
                '#fff',
                '#fff',
                '#fff',
                '#fff',
                '#fff'
            ],
            borderWidth: 1
        }]
    },
    options: { 
        plugins: { 
            legend: { 
                display: false, 
            },
            tooltip: {
                // bodyFont: {weight: 'bold'},
                padding: 8,
                size: 24,
                cornerRadius: 5,
                displayColors: false,
                
                },
                
            datalabels: {
                display: false,
            },
        },
    }
    
});

console.log(ctx)

let balance = 0, income = 0, outcome = 0
let ENTRY_LIST
const DELETE = "delete", EDIT = "edit" 

ENTRY_LIST = JSON.parse(localStorage.getItem("entry_list")) || [];
updateUI()

console.log(ENTRY_LIST)


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

// ADD ENTRY FUNCTIONS

addIncome.addEventListener("click", function(){
    if(!incomeTitle.value || !incomeAmount.value) return;
    let income = {
        type: "income",
        title: incomeTitle.value,
        amount: parseFloat(incomeAmount.value),
    }

    ENTRY_LIST.push(income)

    updateUI()
    clearInput([incomeTitle, incomeAmount ])
})

addExpense.addEventListener("click", function(){
    if(!expenseTitle.value || !expenseAmount.value) return;
    let expense = {
        type: "expense",
        category: expenseCategory.value,
        title: expenseTitle.value,
        amount: parseFloat(expenseAmount.value),
    }
    ENTRY_LIST.push(expense);

    updateUI()
    clearInput([expenseTitle, expenseAmount, expenseCategory])
})

incomeList.addEventListener("click", deleteOrEdit)
expenseList.addEventListener("click", deleteOrEdit)
allList.addEventListener("click", deleteOrEdit)


function deleteOrEdit(event){
    const targetBtn = event.target
    const entry = targetBtn.parentNode

    if (targetBtn.id == DELETE) {
        deleteEntry(entry);
    } else if (targetBtn.id == EDIT){
        editEntry(entry);
    }
}

function deleteEntry (entry){
    ENTRY_LIST.splice(entry.id, 1) 
    updateUI()
}

function editEntry (entry) {
    let ENTRY = ENTRY_LIST[entry.id]
    
    if (ENTRY.type == "income") {
        incomeAmount.value = ENTRY.amount;
        incomeTitle.value = ENTRY.title; 
    } else if (ENTRY.type == "expense"){
        expenseAmount.value = ENTRY.amount;
        expenseTitle.value = ENTRY.title; 
        expenseCategory.value = ENTRY.category; 
    }
    deleteEntry(entry)
}

// UPDATE TOTALS & CHART FUNCTIONS

function updateUI(){
    income = calculateTotal("income", ENTRY_LIST)
    outcome = calculateTotal("expense" , ENTRY_LIST)
    balance = Math.abs(calculateBalance(income, outcome))
    rentCategory = sortRentArray("Rent/Mortgage", ENTRY_LIST)
    carCategory = sortCarArray("Car payment", ENTRY_LIST)
    utilitiesCategory = sortUtilitiesArray("Utilities", ENTRY_LIST)
    foodCategory = sortFoodArray("Food/Groceries", ENTRY_LIST)
    miscCategory = sortMiscArray("Miscellaneous", ENTRY_LIST)
    remainingIncome = 0

    if (calculateBalance(income, outcome) > 0) {
        remainingIncome = balance
    } else {
        remainingIncome = 0
    }
    

    let sign = (income >= outcome) ? "$" : "-$"

    balanceEl.innerHTML = `<small>${sign}</small>${balance}`
    incomeTotalEl.innerHTML = `<small>$</small>${income}`
    outcomeTotalEl.innerHTML = `<small>$</small>${outcome}`

    clearElement([incomeList, expenseList, allList]);

    ENTRY_LIST.forEach((entry, index) => {
        if(entry.type == "income"){
            showEntry(incomeList, entry.type, entry.title, entry.amount, entry.category, index)
        } else if(entry.type == "expense"){
            showEntry(expenseList, entry.type, entry.title, entry.amount, entry.category, index)
        } 
        showEntry(allList, entry.type, entry.title, entry.amount, index)
    });
    
    pieChart.data.datasets[0].data = [rentCategory, carCategory, utilitiesCategory, foodCategory, miscCategory, remainingIncome]
    pieChart.update(); 
    localStorage.setItem("entry_list", JSON.stringify(ENTRY_LIST))
}

// INDIVIDUAL ENTRIES

function showEntry(list, type, title, amount, category, id){
    const entry = `<li id= "${id}" class = "${type}">
                        <div class = "entry">${title}: $${amount}</div>
                        <div class = "category">${category}</div>
                        <div id="edit"></div>
                        <div id="delete"></div>
                    </li>`;

    const position = "afterbegin";

    list.insertAdjacentHTML(position, entry);
}



function clearElement(elements){
    elements.forEach(element => {
        element.innerHTML = "";
    })
}

function calculateTotal (type, list){
    let sum = 0;
    list.forEach(entry => {
        if(entry.type == type) {
            sum += entry.amount;
        }
    });
    return sum;
}


function sortRentArray(category, list){
    let rentArray = ENTRY_LIST.filter(function(e) {
        return e.category == "Rent/Mortgage"
        
    })
    let sum = 0;
    rentArray.forEach(entry => {
        if(entry.category == category) {
            sum += entry.amount;
        }
    });
    return sum;
    
}
function sortCarArray(category, list){
    let carArray = ENTRY_LIST.filter(function(e) {
        return e.category == "Car payment"
        
    })
    let sum = 0;
    carArray.forEach(entry => {
        if(entry.category == category) {
            sum += entry.amount;
        }
    });
    return sum;
    
}

function sortUtilitiesArray(category, list){
    let utilitiesArray = ENTRY_LIST.filter(function(e) {
        return e.category == "Utilities"
        
    })
    let sum = 0;
    utilitiesArray.forEach(entry => {
        if(entry.category == category) {
            sum += entry.amount;
        }
    });
    return sum;
    
}

function sortFoodArray(category, list){
    let foodArray = ENTRY_LIST.filter(function(e) {
        return e.category == "Food/Groceries"
        
    })
    let sum = 0;
    foodArray.forEach(entry => {
        if(entry.category == category) {
            sum += entry.amount;
        }
    });
    return sum;
    
}

function sortMiscArray(category, list){
    let miscArray = ENTRY_LIST.filter(function(e) {
        return e.category == "Miscellaneous"
        
    })
    let sum = 0;
    miscArray.forEach(entry => {
        if(entry.category == category) {
            sum += entry.amount;
        }
    });
    return sum;
    
}




function calculateBalance (income, outcome){
    return income - outcome;
}



function clearInput (inputs){
    inputs.forEach(input => {
        input.value = ""; 
    })
}


function active(element){
    element.classList.add("active")
}

function show(element){
    element.classList.remove("hide")
}

function hide(elements){
    elements.forEach(element => {
        element.classList.add("hide")
    });
}

function inactive(elements){
    elements.forEach(element => {
        element.classList.remove("active")
    });
}

