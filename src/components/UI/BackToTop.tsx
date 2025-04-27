"use client";
import { useState, useEffect } from "react";

const BackToTop = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    });
  }, []);

  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <button
      className="scrollToTop topActive "
      style={{ display: scrolled ? "block" : "none" }}
      onClick={goTop}
    >
      <i className="bi bi-chevron-double-up"></i>
    </button>
  );
};

export default BackToTop;
