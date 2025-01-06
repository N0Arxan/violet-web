const cssLink = document.createElement('link');
cssLink.setAttribute('rel','stylesheet');
cssLink.href = `style.css?ts=${new Date().getTime()}`;
document.head.appendChild(cssLink);


//////////////////////////////////////////////////////



$(window).on('load', function () {
    setTimeout(function () {
        $('#loader').fadeOut('slow', function () {
            $('#content').fadeIn('slow');
        });
    }, 2000); 
});
/////////////////////////////////////////////////////


let tolang = "en/es"

document.getElementById("Translate").addEventListener("mouseover", () => {
    
    const translatedElement = document.getElementById('translated');
    text = translatedElement.innerText
    translatedElement.remove()
    

    fetch(`https://lingva.ml/api/v1/${tolang}/${text}`)
        .then(res => res.json())
        .then(data => {
            const pr = document.createElement("p")
            pr.id="translated"
            pr.innerText=data.translation
            document.getElementsByClassName('text')[0].appendChild(pr) 
        })
        .catch(err => console.error(err));
    
    tolang = (tolang === "en/es") ? "es/en" : "en/es";
    

})

///////////////////////////////////////////////////
let estaBien = 0
const submit = document.getElementById('submit')
submit.addEventListener('click',()=>{
    let inputs = document.getElementsByTagName('input')
    for (var input of inputs){
        if (input.value === ""){
            estaBien+=1
        }
    }
    if (estaBien===0){
        alert(`Thanks for your support ${inputs[0].value} we will contact you as soon as posible `)
        
    }else{
        alert('compelet the form correctly pls ;) ')
        
    }

})
document.getElementsByTagName('button')[1].style.color='#ffffff';


////////////////////////////////////////////////////
let numMoves = 0

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
                numMoves++;
                div.innerText = turn;
                div.removeEventListener("click", div.handler)
                return "o"

            case "o":
                numMoves++;
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
    console.log(numMoves)
    for (let comb of winnerCombination) {
        if (moves[comb[0]] === moves[comb[1]] && moves[comb[1]] === moves[comb[2]]) {
            if (moves[comb[0]] !==""){
                
                return [moves[comb[0]],comb]
            }
        }
    }
    if (numMoves===9){
        return [false,true];
    }
    return [false,true];
    
    
}

function stopGame(array,houses) {
    if (array){     
        for(elem of array){
            houses[elem].style.backgroundColor = "green"
        }
        houses.forEach( div =>{
            div.removeEventListener("click", div.handler)
        })
    }else{
        houses.forEach( div =>{
            div.style.backgroundColor = "yellow"
            div.removeEventListener("click", div.handler)
        })
    }
    
    numMoves=0
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
        }else if (res[0]===res[1]){
            console.log("is a draw");
            stopGame(res[1], houses);
        }
    }
    div.addEventListener("click", main);

    div.handler = main;
}
let i=0
do{
    i++
    console.log("no hay uso para while")
    console.log(" **** ")
}while(i<3)





/*
0 1 2
3 4 5
6 7 8
*/




