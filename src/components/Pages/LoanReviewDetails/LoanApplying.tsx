import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { Applyings } from "../../../../public/data/loanReviewDetails";
import FadeRight from "@/components/motionEffect/FadeRight";
import PrimaryButton from "@/components/UI/PrimaryButton";
import IconButton from "@/components/UI/IconButton";

const LoanApplying = () => {
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
    <div className="col-12 col-xl-4 " ref={refOne}>
      <div className="d-inline-block d-xl-none mb-4 ">
        <button className="sidebar_btn">
          <span
            onClick={handleSideNav}
            className="d-flex align-items-center gap-2"
          >
            <i className="bi bi-layout-text-sidebar"></i> <span>Loan Info</span>
          </span>
        </button>
      </div>
      <div
        className={`sidebar sidebar_fixed sidebar-xl-fixed review_scrollbar cardShadow ${
          sideNav ? "show" : ""
        }`}
      >
        <div className="sidebar__part">
          <h4 className="sidebar__part-title">Loan Applying Info</h4>
          <div className="minimum-loan mb-4">
            <p className="minimum-loan__title">Minimum Loan Start</p>
            <span className="fs-4">$199</span>
          </div>
          <ul>
            {Applyings.map((item) => (
              <li key={item.id}>
                <i className="bi bi-check2-circle"></i>
                {item.title}
              </li>
            ))}
          </ul>
          <div className="text-center mt_40">
            <Link href="#">
              <PrimaryButton
                text=" Visit Site"
                icon={<i className="bi bi-arrow-up-right"></i>}
              />
            </Link>
            <Link
              href="/faqs"
              className="d-flex align-items-center justify-content-center mt_12"
            >
              <i className="bi bi-dot"> </i>Terms & Conditions Apply
            </Link>
            <div className="gap-3 mt-4 justify-content-center">
              <Link href="#" aria-label="icon">
                <IconButton icon={<i className="bi bi-heart"></i>} />
              </Link>
              <Link href="#" className="">
                <IconButton icon={<i className="bi bi-arrow-left-right"></i>} />
              </Link>
            </div>
          </div>
        </div>
        <div className="sidebar__part">
          <h4 className="sidebar__part-title">Share with</h4>
          <FadeRight>
            <div className="social mt_32">
              <Link href="#" aria-label="icon">
                <IconButton icon={<i className="bi bi-facebook"></i>} />
              </Link>
              <Link href="#" aria-label="icon">
                <IconButton icon={<i className="bi bi-twitter"></i>} />
              </Link>
              <Link href="#" aria-label="icon">
                <IconButton icon={<i className="bi bi-pinterest"></i>} />
              </Link>
              <Link href="#" aria-label="icon">
                <IconButton icon={<i className="bi bi-twitch"></i>} />
              </Link>
              <Link href="#" aria-label="icon">
                <IconButton icon={<i className="bi bi-skype"></i>} />
              </Link>
            </div>
          </FadeRight>
        </div>
      </div>
    </div>
  );
};

export default LoanApplying;
