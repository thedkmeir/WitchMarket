import React, {
  createContext,
  useContext,
  useRef,
  useState,
  ReactNode,
  useCallback,
} from "react";
import FlyToCartOverlay from "./FlyToCartOverlay";

type CartTargetType = "icon" | "panel";

export type FlyPayload = {
  image: string;
  from: DOMRect;
  to: DOMRect;
  toComp: CartTargetType | null;
  onComplete?: () => void;
};

type FlyToCartContextType = {
  registerCartTarget: (type: CartTargetType, el: HTMLDivElement | null) => void;
  getCartTargetRect: () => DOMRect | null;
  triggerFly: (payload: FlyPayload) => void;
  // switchCartType: (cartType: CartTargetType) => void; // Optional, for switching cart state
};

const FlyToCartContext = createContext<FlyToCartContextType | undefined>(
  undefined
);

export function useFlyToCart() {
  const ctx = useContext(FlyToCartContext);
  if (!ctx)
    throw new Error("useFlyToCart must be used within FlyToCartProvider");
  return ctx;
}

export function FlyToCartProvider({ children }: { children: ReactNode }) {
  const cartIconRect = useRef<DOMRect | null>(null);
  const cartPanelRect = useRef<DOMRect | null>(null);
  const cartType = useRef<CartTargetType>("icon");
  const [flyPayload, setFlyPayload] = useState<FlyPayload | null>(null);

  const triggerFly = useCallback((payload: FlyPayload) => {
    payload.toComp = cartType.current;
    setFlyPayload(payload);
  }, []);

  // const switchCartType = useCallback((type: CartTargetType) => {
  //   cartType.current = type;
  // }, []);

  const registerCartTarget = useCallback(
    (type: CartTargetType, el: HTMLDivElement | null) => {
      if (!el) {
        if (type === "icon") cartIconRect.current = null;
        if (type === "panel") cartPanelRect.current = null;
        return;
      }
      const rect = el.getBoundingClientRect();
      if (type === "icon") {
        cartIconRect.current = rect;
        cartType.current = "icon";
      }
      if (type === "panel") {
        cartPanelRect.current = rect;
        cartType.current = "panel";
      }
    },
    []
  );

  const getCartTargetRect = useCallback(
    (): DOMRect | null =>
      cartType.current === "icon"
        ? cartIconRect.current
        : cartPanelRect.current,
    []
  );

  return (
    <FlyToCartContext.Provider
      // value={{ registerCartTarget, getCartTargetRect, triggerFly, switchCartType }}
      value={{ registerCartTarget, getCartTargetRect, triggerFly }}
    >
      {children}
      <FlyToCartOverlay fly={flyPayload} clearFly={() => setFlyPayload(null)} />
    </FlyToCartContext.Provider>
  );
}
