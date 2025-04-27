"use client";

import Banner from "@/components/shared/Banner";
import banner from "@/../public/images/reviews_banner.png";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { loanReviewsData, categoriesData, timesData, starCategory, locationsData } from "../../../../../public/data/loanReviewData";
import Image from "next/image";
import FadeTop from "@/components/motionEffect/FadeTop";
import FadeDown from "@/components/motionEffect/FadeDown";
import {
  termCons,
  termPros,
  terms,
} from "../../../../../public/data/loanReviewDetails";
import Reviews from "@/components/Pages/LoanReviewDetails/Reviews";
import ReviewAccording from "@/components/Pages/LoanReviewDetails/ReviewAccording";
import LoanApplying from "@/components/Pages/LoanReviewDetails/LoanApplying";

// Loan form components
import HomeLoanApplication from "@/components/Pages/Home/HomeLoanApplication";
import CarLoanApplication from "@/components/Pages/Home/CarLoanApplication";
import PersonalLoanApplication from "@/components/Pages/Home/PersonalLoanApplication";
import EducationLoanApplication from "@/components/Pages/Home/EducationLoanApplication";
import BusinessLoanApplication from "@/components/Pages/Home/BusinessLoanApplication";
import HomeLoanBTTopUp from "@/components/Pages/Home/HomeLoanBTTopUp";
import LoanAgainstProperty from "@/components/Pages/Home/LoanAgainstProperty";
import LoanAgainstPropertyTopUp from "@/components/Pages/Home/LoanAgainstPropertyTopUp";
import CashCreditODApplication from "@/components/Pages/Home/CashCreditODApplication";
import SchoolFundingLoanApplication from "@/components/Pages/Home/SchoolFundingLoanApplication";
import ShopPurchaseLoanApplication from "@/components/Pages/Home/ShopPurchaseLoanApplication";
import BuilderProjectFinanceApplication from "@/components/Pages/Home/BuilderProjectFinanceApplication";

const formComponentMap: Record<string, React.ComponentType<any>> = {
  HomeLoan: HomeLoanApplication,
  CarLoan: CarLoanApplication,
  PersonalLoan: PersonalLoanApplication,
  EducationLoan: EducationLoanApplication,
  BusinessLoan: BusinessLoanApplication,
  HomeLoanBTTopUp: HomeLoanBTTopUp,
  LoanAgainstProperties: LoanAgainstProperty,
  LoanAgainstPropertiesBTTopUp: LoanAgainstPropertyTopUp,
  CashCreditOverDraft: CashCreditODApplication,
  SchoolFunding: SchoolFundingLoanApplication,
  ShopPurchaseLoan: ShopPurchaseLoanApplication,
  BuilderProjectFinance: BuilderProjectFinanceApplication,
};

