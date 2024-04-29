function Gameboard(){
    //initaites rows, columns, and gameboard
    const size = 3;
    const rows = 3;
    const columns = 3;
    const gameboard = [];
    //sets gameboard grid based on rows and columns
    for (let i = 0; i < columns; i++){
        gameboard[i] = [];
        for (let j = 0; j < rows; j++){
            gameboard[i].push(Cell()); 
        }
    }
    //used to get the gameboard in other functions
    const getBoard = () => gameboard;
    //prints the board to the console
    const printBoard = () =>{
        const boardWithCellValues = gameboard.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    }
    //place the current players token by getting the column, row, and player
    //player is equal to the active players token value
    const placeToken =(column,row, player) =>{
        if(gameboard[column][row].getValue() === ""){
            gameboard[column][row].getToken(player);
        }
        else{
            return "False";
        }
    }
    return {getBoard,printBoard,placeToken}
}
function Cell(){
    //iniation values is 0
    let value = "";
    const getValue = () => value;
    //get players token value by being passed the current active players token
    const getToken = (player) =>{
        value = player
    }
    return {getValue,getToken};

}
function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
){
    let count = 0;
    const board = Gameboard()
    const getBoard = board.getBoard();
    const players = [
        {
            name: playerOneName,
            token: "X"
        },
        {
            name: playerTwoName,
            token: "O"
        }
    ];

    let activePlayer = players[0];
    //switches player based on who is the current player. is called after token is palced
    const switchPlayer = () =>{
        if (activePlayer === players[0]){
            activePlayer = players[1];
        }
        else{
            activePlayer = players[0];
        }
    }
    const getActivePlayer = () => activePlayer;
    // don't think this is needed
    //const getNewRound = board.getBoard()
    //prints new round and tells the console what players turn it is
    const printNewRound = () =>{
        board.printBoard()
        console.log(getActivePlayer().name + "'s Turn")
    }

    const checkWinner = () =>{
       //check columns for winner
       for(let i = 0; i < getBoard[0].length; i ++){
            if(checkColumns(i)){
                return getBoard[0][i].getValue();
             }
         }
        //check rows for winner
        for(let j = 0; j < getBoard.length; j++){
            if(checkRows(j)){
                return getBoard[j][0].getValue();
            }
        }
        //check top left bottom right diagnol
        for (let k = 0; k < getBoard.length; k++){
            if(checkTopLeftDiagonal(k)){
                return getBoard[0][0].getValue();
            }
        }
        //check top right bottom left diagnol
            if(checkTopRightDiagonal(2)){
                return getBoard[0][2].getValue();
            }
            if(count === 8){
                return "Draw"
            }
    }
    const checkColumns = (column) =>{
        const firstCell = getBoard[0][column].getValue();
        if(firstCell == ""){
            return false;
        }
        for(let i = 1; i < getBoard.length;i++){
            if(getBoard[i][column].getValue() !== firstCell){
                return false;
            }
        }
        return true
    }
    const checkRows = (row) =>{
        const firstCell = getBoard[row][0].getValue();
        if(firstCell == ""){
            return false;
        }
        for(let i = 1; i < getBoard[0].length;i++){
            if(getBoard[row][i].getValue() !== firstCell){
                return false;
            }
        }
        return true
    }
    const checkTopLeftDiagonal = (diagonal) =>{
        const firstCell = getBoard[diagonal][diagonal].getValue();
        if(firstCell == ""){
            return false
        }
        for(let i = 1; i < getBoard[0].length;i++){
            if(getBoard[i][i].getValue() !== firstCell){
                return false;
            }
        }
        return true
    }
    const checkTopRightDiagonal = (diagonal) =>{
       const firstCell = getBoard[0][diagonal].getValue();
       if(firstCell == ""){
        return false;
       }
       if(firstCell == getBoard[1][1].getValue() && firstCell == getBoard[diagonal][0].getValue()){
        return true;
       }
    }
    const playRound = (column,row) => {
        // checks for return false
        const checkValue =  board.placeToken(column,row,getActivePlayer().token);
        if (checkValue === "False"){
            console.log("Invalid Move. Space Occupied.");
            playRound(column,row);
        }
        else{
            board.placeToken(column,row,getActivePlayer().token);
        }
       

        if(checkWinner() === "X" || checkWinner() ==="O"){
             let winningToken = checkWinner();
             let winningName;
            if(players[0].token == winningToken){
                winningName = players[0].name;
            }
            else{
                winningName = players[1].name;
            }
            board.printBoard();
            document.getElementById("winner").style.visibility = "visible";
            document.querySelector(".displayWinner").innerHTML = winningName + " wins";
         }
         if (checkWinner() ==="Draw"){
            board.printBoard();
            document.getElementById("winner").style.visibility = "visible";
            document.querySelector(".displayWinner").innerHTML = "Draw";
         }
        switchPlayer();
        printNewRound();
        count ++;
    }
    //iniates first round
    printNewRound()
    return{playRound,getActivePlayer};
}

let play;

document.querySelector(".submit button").onclick = function(){
    let playerOneName = document.getElementById("playerOne").value;;
    let playerTwoName = document.getElementById("playerTwo").value;; 
    if (playerOneName === "" ){
        playerOneName = "Player One";
    }
    if (playerTwoName === "" ){
        playerTwoName = "Player Two";
    }
    console.log(playerTwoName)
    play = GameController(playerOneName,playerTwoName);
    document.querySelector(".submit button").style.visibility = "hidden";
}

document.querySelector("#winner button").onclick = function(){
    let winner  = document.getElementById("winner");
   
    let list = document.querySelectorAll(".class");
    list.forEach((item) => {
        item.innerHTML = "";
    });
    
    play = GameController(document.getElementById("playerOne").value,document.getElementById("playerTwo").value);
    document.querySelector("#winner").style.visibility = "hidden";
}


// apply the event listener to ids

document.querySelectorAll('.class').forEach((id) => {
    id.addEventListener('click', event => {
      const id = event.currentTarget.id;
      let text = play.getActivePlayer().token
      document.getElementById(id).innerHTML;
      play.playRound(id[0],id[1]);
      document.getElementById(id).innerHTML = text;
    });
  });

 
