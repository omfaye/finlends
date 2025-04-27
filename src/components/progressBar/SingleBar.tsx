"use client";
import { useEffect } from "react";

const SingleBar = () => {
  useEffect(() => {
    const progressBar = document.getElementById("run");
    if (progressBar) {
      const observer = new IntersectionObserver((bars) => {
        bars.forEach((bar) => {
          if (bar.isIntersecting) {
            bar.target.classList.add("prog-percentage");
          } else {
            bar.target.classList.remove("prog-percentage");
          }
        });
      });
      observer.observe(progressBar);
    }
  }, []);
  return (
    <div className="progress-area mt_32">
      <p className="progress-title headingFive">Marketing</p>
      <div className="prog-bar">
        <div id="run" className="progWidth-85"></div>
      </div>
    </div>
  );
};

export default SingleBar;
