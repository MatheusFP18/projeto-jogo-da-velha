// Initial Data
let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};

let player = '';
let warning = '';
let playing = false;

reset();

// Events
document.querySelector('.reset').addEventListener('click', reset);

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
});
// Functions
function itemClick(event) {
    let item = event.target.getAttribute('data-item');
    if (playing && square[item] === '') {
        square[item] = player;
        renderSquare();
        togglePlayer();
    }
}
function reset() {
    warning = '';

    let randon = Math.floor(Math.random() * 2);
    player = randon === 0 ? 'X' : 'O';

    for (let i in square) {
        square[i] = '';
    }

    playing = true;

    renderSquare();
    renderInfo();
}

function renderSquare() {
    for (let i in square) {
        let item = document.querySelector(`div[data-item="${i}"]`);
        item.innerHTML = square[i];
    }

    checkGame();
}


function renderInfo() {
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
}

function togglePlayer() {
    player = player === 'X' ? 'O' : 'X';
    renderInfo();
}

function checkGame() {
    if (checkWinnerFor('X')) {
        warning = 'O <b>X</b> venceu!';
        playing = false;
    } else if (checkWinnerFor('O')) {
        warning = 'O <b>O</b> venceu!';
        playing = false;
    } else if (isFull()) {
        warning = 'Empate!';
        playing = false;
    }            
}

function checkWinnerFor(player) {
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for (let w in pos) {
        let pArray = pos[w].split(',');
        let resWon = pArray.every(opition => square[opition] === player); 
        if (resWon) {
            return true;
        }
}};

function isFull() {
    for (let i in square) {
        if (square[i] === '') {
            return false;
        }
    }
    return true;
}