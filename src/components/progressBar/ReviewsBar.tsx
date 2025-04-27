"use client";
import React, { useEffect } from "react";
import { reviewsBars } from "../../../public/data/loanReviewDetails";

const ReviewsBar = () => {
  useEffect(() => {
    const progressBar = document.querySelectorAll(".run");
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
      progressBar.forEach((bar) => observer.observe(bar));
    }
  }, []);
  return (
    <div className="average-reviews">
      <h4 className="average-reviews__title">Average Reviews</h4>
      <div className="gap-9 flex-wrap flex-md-nowrap average-reviews__content">
        <div className="average-reviews__card">
          <p className="average-reviews__count">
            <span className="headingTwo">4.9</span>/5
          </p>
          <div className="star_review">
            <i className="bi bi-star-fill star-active"></i>
            <i className="bi bi-star-fill star-active"></i>
            <i className="bi bi-star-fill star-active"></i>
            <i className="bi bi-star-fill star-active"></i>
            <i className="bi bi-star-half star-active"></i>
          </div>
          <p>26 Rating</p>
        </div>
        <div className="progress-area">
          {reviewsBars.map((bar) => {
            const { review, id, parcent, widthClass } = bar;
            return (
              <div key={id} className="progress-area__part">
                <span className="gap-1">
                  {review} <i className="bi bi-star-fill star-active"></i>
                </span>
                <div className="prog-bar">
                  <div className={`run ${widthClass}`}></div>
                </div>
                <span>{parcent}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReviewsBar;
