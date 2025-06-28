import "./App.scss";
import FilterableProductTable from "./search/FilterableProductTable";
import FloatingCart from "./search/cart/FloatingCart";
import FloatingInfo from "./search/info/FloatingInfo";
import type { JSX } from "react";
import { ModalManager } from "./search/modals/ModalManager";
import { FlyToCartProvider } from "./search/FlyToCartContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./search/login/login.tsx";
import { AnimatePresence, motion } from "framer-motion";
import TopTip from "./search/toptip/Toptip.tsx";

function RequireAuth({ children }: { children: JSX.Element }) {
  const userName = localStorage.getItem("userName");
  const pickupPoint = localStorage.getItem("pickupPoint");
  if (!userName || !pickupPoint) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  return (
    <FlyToCartProvider>
      <ModalManager>
        <Router>
          <Routes>
            <Route
              path="/login"
              element={
                <AnimatePresence mode="wait">
                  <motion.div
                    key="login"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2 }}
                  >
                    <LoginPage />
                  </motion.div>
                </AnimatePresence>
              }
            />
            <Route
              path="/*"
              element={
                <AnimatePresence mode="wait">
                  <motion.div
                    key="store"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <RequireAuth>
                      <StorePage />
                    </RequireAuth>
                  </motion.div>
                </AnimatePresence>
              }
            />
          </Routes>
        </Router>
        <FloatingInfo />
      </ModalManager>
    </FlyToCartProvider>
  );
}

export function StorePage() {
  return (
    <>
      <TopTip />
      <FilterableProductTable />
      <FloatingCart />
    </>
  );
}
