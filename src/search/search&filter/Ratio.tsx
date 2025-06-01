import { useEffect, useState } from "react";
import { dataService } from "../services/DataService";

export default function Ratio() {
  const [ratio, setRatio] = useState<string>(getStringRatio());

  function getStringRatio(): string {
    return (
      dataService.getStoreCatalogFilteredCount() +
      " / " +
      dataService.getStoreCatalogTotalCount()
    );
  }

  useEffect(() => {
    const unsubscribe = dataService.subscribe("PriceRangeSlider", () => {
      setRatio(getStringRatio());
    });
    return () => unsubscribe();
  }, []);
  
  return (<div>{ratio}</div>);
}
