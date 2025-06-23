// FlyToCartContext.tsx
import React, {
  createContext, useContext, useRef, useState, ReactNode, useCallback
} from "react";
import FlyToCartOverlay from "./FlyToCartOverlay";

export type CartTargetType = "icon" | "panel";
export type FlyPayload = {
  image: string;
  from: DOMRect;
  to: DOMRect;
  toComp: CartTargetType | null;
  onComplete?: () => void;
  id?: string;
};

type FlyToCartContextType = {
  registerCartTarget: (type: CartTargetType, el: HTMLDivElement | null) => void;
  getCartTargetRect: () => DOMRect | null;
  triggerFly: (payload: FlyPayload) => void;
};

const FlyToCartContext = createContext<FlyToCartContextType | undefined>(undefined);

export function useFlyToCart() {
  const ctx = useContext(FlyToCartContext);
  if (!ctx) throw new Error("useFlyToCart must be used within FlyToCartProvider");
  return ctx;
}

export function FlyToCartProvider({ children }: { children: ReactNode }) {
  const cartIconRect = useRef<DOMRect | null>(null);
  const cartPanelRect = useRef<DOMRect | null>(null);
  const cartType = useRef<CartTargetType>("icon");
  const [flyPayloads, setFlyPayloads] = useState<FlyPayload[]>([]);

  const triggerFly = useCallback((payload: FlyPayload) => {
    const id = Math.random().toString(36).substring(2, 9);
    setFlyPayloads(arr => [...arr, { ...payload, id, toComp: cartType.current }]);
  }, []);

  const clearFly = useCallback((id: string) => {
    setFlyPayloads(arr => arr.filter(p => p.id !== id));
  }, []);

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
      cartType.current === "icon" ? cartIconRect.current : cartPanelRect.current,
    []
  );

  return (
    <FlyToCartContext.Provider value={{ registerCartTarget, getCartTargetRect, triggerFly }}>
      {children}
      <FlyToCartOverlay flyPayloads={flyPayloads} clearFly={clearFly} />
    </FlyToCartContext.Provider>
  );
}