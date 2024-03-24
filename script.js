

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






