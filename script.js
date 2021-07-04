var origBoard=[9];
const huPlayer= 'O';
const aiPlayer='X';
const winCombos=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2],
]
const cells=document.querySelectorAll(".cell");
startGame();

function startGame(){
    document.querySelector(".endgame").getElementsByClassName.display="none";
    for(let i=0;i<9;i++){
        origBoard[i]=i;
    }
    // origBoard=Array.from(Array(9).keys());
    for(var i=0;i<cells.length;i++){
        cells[i].innerText='';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnClick);
    }
}

function turnClick(square){
    turn(square.target.id, huPlayer);
}

function turn(squareId, player){
    origBoard[squareId]=player;
    document.getElementById(squareId).innerHTML=player;
    let gameWon=checkWin(origBoard, player);
    if(gameWon) gameOver(gameWon);
}

function checkWin(board, player){
    let temp=[];
    for(let i=0;i<9;i++){
        if(board[i]===player) temp.push(i);
    }
    let gameWon=null;
    for(let i=0;i<winCombos.length;i++){
        if(winCombos[i].every(val=>temp.includes(val))) {
            gameWon={
                index: i,
                player: player
            };
            break;
        }
    }
    return gameWon;
}

function gameOver(gameWon){
    for(let index of winCombos[gameWon.index]){
        document.getElementById(index).style.backgroundColor=gameWon.player==huPlayer?"blue":"red";
    }
    for(var i=0;i<cells.length;i++){
        cells[i].removeEventListener('click', turnClick); 
    }
}