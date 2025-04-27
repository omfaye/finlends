"use client";
import { useState, useEffect } from "react";

interface DirectionState {
  dir: "ltr" | "rtl";
}

const RTLButton = () => {
  const [dir, setDir] = useState<DirectionState["dir"]>("ltr");

  useEffect(() => {
    const storedDir = localStorage.getItem("dir");
    if (storedDir) {
      setDir(storedDir as DirectionState["dir"]);
      document.documentElement.dir = storedDir;
    }
  }, []);

  const toggleDirection = (): void => {
    const newDir = dir === "ltr" ? "rtl" : "ltr";
    setDir(newDir);
    localStorage.setItem("dir", newDir);
    document.documentElement.dir = newDir;
  };
  return (
    <button id="rtlBtn" onClick={toggleDirection}>
      {dir === "ltr" ? "RTL" : "LTR"}
    </button>
  );
};

export default RTLButton;
