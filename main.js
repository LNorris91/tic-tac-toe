function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    function Cell() {
        let value = 0;
        const addToken = (player) => {
            value = player
        }
        const getValue = () => value;
        const resetValue = () => {
            value = 0
        }

        return {addToken, getValue, resetValue}
    } 

    const placeToken = (player, row, column) => {
        if (board[row][column].getValue() === 0) {
            board[row][column].addToken(player);
        } else {
            return
        }
    }

    const getBoard = () => board

    const printBoard = () => {
        const currentBoard = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(currentBoard)
    }

    const resetBoard = () => {
        const resetBoard = board.map((row) => row.map((cell) => cell.resetValue()));
        printBoard()
    }

    return {printBoard, placeToken, resetBoard, getBoard}
}

function Players(playerOne = "player one", playerTwo = "player two") {
    const players = [
        {
            name: playerOne,
            token: 1,
        },
        {
            name: playerTwo,
            token: 2,
        }
    ]

    let activePlayer = players[0];

    const getActivePlayer = () => activePlayer

    const switchActivePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }
    
    return {getActivePlayer, switchActivePlayer}
}

function Gameplay(player1, player2) {
    const board = Gameboard();
    const players = Players(player1, player2)
    
    const playTurn = (row, column) => {
        board.placeToken(players.getActivePlayer().token, row, column);
        checkWin()
        console.log(`${players.getActivePlayer().name}'s move was`);
         if (board.getBoard()[row][column].getValue() === players.getActivePlayer().token) {
              players.switchActivePlayer();
          } else {
              console.log("Invalid, go again");
            }
        board.printBoard()
        console.log(`It is ${players.getActivePlayer().name}'s turn`);
    }

    const checkWin = () => {
        const arr = board.getBoard().map((row) => row.map((cell) => cell.getValue()));
        let activeToken = players.getActivePlayer().token;
        console.log(activeToken)
        
        if (arr[0][0] === activeToken && arr[0][1] === activeToken && arr[0][2] === activeToken || //check for horizontal wins
            arr[1][0] === activeToken && arr[1][1] === activeToken && arr[1][2] === activeToken || 
            arr[2][0] === activeToken && arr[2][1] === activeToken && arr[2][2] === activeToken || 

            arr[0][0] === activeToken && arr[1][0] === activeToken && arr[2][0] === activeToken || //check for vertical wins
            arr[0][1] === activeToken && arr[1][1] === activeToken && arr[2][1] === activeToken || 
            arr[0][2] === activeToken && arr[1][2] === activeToken && arr[2][2] === activeToken || 

            arr[0][0] === activeToken && arr[1][1] === activeToken && arr[2][2] === activeToken || //check for diaganol wins
            arr[2][0] === activeToken && arr[1][1] === activeToken && arr[0][2] === activeToken) {
                console.log(`${players.getActivePlayer().name} WINS!!!!`)
            }
    }
    
    board.printBoard()
    return {playTurn}
}

game = Gameplay("luke", "allison")
