"use client";
import Banner from "@/components/shared/Banner";
import banner from "@/../public/images/reviews_banner.png";
import ReviewCard from "@/components/Pages/LoanReview/ReviewCard";
import {
  categoriesData,
  locationsData,
  starCategory,
  timesData,
} from "../../../../public/data/loanReviewData";
import OutlineButton from "@/components/UI/OutlineButton";
import "react-range-slider-input/dist/style.css";
import FilterOption from "@/components/FilterOption/FilterOption";
import { useState, useRef, useEffect } from "react";

const LoanReviews = () => {
  const refOne = useRef(null);
  const [sideNav, setSideNav] = useState(false);
  const handleSideNav = () => {
    setSideNav(!sideNav);
  };

  const handleClickOutside = (e: MouseEvent) => {
    //@ts-ignore
    if (!refOne?.current?.contains(e.target)) {
      setSideNav(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div>
      <Banner
        heading={"Loan Reviews"}
        items={["Home", "Loan Reviews", "Loan Review"]}
        banner_img={banner}
      ></Banner>
      <section className="loan-reviews loan-reviews--tertiary section">
        <div className="container">
          <div className="row justify-content-center">
            <div
              ref={refOne}
              className="col-12 col-lg-11 col-xl-9 col-xxl-4 marginLeft"
            >
              <div className="d-inline-flex items-start mb-4 d-xxl-none">
                <button className="sidebar_btn">
                  <span
                    onClick={handleSideNav}
                    className="d-flex align-items-center gap-2"
                  >
                    <i className="bi bi-layout-text-sidebar"></i>
                    <span>Sidebar Filter</span>
                  </span>
                </button>
              </div>
              <div
                className={`sidebar-filter cus_scrollbar sidebar-xxl-fixed cardShadow ${
                  sideNav ? "show" : ""
                }`}
              >
                <div className="sidebar-filter__part">
                  <h4 className="sidebar-filter__title">Filter</h4>
                </div>
                <div className="sidebar-filter__part">
                  <form
                    method="POST"
                    id="filter_search"
                    className="filter__search"
                  >
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        required
                      />
                      <button type="submit" className="search_icon">
                        <i className="bi bi-search"></i>
                      </button>
                    </div>
                  </form>
                </div>
                <div className="sidebar-filter__part">
                  <h5 className="sidebar-filter__part-title">
                    Types of Loan Categories
                  </h5>
                  <ul className="query">
                    {categoriesData.map(({ category, id, number }, i) => (
                      <li key={id} className="query__list">
                        <span className="query__label">
                          <input
                            type="checkbox"
                            name="query_personal"
                            id={`${number}+${i}`}
                            defaultChecked
                          />
                          <label htmlFor={`${number}+${i}`}>{category}</label>
                        </span>
                        <div className="query_value">{number}</div>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Price Range  */}
                <div className="sidebar-filter__part">
                  <h5 className="sidebar-filter__part-title">Pricing scale</h5>
                  <FilterOption />
                </div>

                <div className="sidebar-filter__part">
                  <h5 className="sidebar-filter__part-title">
                    How Many Time For Loan !
                  </h5>
                  <ul className="query">
                    {timesData.map((data, i) => (
                      <li key={data.id} className="query__list">
                        <span className="query__label">
                          <input
                            type="checkbox"
                            name="query_time"
                            id={`${data.number}+${i}`}
                            defaultChecked
                          />
                          <label htmlFor={`${data.number}+${i}`}>
                            {data.time}
                          </label>
                        </span>
                        <div className="query_value">{data.number}</div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="sidebar-filter__part">
                  <h5 className="sidebar-filter__part-title">Star Category</h5>
                  <ul className="query">
                    {starCategory.map(({ star, id, number }, i) => (
                      <li key={id} className="query__list">
                        <span className="query__label">
                          <input
                            type="radio"
                            id={`${number}+${i}`}
                            name="radio-group"
                          />
                          <label htmlFor={`${number}+${i}`} className="gap-2">
                            <i className="bi bi-star-fill"></i>
                            {star}
                          </label>
                        </span>
                        <div className="query_value">{number}</div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="sidebar-filter__part">
                  <h5 className="sidebar-filter__part-title">Location</h5>
                  <ul className="query">
                    {locationsData.map(({ id, country, number }, i) => (
                      <li key={id} className="query__list">
                        <span className="query__label">
                          <input
                            type="checkbox"
                            name="query_all"
                            id={`${number}+${i}`}
                            defaultChecked
                          />
                          <label htmlFor={`${number}+${i}`}>{country}</label>
                        </span>
                        <div className="query_value">{number}</div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <OutlineButton text=" Reset Filters" />
                </div>
              </div>
            </div>
            <ReviewCard />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoanReviews;
