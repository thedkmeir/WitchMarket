import { useState, useEffect } from "react";
import { rangeService } from "../services/RangeService";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css"; // <- REQUIRED
import "./PriceRangeSlider.scss"; // your custom overrides

export default function PriceRangeSlider() {
  const minPrice = rangeService.getInitRangeLowest();
  const maxPrice = rangeService.getInitRangeHighest();

  const [range, setRange] = useState<[number, number]>([minPrice, maxPrice]);

  function handleRangeChange(value: [number, number]) {
    rangeService.setRangeNumbers(value);
    setRange(value);
  }

  function handleRemoteRangeChange(value: number[]) {
    if (value[0] !== range[0] || value[1] !== range[1]) {
      setRange([value[0], value[1]]);
    }
  }

  useEffect(() => {
    const unsubscribe = rangeService.subscribe(handleRemoteRangeChange);
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="priceRangeSlider">
      <span style={{ marginRight: "8px", paddingLeft: "4px" }}>
        {range[0]}$
      </span>
      <RangeSlider
        min={minPrice}
        max={maxPrice}
        step={1}
        value={range}
        onInput={(value) => handleRangeChange(value as [number, number])}
        className="customRangeSlider"
      />
      <span style={{ marginLeft: "8px", paddingRight: "4px" }}>
        {range[1]}$
      </span>
    </div>
  );
}
