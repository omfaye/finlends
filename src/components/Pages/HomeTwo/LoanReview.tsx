import Link from "next/link";
import React from "react";
import { loanReviews } from "../../../../public/data/homePageData";
import Image from "next/image";
import title from "@/../public/images/title_vector.png";
import FadeDown from "@/components/motionEffect/FadeDown";
import FadeTop from "@/components/motionEffect/FadeTop";
import PrimaryButton from "@/components/UI/PrimaryButton";
import OutlineButton from "@/components/UI/OutlineButton";

const LoanReview = () => {
  return (
    <section className="loan-reviews section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-7 col-xxl-6">
            <div className="section__header">
              <FadeDown>
                <span className="section__header-sub-title headingFour">
                  <Image src={title} alt="vector" />
                  Loan Reviews
                </span>
                <h2 className="section__header-title">
                  In-depth Analysis for Informed Borrowing Decisions
                </h2>
              </FadeDown>
              <FadeTop>
                <p className="section__header-content">
                  Welcome to our comprehensive loan reviews section, where we
                  provide you with detailed and unbiased analyses of various
                  loan options.
                </p>
              </FadeTop>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-11 col-xl-9 col-xxl-8">
            <div className="d-flex flex-column gap-4">
              {loanReviews.map((review) => (
                <FadeDown key={review.id}>
                  <div className="loan-reviews_card card">
                    <div className="loan-reviews__part-one">
                      <div className="loan-reviews__thumb">
                        <Image src={review.logo} alt="image" />
                      </div>
                      <div className="loan-reviews__review">
                        <p className="rating"> 4.9</p>
                        <div className="d-flex gap-2 flex-column">
                          <div className="star_review">
                            <i className="bi bi-star-fill star-active"></i>
                            <i className="bi bi-star-fill star-active"></i>
                            <i className="bi bi-star-fill star-active"></i>
                            <i className="bi bi-star-fill star-active"></i>
                            <i className="bi bi-star-half star-active"></i>
                          </div>
                          <p className="fs-small">Average Review</p>
                        </div>
                      </div>
                    </div>
                    <div className="loan-reviews__part-two">
                      <div className="reviews-heading">
                        <h4 className="reviews-heading__title">
                          {review.title}
                        </h4>
                        <p className="reviews-heading__content">
                          {review.heading}
                        </p>
                      </div>
                      <div className="reviews-inner">
                        <ul>
                          {review.reviewList?.map((item: any) => (
                            <li key={item.id}>
                              <i className="bi bi-check2-circle"></i>
                              {item.heading}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="loan-reviews__part-three">
                      <div className="btn-group">
                        <Link href="#">
                          <PrimaryButton
                            text=" Visit Site"
                            icon={<i className="bi bi-arrow-up-right"></i>}
                          />
                        </Link>

                        <Link href="/loan_reviews/HomeLoansMortgages">
                          <OutlineButton
                            text="Read On"
                            icon={<i className="bi bi-arrow-up-right"></i>}
                          />
                        </Link>

                        <Link href="/faqs" className="conditions_apply">
                          Terms & Conditions Apply
                        </Link>
                      </div>
                    </div>
                  </div>
                </FadeDown>
              ))}
            </div>
          </div>
          <div className="col-12">
            <div className="section__cta">
              <Link href="/loan_reviews" className="see_all">
                <PrimaryButton
                  text="See All Review Loan"
                  icon={<i className="bi bi-arrow-up-right"></i>}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoanReview;
