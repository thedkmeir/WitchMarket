import "./App.css";
import FilterableProductTable from "./search/FilterableProductTable";
import FloatingCart from "./search/cart/FloatingCart";
import FloatingInfo from "./search/info/FloatingInfo";
import { ModalManager } from "./search/modals/ModalManager";
import { FlyToCartProvider } from "./search/FlyToCartContext";

function App() {
  return (
    <>
      <FlyToCartProvider>
        <ModalManager>
          <FilterableProductTable />
          <FloatingCart />
          <FloatingInfo />
        </ModalManager>
      </FlyToCartProvider>
    </>
  );
}

export default App;
