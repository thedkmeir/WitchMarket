import "./App.css";
// import Board from "./tictactoe/board";
import FilterableProductTable from "./search/FilterableProductTable";
import FloatingCart from "./search/cart/FloatingCart";

function App() {
  return (
    <>
      {/* <Board /> */}
      <FilterableProductTable />
      <FloatingCart />
    </>
  );
}

export default App;
