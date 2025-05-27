import { useState } from "react";
import "./board.css";
import Square from "./square";
import ResetButton from "./resetButton";

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [h1content, seth1Content] = useState("Its ×'s turn");
  const [animate, setAnimate] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
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

  function handleClick(i: number) {
    if (isGameOver) return;

    const squaresCopy = squares.slice();
    const nextTurn = !xIsNext;
    if (squaresCopy[i]) return;

    squaresCopy[i] = getPlayer();
    setSquares(squaresCopy);

    if (calculateWinner(squaresCopy)) {
      updateStatus(`Winner is ${getPlayer()}`);
      setIsGameOver(true);
      return;
    }
    if (isDraw(squaresCopy)) {
      updateStatus("Game is Draw");
      setIsGameOver(true);
      return;
    }

    updateStatus(`Its ${getPlayer(nextTurn)}'s turn`);
    setXIsNext((prev) => !prev);
  }

  function getPlayer(val?: boolean) {
    if (val != undefined) {
      return val ? "×" : "●";
    }
    return xIsNext ? "×" : "●";
  }

  function calculateWinner(squares: Array<string | null>) {
    for (let i = 0; i < Winnerlines.length; i++) {
      const [a, b, c] = Winnerlines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  function isDraw(squares: Array<string | null>) {
    return squares.every((square) => square !== null);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    updateStatus("Its ×'s turn");
    setIsGameOver(false);
  }

  function updateStatus(newText: string) {
    // Trigger fade out
    setAnimate(true);

    setTimeout(() => {
      // Change the text after fade out ends
      seth1Content(newText);

      // Fade back in
      setAnimate(false);
    }, 200); // match CSS transition time
  }

  return (
    <>
      <h1 className={`status ${animate ? "fade" : ""}`}>{h1content}</h1>

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

      <ResetButton onClick={resetGame} />
    </>
  );
}
