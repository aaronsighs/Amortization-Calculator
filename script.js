

termToggleBtn = document.getElementById("btn-toggle-term-table")


document.getElementById("monthToggleButton").onclick = toggleTableView
document.getElementById("yearToggleButton").onclick = toggleTableView

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








