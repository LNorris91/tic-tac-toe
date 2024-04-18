const begin = document.querySelector(".start");
const dialog = document.querySelector("dialog");
begin.addEventListener('click', start)

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
        return {addToken, 
                getValue, 
                resetValue}
    } 

    const placeToken = (player, row, column) => {
        if (board[row][column].getValue() === 0) {
            board[row][column].addToken(player);
        } else {
            return
        }
    }

    const getBoard = () => board

    const resetBoard = () => {
        board.map((row) => row.map((cell) => cell.resetValue()));
    }

    return {placeToken, 
            resetBoard, 
            getBoard}
}

function Players(playerOne = "player one", playerTwo = "player two") {
    const players = [
        {
            name: playerOne,
            token: 1,
            score: 0,
        },
        {
            name: playerTwo,
            token: 2,
            score: 0,
        }
    ]

    let activePlayer = players[0];

    const getActivePlayer = () => activePlayer

    const switchActivePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }
    const resetActivePlayer = () => {
        activePlayer = players[0];
    }
    const getPlayer1 = () => players[0];
    const getPlayer2 = () => players[1];
    
    return {getActivePlayer, 
            switchActivePlayer, 
            resetActivePlayer, 
            getPlayer1, 
            getPlayer2}
}

function Gameplay(player1, player2) {
    const board = Gameboard();
    const players = Players(player1, player2)
    
    const playTurn = (row, column) => {
        
        if (board.getBoard()[row][column].getValue() === 1 || board.getBoard()[row][column].getValue() === 2) {
            return
        }

        board.placeToken(players.getActivePlayer().token, row, column);

        if (checkWin()) {
            players.getActivePlayer().score++;
            return 'win'
        } else if (checkTie()){
            return 'tie'
        } else {
            players.switchActivePlayer();
        }
    }

    const checkWin = () => {
        const arr = board.getBoard().map((row) => row.map((cell) => cell.getValue()));
        let activeToken = players.getActivePlayer().token;
        
        if (arr[0][0] === activeToken && arr[0][1] === activeToken && arr[0][2] === activeToken || //check for horizontal wins
            arr[1][0] === activeToken && arr[1][1] === activeToken && arr[1][2] === activeToken || 
            arr[2][0] === activeToken && arr[2][1] === activeToken && arr[2][2] === activeToken || 

            arr[0][0] === activeToken && arr[1][0] === activeToken && arr[2][0] === activeToken || //check for vertical wins
            arr[0][1] === activeToken && arr[1][1] === activeToken && arr[2][1] === activeToken || 
            arr[0][2] === activeToken && arr[1][2] === activeToken && arr[2][2] === activeToken || 

            arr[0][0] === activeToken && arr[1][1] === activeToken && arr[2][2] === activeToken || //check for diagonal wins
            arr[2][0] === activeToken && arr[1][1] === activeToken && arr[0][2] === activeToken) {
                return true
            } else {
                return false
            }
    }

    const checkTie = () => {  //if there is no winner and there are no "0"s left on the board
        const arr = board.getBoard().map((row) => row.map((cell) => cell.getValue()));
        if (arr[0].includes(0) || arr[1].includes(0) || arr[2].includes(0)) {
            return false
        } else {
            return true
        }
    }

    const reset = () => { 
        board.resetBoard();
        players.resetActivePlayer();
    }
    
    return {playTurn, 
            reset, 
            getBoard: board.getBoard, 
            getActivePlayer: players.getActivePlayer,
            getPlayer1: players.getPlayer1, 
            getPlayer2: players.getPlayer2}
}

function ScreenController(player1, player2){
    const game = Gameplay(player1, player2);
    let playerTurnDiv = document.querySelector(".turn");
    const boardDiv = document.querySelector(".board");
    const p1Score = document.querySelector(".p1Score");
    const p2Score = document.querySelector(".p2Score")
    const container = document.querySelector(".container");
    let announce = document.querySelector(".announce")

    const resetBtn = document.createElement("button");
          resetBtn.setAttribute("type", "button")
          resetBtn.classList.add("resetBtn")
          resetBtn.textContent = "Reset Board"
          container.appendChild(resetBtn)

    const updateScreen = () => {
        boardDiv.textContent = "";
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();
        const player1 = game.getPlayer1();
        const player2 = game.getPlayer2();
        
        playerTurnDiv.textContent = `${activePlayer.name}'s Turn`;
        p1Score.textContent = `${player1.name}: ${player1.score}`
        p2Score.textContent = `${player2.name}: ${player2.score}`

        board.forEach((row, rowNum) => {
          row.forEach((cell, colNum) => {
            const cellButton = document.createElement("button");
            cellButton.classList.add("cell");
            cellButton.dataset.row = rowNum;
            cellButton.dataset.col = colNum;
            switch (cell.getValue()) {
                case 0:
                    cellButton.textContent = "";
                    break;
                case 1:
                    cellButton.textContent = "X";
                    break;
                case 2: 
                    cellButton.textContent = "O";
            }
            boardDiv.appendChild(cellButton);
        })})
    }

    function playerClick(e) {
        const selectedRow = e.target.dataset.row;
        const selectedCol = e.target.dataset.col;

        switch (game.playTurn(selectedRow, selectedCol)) {
            case 'win':
                announce.textContent = `${game.getActivePlayer().name} WINS!!!!`
                boardDiv.removeEventListener('click', playerClick);
                break;
            case 'tie':
                announce.textContent = "It's a Tie!"
                boardDiv.removeEventListener('click', playerClick);
        }
        updateScreen()
    } 

    function reset() {
        game.reset();
        updateScreen();
        announce.textContent = "";
        boardDiv.addEventListener('click', playerClick);
    }

    boardDiv.addEventListener('click', playerClick);
    resetBtn.addEventListener('click', reset)

    updateScreen()
}

function start(e){
    e.preventDefault();

    const player1 = document.getElementById("player1").value;
    const player2 = document.getElementById("player2").value;
    if (!player1 || !player2) return

    ScreenController(player1, player2)
    dialog.close()
}
