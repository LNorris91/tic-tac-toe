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
            board[row][column].addToken(player)
        } else {
            console.log("Can't go here")
        }
        printBoard()
    }

    const printBoard = () => {
        const currentBoard = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(currentBoard)
    }

    const resetBoard = () => {
        const resetBoard = board.map((row) => row.map((cell) => cell.resetValue()));
        printBoard()
    }

    return {printBoard, placeToken, resetBoard}
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

game = Players("bob", "tim")
board = Gameboard()