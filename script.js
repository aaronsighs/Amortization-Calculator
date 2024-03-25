

termToggleBtn = document.getElementById("btn-toggle-term-table")


document.getElementById("monthToggleButton").onclick = toggleTableView
document.getElementById("yearToggleButton").onclick = toggleTableView

document.getElementById("calculate-button").onclick = calculate



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
    document.getElementById("monthly-payment").innerText = "Monthly Payment: $" + monthlyPayment.toFixed(2)
    clearMonthTable()
    addAllRowsToMonthTable(getLoanPrincipal(),getInterestRate(),getLoanTerm())
}

function clearMonthTable(){
    monthTable = document.getElementById("output-table-months")
    while (monthTable.childElementCount!=1) {
        monthTable.removeChild(monthTable.lastChild);
    }
}

function addAllRowsToMonthTable(principal,interestRate,term_months){

    monthlyInterestRate = interestRate / 100  / 12
    monthlyPayment = calculateMonthlyPayment(getLoanPrincipal(),getInterestRate(),getLoanTerm())
    
    balance = principal
    count = 1
    while(balance>0){

        principalInterest = (monthlyInterestRate * balance)
        principalPaid = monthlyPayment - principalInterest
        balance -= principalPaid
        addRowToMonthTable([count,principalInterest.toFixed(2),principalPaid.toFixed(2),balance.toFixed(2)])
        if (count % 12 == 0 && balance>0){
            addRowToMonthTable(["End of Year "+count/12],rowClass="",itemClass="apple",span=1)
        }
        count+=1
        
        

        
    }


}


function addRowToMonthTable(data,rowClass="",itemClass="",span=0){
    monthTable = document.getElementById("output-table-months")

    tableRow = document.createElement("tr")
    rowClass ? tableRow.classList.add(rowClass):""
    data.forEach((element) => {
        tableItem = document.createElement("td")
        tableItem.innerText = element

        if (itemClass){tableItem.classList.add(itemClass)}
        if (span){tableItem.colSpan=10}

        tableRow.appendChild(tableItem)
    })
    monthTable.appendChild(tableRow)
}

function UpdatePieChart(percentInterest){
    piechart = document.getElementsByClassName("piechart")[0]
    background ="conic-gradient(rgba(26, 25, 25, 0.621)"+percentInterest/100*360+"deg,rgba(24, 203, 134, 0.962) 0)a"
    piechart.style.backgroundImage = background =background
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






