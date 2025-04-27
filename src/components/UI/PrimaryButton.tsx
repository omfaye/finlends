"use client";
import { ReactNode, useRef, useState } from "react";
import Link from "next/link";

interface PrimaryButtonProps {
  text: string;
  icon?: ReactNode;
  type?: "button" | "submit" | "reset";
  url?: string; // Add url prop
}

const PrimaryButton = ({ text, icon, type = "button", url }: PrimaryButtonProps) => {
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

  const buttonContent = (
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

  return url ? (
    <Link href={url} className="text-decoration-none">
      {buttonContent}
    </Link>
  ) : (
    buttonContent
  );
};

export default PrimaryButton;