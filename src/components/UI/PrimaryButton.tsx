"use client";
import { ReactNode, useRef, useState } from "react";

interface PrimaryButtonProps {
  text: string;
  icon?: ReactNode;
  type?: "button" | "submit" | "reset";
}

const PrimaryButton = ({ text, icon, type = "button" }: PrimaryButtonProps) => {
  const [spanStyle, setSpanStyle] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (btnRef.current) {
      const parentOffset = btnRef.current.getBoundingClientRect();
      const relX = e.clientX - parentOffset.left;
      const relY = e.clientY - parentOffset.top;
      setSpanStyle({ top: relY, left: relX });
    }
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (btnRef.current) {
      const parentOffset = btnRef.current.getBoundingClientRect();
      const relX = e.clientX - parentOffset.left;
      const relY = e.clientY - parentOffset.top;
      setSpanStyle({ top: relY, left: relX });
    }
  };

  return (
    <button
      type={type}
      className="btn-filled"
      ref={btnRef}
      onMouseEnter={handleMouseEnter}
      onMouseOut={handleMouseOut}
    >
      <span className="position-relative z-3">
        {text} {icon}
      </span>
      <span className="ball" style={spanStyle}></span>
    </button>
  );
};

export default PrimaryButton;