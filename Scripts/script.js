$(window).on('load', function () {
    setTimeout(function () {
        $('#loader').fadeOut('slow', function () {
            $('#content').fadeIn('slow');
        });
    }, 2000); 
});
/////////////////////////////////////////////////////

const translatedElement = document.getElementById('translated');
let tolang = "en/es"




document.getElementById("Translate").addEventListener("click", async () => {
    

    // Show "Translating..." while waiting for the translation
    text = translatedElement.innerText
    translatedElement.textContent = "Translating...";

    fetch(`https://lingva.ml/api/v1/${tolang}/${text}`)
        .then(res => res.json())
        .then(data => {
            translatedElement.textContent = data.translation
            translatedElement.appendChild(span)
        })
        .catch(err => console.error(err));
    
    tolang = (tolang === "en/es") ? "es/en" : "en/es";
    

})




////////////////////////////////////////////////////

const reset = document.getElementById('reset')
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
    reset.style.display = 'none'
}

appendEventL(recordDivs())
let turn = "x";


function changeState(div,turn){
        
    if (div.innerText === turn) {
        console.log("invalid input")
    }else{
        switch (turn) {
            case "x":
                div.innerText = turn;
                div.removeEventListener("click", div.handler)
                return "o"

            case "o":
                div.innerText = turn;
                div.removeEventListener("click", div.handler)
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
            if (moves[comb[0]] !==""){
                
                return [moves[comb[0]],comb]
            }
        }
    }
    return [false,false]
}

function stopGame(array,houses) {
    for(elem of array){
        houses[elem].style.backgroundColor = "green"
    }
    houses.forEach( div =>{
        div.removeEventListener("click", div.handler)
    })

    reset.style.display = 'block'
    
    reset.addEventListener('click', ()=>{
        houses = recordDivs()
        houses.forEach(div=>{
            div.innerText=''
            div.style.backgroundColor='#5f426b'
        })
        appendEventL(houses)
    })
}


function addEventL(div) {
    
    function main() {
        turn = changeState(div, turn);
        let houses = recordDivs();
        let moves = recordState(houses);
        let res = checkResult(moves);
        if (res[0] !== false) {
            console.log(res[0] + " has won " + res[1]);
            stopGame(res[1], houses);
        }
    }
    div.addEventListener("click", main);

    div.handler = main;
}






/*
0 1 2
3 4 5
6 7 8
*/




