let row= document.getElementsByClassName("hor")
let houses =[]

for (i = 0; i < row.length; i++) {
    let columns = row[i].getElementsByClassName("ver")
    for (let j = 0; j < columns.length; j++) {
        houses.push(columns[j])
    }
}

console.log(houses)
function addEl(element) {
    element.addEventListener("click", function() {
        changeState(element)
    })
}

for (i = 0; i < houses.length; i++) {
    console.log(i)
    addEl(houses[i])
}

function changeState(div){
    if (div.innerText === "x") {
        div.innerText = "o"
    }
    else if (div.innerText === "o") {
        div.innerText = "x"
    }
    else {
        div.innerText = "x"
    }
}
