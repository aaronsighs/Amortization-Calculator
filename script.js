

termToggleBtn = document.getElementById("btn-toggle-term-table")


document.getElementById("monthToggleButton").onclick = toggleTableView
document.getElementById("yearToggleButton").onclick = toggleTableView

document.getElementById("calculate-button").onclick = calculate

calculate()

function toggleTableView(){
    monthTableView = document.getElementsByClassName("tsc-two")[0]
    yearTableView = document.getElementsByClassName("tsc-one")[0]

    if (monthTableView.classList.contains("hidden")){
        monthTableView.classList.remove("hidden")
        yearTableView.classList.add("hidden")
    }else{
        yearTableView.classList.remove("hidden")
        monthTableView.classList.add("hidden")
    }

}

function calculateMonthlyPayment(principal,interestRate,term_months){
   
    monthlyInterestRate = interestRate / 100  / 12
    monthlyPayment = principal  * monthlyInterestRate * ( 1 + monthlyInterestRate ) ** term_months /  ((1 + monthlyInterestRate ) ** (term_months)-1)
    return monthlyPayment
}


function calculate(){
    if (checkInput().length!=0){return 0}
    monthlyPayment = calculateMonthlyPayment(getLoanPrincipal(),getInterestRate(),getLoanTerm())
    document.getElementById("monthly-payment-value").innerText = "$" + monthlyPayment.toFixed(2)
    clearMonthTable()
    clearYearTable()
    addAllRowsToAllTables(getLoanPrincipal(),getInterestRate(),getLoanTerm())
}

function clearMonthTable(){
    monthTable = document.getElementById("output-table-months")
    clearTable(monthTable)
}

function clearTable(table){
    while (table.childElementCount!=1) {
        table.removeChild(table.lastChild);
    }
}

function clearYearTable(){
    yearTable = document.getElementById("output-table-years")
    clearTable(yearTable)
}


function addAllRowsToMonthTable(principal,interestRate,term_months){

    monthlyInterestRate = interestRate / 100  / 12
    monthlyPayment = calculateMonthlyPayment(getLoanPrincipal(),getInterestRate(),getLoanTerm())
    
    balance = principal
    count = 1
    totalPaid = 0

    while(balance>0){ 

        principalInterest = (monthlyInterestRate * balance)
        principalPaid = monthlyPayment - principalInterest
        balance -= principalPaid
        addRowToMonthTable([count,principalInterest.toFixed(2),principalPaid.toFixed(2),balance.toFixed(2)])
        if (count % 12 == 0 && balance>0){
            addRowToMonthTable(["End of Year "+count/12],rowClass="",itemClass="apple",span=1)
        }
        totalPaid += monthlyPayment

        count+=1
        
        

        
    }
    updateStats(totalPaid,principal)

}


function addAllRowsToAllTables(principal,interestRate,term_months){

    monthlyInterestRate = interestRate / 100  / 12
    monthlyPayment = calculateMonthlyPayment(getLoanPrincipal(),getInterestRate(),getLoanTerm())
    
    balance = principal
    count = 1
    count2 = 1
    totalPaid = 0
    runningInterest = 0 
    runningPrincipal = 0

    while(balance>0){ 
        principalInterest = (monthlyInterestRate * balance)
        principalPaid = monthlyPayment - principalInterest
        balance -= principalPaid
        runningPrincipal += principalPaid
        runningInterest +=  principalInterest
        addRowToMonthTable([count,principalInterest.toFixed(2),principalPaid.toFixed(2),balance.toFixed(2)])
        if (count % 12 == 0 && balance>0){
            addRowToMonthTable(["End of Year "+count/12],rowClass="",itemClass="apple",span=1)
            
        }
        console.log("here")
        if ( count % 12 == 0 || balance==0){
            addRowToYearTable([count2,runningInterest.toFixed(2),runningPrincipal.toFixed(2),balance.toFixed(2)])
            count2+=1
            runningInterest = 0
            runningPrincipal = 0
        }
        totalPaid += monthlyPayment

        count+=1
        
        

        
    }


    updateStats(totalPaid,principal)

}

function updateStats(totalPaid,principal){
    document.getElementById("total-payment-value").innerText = totalPaid.toFixed(2)
    document.getElementById("total-interest-value").innerText = (totalPaid - principal).toFixed(2)
    document.getElementById("total-payments-value").innerText = getLoanTerm()
    console.log(100-(totalPaid - principal)/totalPaid*100)
    UpdatePieChart((totalPaid - principal)/totalPaid*100)
}





function addRowToMonthTable(data,rowClass="",itemClass="",span=0){
    monthTable = document.getElementById("output-table-months")
    addRowToTable(data,monthTable,rowClass,itemClass,span)
    
}
function addRowToYearTable(data,rowClass="",itemClass="",span=0){
    yearTable = document.getElementById("output-table-years")
    addRowToTable(data,yearTable,rowClass,itemClass,span)
    
}

function addRowToTable(data,table,rowClass="",itemClass="",span=0){

    tableRow = document.createElement("tr")
    rowClass ? tableRow.classList.add(rowClass):""
    data.forEach((element) => {
        tableItem = document.createElement("td")
        tableItem.innerText = element

        if (itemClass){tableItem.classList.add(itemClass)}
        if (span){tableItem.colSpan=10}

        tableRow.appendChild(tableItem)
    })
    table.appendChild(tableRow)
    if (table.childElementCount%2==0){
        tableRow.classList.add("odd")
    }else{
        tableRow.classList.add("even")
    }
}

function UpdatePieChart(percentInterest){
    piechart = document.getElementsByClassName("piechart")[0]
    background ="conic-gradient(rgba(26, 25, 25, 0.621)"+percentInterest/100*360+"deg,rgba(24, 203, 134, 0.962) 0)"
    piechart.style.backgroundImage = background
    piechart.classList.remove("hidden")
}

function checkInput(){
    checks = ""
    if (getLoanPrincipal()==0){checks+="A"}
    if (getInterestRate()==0){checks+="B"}
    if (getLoanTerm()==0){checks+="C"}
    return checks

}

function checkInterestRate(){

}
function checkLoanTerm(){
    
}
function checkLoanPrinciple(){
    
}

function getLoanPrincipal(){return document.getElementById("ploan").value}
function getInterestRate(){return document.getElementById("interestRate").value}
function getLoanTerm(){return Number(getLoanYears())*12 + Number(getLoanMonths())}
function getLoanYears(){return document.getElementById("loanyears").value}
function getLoanMonths(){return document.getElementById("loanmonths").value}






