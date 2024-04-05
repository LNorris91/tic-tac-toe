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

        return {addToken, getValue}
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

    return {printBoard, placeToken}
}

board = Gameboard()