"use client";
import Image from "next/image";
import Link from "next/link";
import blogDetails from "@/../public/images/blog_details.png";
import blogDetailsSub from "@/../public/images/blog_details_sub.png";
import blogDetailsVideo from "@/../public/images/blog_details_video.png";
import FadeDown from "@/components/motionEffect/FadeDown";
import FadeTop from "@/components/motionEffect/FadeTop";
import FadeRight from "@/components/motionEffect/FadeRight";
import FadeLeft from "@/components/motionEffect/FadeLeft";
import IconButton from "@/components/UI/IconButton";
import React, { useState } from "react";
import ModalVideo from "react-modal-video";
// import "node_modules/react-modal-video/scss/modal-video.scss";
import "../../../../node_modules/react-modal-video/scss/modal-video.scss";
const BlogDes = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="card card--secondary">
      <FadeDown>
        <div className="card--secondary__thumb">
          <Image src={blogDetails} alt="image" />
        </div>
      </FadeDown>
      <div className="card--secondary__content">
        <FadeTop>
          <div className="card--secondary__content-part">
            <p className="card--secondary__time mb-4">
              <span className="gap-6">
                <i className="bi bi-person-circle"></i>By Admin
              </span>
              <i className="bi bi-dot"></i>
              <span className="gap-6">
                <i className="bi bi-calendar3"></i>12 Jan, 2023
              </span>
              <i className="bi bi-dot"></i>
              <span className="gap-6">
                <i className="bi bi-chat-text"></i>32 Comments
              </span>
            </p>
            <h2 className="mb-4 res-margin-bottom">
              The Benefits of Consolidating Your Student Loans
            </h2>
            <p className="card--secondary__text">
              Managing multiple student loans can be overwhelming, with varying
              interest rates, payment due dates, and loan servicers to keep
              track of. Consolidating your student loans offers several benefits
              that can simplify repayment and potentially save you money. In
              this article, we will explore the advantages of consolidating your
              student loans and how it can positively impact your financial
              situation.
            </p>
          </div>
        </FadeTop>
        <FadeDown>
          <div className="card--secondary__content-part">
            <h3 className="mb-4 res-margin-bottom">Streamlined Repayment</h3>
            <p className="card--secondary__text mb-4">
              By consolidating your student loans, you can combine multiple
              loans into a single loan. This means you'll have only one monthly
              payment to manage, making it easier to stay organized and keep
              track of your repayment progress. It eliminates the hassle of
              dealing with different loan servicers and due dates, simplifying
              your financial management.
            </p>
          </div>
          <div className="card--secondary__content-part">
            <div className="content-part__thumb flex-wrap flex-xxl-nowrap">
              <Image src={blogDetailsSub} alt="image" />
              <div className="content-part__thumb-text">
                <h4>Lower Monthly Payments</h4>
                <p className="mt_20 res-margin-top">
                  Consolidation can potentially lead to lower monthly payments.
                  When you consolidate your loans, you may be eligible for a new
                  repayment plan based on your current income and financial
                  circumstances. This could result in a more affordable monthly
                  payment, giving you more breathing room in your budget.
                </p>
              </div>
            </div>
          </div>
        </FadeDown>
        <FadeTop>
          <div className="card--secondary__content-part">
            <h5 className="mb-4 res-margin-bottom">Fixed Interest Rate</h5>
            <p className="card--secondary__text">
              One of the significant benefits of consolidating your student
              loans is the opportunity to secure a fixed interest rate. Unlike
              variable interest rates that can fluctuate over time, a fixed rate
              remains constant throughout the life of your loan. This stability
              provides peace of mind, as you'll know exactly how much interest
              you'll be paying each month.
            </p>
          </div>
          <div className="card--secondary__video my-4">
            <Image src={blogDetailsVideo} alt="image" />
            <button
              className="popup-video play_button"
              onClick={() => setOpen(true)}
            >
              <i className="bi bi-play"></i>
            </button>
          </div>
        </FadeTop>
        <FadeDown>
          <div className="card--secondary__content-part">
            <h6 className="mb-4 res-margin-bottom">Extended Repayment Term</h6>
            <p className="card--secondary__text">
              Consolidation also allows you to extend the repayment term of your
              loans. By spreading out your payments over a longer period, you
              can reduce the amount you need to pay each month. This can be
              especially helpful if you're experiencing financial challenges or
              need more flexibility in your budget. Consolidating your student
              loans offers numerous benefits, including simplified repayment,
              lower monthly payments, fixed interest rates, extended repayment
              terms, and potential interest savings. However, it's important to
              carefully consider your specific financial situation and evaluate
              the terms and conditions of consolidation options
            </p>
          </div>
        </FadeDown>
        <div className="tag-area">
          <FadeLeft>
            <div className="tag">
              <p className="tag__name">Share -</p>
              <div className="social">
                <Link href="#">
                  <IconButton icon={<i className="bi bi-facebook"></i>} />
                </Link>
                <Link href="#">
                  <IconButton icon={<i className="bi bi-twitter"></i>} />
                </Link>
                <Link href="#">
                  <IconButton icon={<i className="bi bi-pinterest"></i>} />
                </Link>
                <Link href="#">
                  <IconButton icon={<i className="bi bi-twitch"></i>} />
                </Link>
                <Link href="#">
                  <IconButton icon={<i className="bi bi-skype"></i>} />
                </Link>
              </div>
            </div>
          </FadeLeft>
          <FadeRight>
            <div className="tag">
              <p className="tag__name">Tag -</p>
              <div className="tag-content">
                <Link
                  href="#"
                  className="border border-gray py-2 px-3 rounded-5"
                >
                  Loan Comparison
                </Link>
                <Link
                  href="#"
                  className="border border-gray py-2 px-3 rounded-5"
                >
                  Loans
                </Link>
                <Link
                  href="#"
                  className="border border-gray py-2 px-3 rounded-5"
                >
                  Supports
                </Link>
              </div>
            </div>
          </FadeRight>
        </div>
      </div>
      <ModalVideo
        channel="youtube"
        youtube={{ mute: 0, autoplay: 0 }}
        isOpen={isOpen}
        videoId="6stlCkUDG_s"
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export default BlogDes;
