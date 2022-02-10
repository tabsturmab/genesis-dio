let order = [];
let clickedOrder = [];
let score = 0;

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

let lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 250);

    setTimeout(() => {
        element.classList.remove('selected');
    }, number);
}

let checkOrder = () => {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }else if(clickedOrder.length == order.length && 
            clickedOrder[clickedOrder.length-1] == order[order.length-1]) {
            displayNextLevel();
            break;
        }
    }
}

let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    },250);
}

let createColorElement = (color) => {
    if(color == 0) {
        return green;
    } else if(color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

let nextLevel = () => {
    score++;

    document.querySelector('.template').style.filter = 'blur(0px)';
    document.querySelector('#nextLevel').style.display = 'none';
    document.querySelector('.level__score').innerHTML = score;
    
    shuffleOrder();
}

let displayNextLevel = () => {
    let divNextLevel = `<p>Parabéns, você acertou!</p>`
    +`<button onclick=nextLevel()>Próximo nível</button>`;

    document.querySelector('#nextLevel').style.display = 'flex';
    document.querySelector('#nextLevel').innerHTML = divNextLevel;
    document.querySelector('.template').style.filter = 'blur(2px)';

}

let gameOver = () =>{
    let divGameOver = `<p>Infelizmente, você Errou!</p>`
    +`<button onclick=playGame()>Reiniciar</button>`;

    document.querySelector('.template').style.filter = 'blur(2px)';
    document.querySelector('#gameOver').style.display = 'flex';
    document.querySelector('#gameOver').innerHTML = divGameOver;

    order = [];
    clickedOrder = [];
    score = 0;
}

let playGame = () => {
    document.querySelector('#gameOver').style.display = 'none';
    document.querySelector('.level__score').innerHTML = score;

    score = 0;

    nextLevel();
}

green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);


window.onload = () => {
    setTimeout(() => {
        playGame();
    }, 2000);
}