const LoanDetails = () => {
  const { name } = useParams();
  const [bodyData, setBodyData] = useState<any>({});

  const FormComponent = formComponentMap[name as string] || null;

  useEffect(() => {
    const products = loanReviewsData.filter(
      (product) => product.title.split(" ").join("") === name
    );
    if (products.length > 0) {
      setBodyData(products[0]);
    } else {
      setBodyData({});
    }
  }, [name]);

  // Refs for scrollable sections
  const benefitsRef = useRef<HTMLDivElement>(null);
  const statisticsRef = useRef<HTMLDivElement>(null);
  const whoCanApplyRef = useRef<HTMLDivElement>(null);
  const thingsThatMatterRef = useRef<HTMLDivElement>(null);
  const papersNeededRef = useRef<HTMLDivElement>(null);
  const chargesRef = useRef<HTMLDivElement>(null);
  const repaymentRef = useRef<HTMLDivElement>(null);
  const prosConsRef = useRef<HTMLDivElement>(null);
  const faqs = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (!bodyData?.title) {
    return (
      <div className="container mx-auto px-4 py-6">
        <h2>Loan Not Found</h2>
        <p>Please check the loan name or try another loan.</p>
      </div>
    );
  }

  return (
    <>
      <div>
        <Banner
          heading={bodyData?.title || "Loan Details"}
          items={["Home", "Loan Reviews", "Details"]}
          banner_img={banner}
        />

        {/* Form Component */}
        {FormComponent && (
          <div className="container mx-auto px-4 py-6">
            <div className="w-full max-w-5xl mx-auto">
              <FormComponent />
            </div>
          </div>
        )}

        {/* Sticky Scroll Navigation */}
        <div
          className="sticky top-0 bg-white border-b shadow-sm z-50"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1000,
          }}
        >
          <div className="container py-3 d-flex flex-wrap gap-2 justify-content-center">
            <button
              className="btn btn-outline-primary"
              onClick={() => scrollToSection(benefitsRef)}
            >
              Loan Benefits
            </button>
            {/* <button
              className="btn btn-outline-primary"
              onClick={() => scrollToSection(statisticsRef)}
            >
              Loan Statistics
            </button> */}
            <button
              className="btn btn-outline-primary"
              onClick={() => scrollToSection(whoCanApplyRef)}
            >
              Who Can Apply
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => scrollToSection(thingsThatMatterRef)}
            >
              Things That Matter
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => scrollToSection(papersNeededRef)}
            >
              Papers Needed
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => scrollToSection(chargesRef)}
            >
              Charges
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => scrollToSection(prosConsRef)}
            >
              Pros & Cons
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => scrollToSection(faqs)}
            >
              Common Questions
            </button>
          </div>
        </div>

        <section className="reviews-details section">
          <div className="container">
            <div className="row">
              <div className="col-12 col-xl-12 order-1 order-xl-0">
                <div className="reviews-details__area">
                  {/* Loan Header Section */}
                  <div className="reviews-details__part">
                    <FadeDown>
                      <div className="loan-reviews loan-reviews--quaternary">
                        <div className="loan-reviews_card card">
                          <div className="loan-reviews__part-one">
                            <div className="loan-reviews__thumb">
                              {bodyData?.logo && (
                                <Image
                                  width={172}
                                  height={96}
                                  src={bodyData.logo}
                                  alt="image"
                                />
                              )}
                            </div>
                            <div className="loan-reviews__review">
                              <p className="rating">4.9</p>
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
                                {bodyData.title}
                              </h4>
                              <p className="reviews-heading__content">
                                {bodyData.heading}
                              </p>
                            </div>
                            <div className="reviews-inner">
                              <ul>
                                {bodyData.reviewList?.map((item: any) => (
                                  <li key={item.id}>
                                    <i className="bi bi-check2-circle"></i>{" "}
                                    {item.heading}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </FadeDown>
                  </div>

                  {/* Benefits Section */}
                  <div ref={benefitsRef}>
                    <FadeTop>
                      <div className="section__content">
                        <div className="card section__card">
                          <h2 className="section__content-title">
                            The Benefits of {bodyData.title}
                          </h2>
                          <p className="section__content-text">
                            At FINVIEW, we provide comprehensive and unbiased loan
                            reviews to help you navigate the complex world of
                            financial lending. Explore the key advantages of choosing
                            {bodyData.title} for your financial needs.
                          </p>
                        </div>
                      </div>
                    </FadeTop>
                  </div>

                  {/* Loan Statistics Section */}
                  {/* <div ref={statisticsRef}>
                    <FadeTop>
                      <div className="section__content">
                        <div className="card section__card">
                          <h2 className="section__content-title">Loan Statistics</h2>
                          <div className="row">
                            <div className="col-md-6">
                              <h3>Loan Categories</h3>
                              <ul className="list-disc ml-6 mt-4 space-y-2">
                                {categoriesData.map((category) => (
                                  <li key={category.id}>
                                    {category.category}: {category.number} loans
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="col-md-6">
                              <h3>Processing Times</h3>
                              <ul className="list-disc ml-6 mt-4 space-y-2">
                                {timesData.map((time) => (
                                  <li key={time.id}>
                                    {time.time}: {time.number} loans
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="row mt-4">
                            <div className="col-md-6">
                              <h3>Star Ratings</h3>
                              <ul className="list-disc ml-6 mt-4 space-y-2">
                                {starCategory.map((star) => (
                                  <li key={star.id}>
                                    {star.star}: {star.number} reviews
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="col-md-6">
                              <h3>Locations</h3>
                              <ul className="list-disc ml-6 mt-4 space-y-2">
                                {locationsData.map((location) => (
                                  <li key={location.id}>
                                    {location.country}: {location.number} loans
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </FadeTop>
                  </div> */}

                  {/* Who Can Apply Section */}
                  <div ref={whoCanApplyRef}>
                    <FadeDown>
                      <div className="section__content">
                        <div className="card section__card">
                          <h2 className="section__content-title">Who Can Apply</h2>
                          <p className="section__content-text">
                            To apply for {bodyData.title}, you must meet the following eligibility criteria:
                          </p>
                          <ul className="list-disc ml-6 mt-4 space-y-2">
                            {bodyData.whoCanApply?.map((criteria: string, index: number) => (
                              <li key={index}>{criteria}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </FadeDown>
                  </div>

                  {/* Things That Matter Section */}
                  <div ref={thingsThatMatterRef}>
                    <FadeTop>
                      <div className="section__content">
                        <div className="card section__card">
                          <h2 className="section__content-title">Things That Matter</h2>
                          <p className="section__content-text">
                            Before applying for {bodyData.title}, consider these key factors:
                          </p>
                          <ul className="list-disc ml-6 mt-4 space-y-2">
                            {bodyData.thingsThatMatter?.map((factor: string, index: number) => (
                              <li key={index}>{factor}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </FadeTop>
                  </div>

                  {/* Papers Needed Section */}
                  <div ref={papersNeededRef}>
                    <FadeDown>
                      <div className="section__content">
                        <div className="card section__card">
                          <h2 className="section__content-title">Papers Needed</h2>
                          <p className="section__content-text">
                            Prepare the following documents to streamline your {bodyData.title} application:
                          </p>
                          <ul className="list-disc ml-6 mt-4 space-y-2">
                            {bodyData.papersNeeded?.map((paper: string, index: number) => (
                              <li key={index}>{paper}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </FadeDown>
                  </div>

                  {/* Charges Section */}
                  <div ref={chargesRef}>
                    <FadeDown>
                      <div className="card charges__card flex-column flex-xxl-row">
                        <h2 className="section__content-title">Charges</h2>
                        <div className="charges__part">
                          <span className="charges__part-percentage">{bodyData.charges?.interestRate}</span>
                          <div className="charges__part-content">
                            <p className="charges__part-title">Interest Rate</p>
                            <p className="fs-small">Current interest rate for loan</p>
                          </div>
                        </div>
                        <div className="charges__part">
                          <span className="charges__part-percentage">{bodyData.charges?.loanAmountRange}</span>
                          <div className="charges__part-content">
                            <p className="charges__part-title">Loan Amount Range</p>
                            <p className="fs-small">Min & max loan range</p>
                          </div>
                        </div>
                        <div className="charges__part">
                          <span className="charges__part-percentage">{bodyData.charges?.fees}</span>
                          <div className="charges__part-content">
                            <p className="charges__part-title">Fees & Charges</p>
                            <p className="fs-small">Loan-related charges</p>
                          </div>
                        </div>
                      </div>
                    </FadeDown>
                  </div>

                  {/* Repayment Terms Section */}
                  <div ref={repaymentRef}>
                    <FadeTop>
                      <div className="section__content">
                        <div className="card section__card">
                          <h3 className="section__content-title">Repayment Terms</h3>
                        </div>
                        <div className="card repayment__card p-6">
                          <ol className="number space-y-4">
                            {terms.map((term) => (
                              <li key={term.id} className="text-lg font-medium">
                                {term.title}
                                <ol className="bullet mt-2 ml-6">
                                  <li className="text-base text-gray-600">{term.des}</li>
                                </ol>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    </FadeTop>
                  </div>

                  {/* Pros & Cons Section */}
                  <div ref={prosConsRef}>
                    <FadeTop>
                      <div className="card pro__card">
                        <div className="pro__part">
                          <h4>
                            <i className="bi bi-check-circle-fill"></i> Pros
                          </h4>
                          <ul>
                            {bodyData.pros?.map((pros: string, index: number) => (
                              <li key={index}>
                                <i className="bi bi-check2"></i> {pros}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="pro__part free">
                          <h4>
                            <i className="bi bi-x-circle-fill"></i> Cons
                          </h4>
                          <ul>
                            {bodyData.cons?.map((cons: string, index: number) => (
                              <li key={index}>
                                <i className="bi bi-x-lg"></i> {cons}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </FadeTop>
                  </div>

                  {/* Reviews Section */}
                  <div className="reviews-details__part">
                    <ReviewAccording />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LoanDetails;