import { useEffect, useState } from "react";
import "./board.scss";
import Square from "./square";
import { useModal } from "../search/modals/ModalManager";
import TextButton from "../search/inputs/TextButton";
import { AnimatePresence, motion } from "framer-motion";
import Spacer from "../search/inputs/Spacer";

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

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setIsGameOver(false);
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
    const winner = calculateWinner(squaresCopy);
    if (winner || isDraw(squaresCopy)) {
      setIsGameOver(true);
      if (winner === "×") {
        setTimeout(() => {
          openModal({
            type: "message",
            title: "Well About that 15% off...",
            dismissible: true,
            params: {
              msg: "You won! (Probably by cheating)... but i need to tell you something... i kinda lied about that 15% off... sorry!",
            },
          });
        }, 1500);
      }
      return;
    }

    setXIsNext(false);
  }

  useEffect(() => {
    if (!isGameOver && !xIsNext) {
      setTimeout(() => {
        const move = bestMove(squares);
        if (move !== null) {
          const newSquares = squares.slice();
          newSquares[move] = "●";
          setSquares(newSquares);

          if (calculateWinner(newSquares) || isDraw(newSquares)) {
            setIsGameOver(true);
          } else {
            setXIsNext(true);
          }
        }
      }, 500);
    }
  }, [xIsNext, isGameOver, squares]);

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
      <Spacer size={5} />

      <motion.div layout style={{ height: 32, overflow: "hidden" }}>
        <AnimatePresence mode="wait">
          {isGameOver && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              layout
            >
              {calculateWinner(squares)
                ? calculateWinner(squares) === "×"
                  ? "YOU WON?!?! HOW?!?! IT IS IMPOSSIBLE!!!"
                  : "You lost... no 15% off for you!"
                : "Draw! no one wins..."}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <Spacer size={10} />
      <TextButton text={"Try Again?"} onClick={resetGame} />
    </>
  );
}
