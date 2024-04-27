        //if count equal max count it is a draw, figure out max count
        //console.log("CHECKWINNER TEST");
        //console.log(board.getBoard()[0][0].getValue());
        //console.log(board.getBoard()[0].length + " row length"); horizontal length
       // console.log(board.getBoard().length + " column length"); vertical length
        //console.log("CHECKWINNER TEST");



function Gameboard(){
    //initaites rows, columns, and gameboard
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
        if(gameboard[column][row].getValue() === 0){
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
    let value = 0;

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

    const board = Gameboard()
    const getBoard = board.getBoard();
    // count is to iniate when to check for a winner/draw
    let count = 5;
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
    }
    const checkColumns = (column) =>{
        const firstCell = getBoard[0][column].getValue();
        if(firstCell == 0){
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
        if(firstCell == 0){
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
        if(firstCell == 0){
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
       if(firstCell == 0){
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
            switchPlayer();
        }
        else{
            board.placeToken(column,row,getActivePlayer().token);
        }
        count ++;

        if (count >= 5){
            if(checkWinner()){
                let winner = checkWinner();
                board.printBoard()
                return "Winner is "+ winner
            }
        } 

        switchPlayer();
        printNewRound();
    }


    //iniates first round
    printNewRound()

    return{playRound,getActivePlayer}

}

const game = GameController();
