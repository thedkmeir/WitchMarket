import { useState, useEffect } from "react";
import { rangeService } from "../services/RangeService";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import "./PriceRangeSlider.scss";

export default function PriceRangeSlider() {
  const minPrice = rangeService.getInitRangeLowest();
  const maxPrice = rangeService.getInitRangeHighest();

  const [range, setRange] = useState<[number, number]>(
    rangeService.getRangeNumbers() as [number, number]
  );

  function handleRangeChange(value: [number, number]) {
    rangeService.setRangeNumbers(value);
  }

  useEffect(() => {
    const unsubscribe = rangeService.subscribe("PriceRangeSlider", () => {
      const value = rangeService.getRangeNumbers() as [number, number];
      setRange([value[0], value[1]]);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="priceRangeSlider">
      <span style={{ marginRight: "8px" }}>{range[0]}$</span>
      <RangeSlider
        min={minPrice}
        max={maxPrice}
        step={1}
        value={range}
        onInput={(value) => handleRangeChange(value as [number, number])}
        className="customRangeSlider"
      />
      <span style={{ marginLeft: "8px" }}>{range[1]}$</span>
    </div>
  );
}
