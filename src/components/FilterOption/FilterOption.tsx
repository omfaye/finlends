"use client";
import { useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

const FilterOption = () => {
  const [value, setValue] = useState([200, 700]);
  return (
    <div>
      <div>
        <RangeSlider value={value} onInput={setValue} min={0} max={1000} />
      </div>
      <div className="d-flex align-items-center justify-content-center gap-3 mt-3">
        <span>${value[0]}</span>

        <span>-</span>
        <span>${value[1]}</span>
      </div>
    </div>
  );
};
export default FilterOption;
