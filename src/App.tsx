import "./App.css";
// import Board from "./tictactoe/board";
import FilterableProductTable from "./search/FilterableProductTable";
import FloatingCart from "./search/cart/FloatingCart";
import FloatingInfo from "./search/info/FloatingInfo";

function App() {
  return (
    <>
      {/* <Board /> */}
      <FilterableProductTable />
      <FloatingCart />
      <FloatingInfo />
    </>
  );
}

export default App;
