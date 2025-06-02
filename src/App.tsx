import "./App.css";
// import Board from "./tictactoe/board";
import FilterableProductTable from "./search/FilterableProductTable";
import FloatingCart from "./search/cart/FloatingCart";
import FloatingInfo from "./search/info/FloatingInfo";
import { ModalManager } from "./search/modals/ModalManager";

function App() {
  return (
    <>
      <ModalManager>
        {/* <Board /> */}
        <FilterableProductTable />
        <FloatingCart />
        <FloatingInfo />
      </ModalManager>
    </>
  );
}

export default App;
