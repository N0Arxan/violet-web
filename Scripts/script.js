
function recordDivs(){
    const houses =[]
    let row= document.getElementsByClassName("hor");
    for (let i = 0; i < row.length; i++) {
        let columns = row[i].getElementsByClassName("ver");
        for (let j = 0; j < columns.length; j++) {
            houses.push(columns[j])
        }
    }
    return houses;
}

function appendEventL(houses) { // add event listener to every div of array Houses
    for (let i = 0; i < houses.length; i++) {
        addEventL(houses[i])
    }
}
appendEventL(recordDivs())


let turn = "x";


function changeState(div,turn){
    //while(true){
        if (div.innerText === turn) {
            console.log("invalid input")
        }
        else{
            if (turn==="x"){
                div.innerText = turn;
                return "o"
            }else {
                div.innerText = turn;
                return "x"
            }
        }

}

function recordState(houses) {
    const moves = [];
    houses.forEach(house => {
        moves.push(house.innerText);
    })
    return moves;
}

function checkResult(moves){
    const winnerCombination = [
        [0,1,2],[3,4,5],[6,7,8], //horizontal
        [0,3,6],[1,4,7],[2,5,8], //vertical
        [2,4,6],[0,4,8]          // diagonal
    ]
    for (let comb of winnerCombination) {
        if (moves[comb[0]] === moves[comb[1]] && moves[comb[1]] === moves[comb[2]]) {
            return moves[comb[0]]
        }
    }
    return false
}

function addEventL(div) {
    div.addEventListener("click", function() {
        turn = changeState(div,turn)
        let houses = recordDivs()
        let moves = recordState(houses)
        let res = checkResult(moves)
        if (res !== false) {
            console.log(res+" has won")
            // .....
        }
    });
}






/*
0 1 2
3 4 5
6 7 8
*/




