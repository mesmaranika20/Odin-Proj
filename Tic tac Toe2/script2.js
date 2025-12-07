//Create the Gameboard Module (IIFE)

const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const setMark = (index, mark) => {
    if (board[index] === "") {
      board[index] = mark;
      return true;
    }
    return false;
  };

  const reset = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };

  return { getBoard, setMark, reset };
})();

//Player Factory
const Player = (name, marker) => {
  return { name, marker };
};

//Game Controller (IIFE)
const GameController = (() => {
  let player1;
  let player2;
  let currentPlayer;
  let gameOver = false;

  const start = (name1 = "Player 1", name2 = "Player 2") => {
    player1 = Player(name1, "X");
    player2 = Player(name2, "O");
    currentPlayer = player1;
    gameOver = false;
    Gameboard.reset();
  };

  const playRound = (index) => {
    if (gameOver) return;

    if (Gameboard.setMark(index, currentPlayer.marker)) {
      if (checkWin(currentPlayer.marker)) {
        gameOver = true;
        return `${currentPlayer.name} wins!`;
      }
      if (checkTie()) {
        gameOver = true;
        return "It's a tie!";
      }
      switchPlayer();
    }
  };

  const switchPlayer = () =>
    currentPlayer = (currentPlayer === player1 ? player2 : player1);

  const checkWin = (mark) => {
    const b = Gameboard.getBoard();
    const winPatterns = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];
    return winPatterns.some(pattern =>
      pattern.every(i => b[i] === mark)
    );
  };

  const checkTie = () =>
    Gameboard.getBoard().every(cell => cell !== "");

  const getCurrentPlayer = () => currentPlayer;
  const isGameOver = () => gameOver;

  return { start, playRound, getCurrentPlayer, isGameOver };
})();


//DisplayController (DOM Module)
const DisplayController = (() => {
  const boardDiv = document.getElementById("board");
  const messageDiv = document.getElementById("message");
  const startBtn = document.getElementById("startBtn");
  const p1 = document.getElementById("player1");
  const p2 = document.getElementById("player2");

  const render = () => {
    boardDiv.innerHTML = "";
    Gameboard.getBoard().forEach((cell, index) => {
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("cell");
      cellDiv.textContent = cell;
      cellDiv.addEventListener("click", () => handleClick(index));
      boardDiv.appendChild(cellDiv);
    });
  };

  const handleClick = (index) => {
    if (GameController.isGameOver()) return;

    const result = GameController.playRound(index);
    render();

    if (result) {
      messageDiv.textContent = result;
    } else {
      messageDiv.textContent =
        `${GameController.getCurrentPlayer().name}'s turn`;
    }
  };

  startBtn.addEventListener("click", () => {
    GameController.start(p1.value, p2.value);
    messageDiv.textContent =
      `${GameController.getCurrentPlayer().name}'s turn`;
    render();
  });

  return { render };
})();
