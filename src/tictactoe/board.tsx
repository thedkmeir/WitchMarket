import { useEffect, useState } from "react";
import "./board.scss";
import Square from "./square";
import { useModal } from "../search/modals/ModalManager";

export default function Board() {
  const [squares, setSquares] = useState<(string | null)[]>(
    Array(9).fill(null)
  );
  const [xIsNext, setXIsNext] = useState(true); // Human always goes first ("×")
  const [isGameOver, setIsGameOver] = useState(false);
  const { openModal } = useModal();

  const Winnerlines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function calculateWinner(sq: Array<string | null>) {
    for (let [a, b, c] of Winnerlines) {
      if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) {
        return sq[a];
      }
    }
    return null;
  }

  function isDraw(sq: Array<string | null>) {
    return sq.every((v) => v !== null);
  }

  function handleClick(i: number) {
    if (isGameOver || !xIsNext || squares[i]) return;

    const squaresCopy = squares.slice();
    squaresCopy[i] = "×";
    setSquares(squaresCopy);

    // Check for human win/draw immediately after move
    if (calculateWinner(squaresCopy) || isDraw(squaresCopy)) {
      setIsGameOver(true);
      return;
    }

    setXIsNext(false);
  }

  // BOT LOGIC: Runs automatically after human move
  useEffect(() => {
    if (!isGameOver && !xIsNext) {
      // Bot makes its move after a short delay
      setTimeout(() => {
        const move = bestMove(squares);
        if (move !== null) {
          const newSquares = squares.slice();
          newSquares[move] = "●";
          setSquares(newSquares);

          // Check if bot wins or game is draw
          if (calculateWinner(newSquares) || isDraw(newSquares)) {
            setIsGameOver(true);
          } else {
            setXIsNext(true);
          }
        }
      }, 400); // Add a little delay for realism
    }
    // eslint-disable-next-line
  }, [xIsNext, isGameOver, squares]);

  // Minimax: Bot always plays optimally
  function bestMove(board: (string | null)[]): number | null {
    let bestScore = -Infinity;
    let move: number | null = null;
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = "●";
        let score = minimax(board, 0, false);
        board[i] = null;
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
  }

  function minimax(
    board: (string | null)[],
    depth: number,
    isMaximizing: boolean
  ): number {
    const winner = calculateWinner(board);
    if (winner === "●") return 1;
    if (winner === "×") return -1;
    if (isDraw(board)) return 0;

    if (isMaximizing) {
      let best = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (!board[i]) {
          board[i] = "●";
          best = Math.max(best, minimax(board, depth + 1, false));
          board[i] = null;
        }
      }
      return best;
    } else {
      let best = Infinity;
      for (let i = 0; i < 9; i++) {
        if (!board[i]) {
          board[i] = "×";
          best = Math.min(best, minimax(board, depth + 1, true));
          board[i] = null;
        }
      }
      return best;
    }
  }

  // --- UI ---
  return (
    <>
      <div className="board">
        {[0, 3, 6].map((rowStart) => (
          <div className="board-row" key={rowStart}>
            {[0, 1, 2].map((i) => {
              const index = rowStart + i;
              return (
                <Square
                  key={index}
                  value={squares[index]}
                  onSquareClick={() => handleClick(index)}
                />
              );
            })}
          </div>
        ))}
      </div>
      {isGameOver && (
        <div style={{ marginTop: 16 }}>
          {calculateWinner(squares)
            ? calculateWinner(squares) === "×"
              ? "YOU WIN?!?! IT IS IMPOSSIBLE!"
              : "You lost... no 15% off for you!"
            : "Draw! no one wins..."}
        </div>
      )}
    </>
  );
}
