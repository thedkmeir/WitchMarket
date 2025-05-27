import { ReactNode, useState } from "react";
import "./CountControl.scss";
import { number } from "framer-motion";
import CircularIconButton from "./buttons/CircularIconButton";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function CountControl({
  onChange,
  count,
  iconSize
}: {
  onChange?: (count: number) => void;
  count?: number | null;
  iconSize?: number;
}) {

  if (count === null || count === undefined) count = 1;
  
  return (
    <>
      <div className="countControl">
        <CircularIconButton
          onChange={() => {
            onChange && onChange(count + 1);
          }}
          icon={<Plus size={iconSize ? iconSize : 18} strokeWidth={1.5} />}
        ></CircularIconButton>
        <div>{count}</div>
        <CircularIconButton
          onChange={() => {
            if (count <= 1) return;
            onChange && onChange(count - 1);
          }}
          icon={<Minus size={iconSize ? iconSize : 18} strokeWidth={1.5} />}
        ></CircularIconButton>
      </div>
    </>
  );
}
