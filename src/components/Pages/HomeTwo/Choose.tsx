// import Image from "next/image";
// import title from "@/../public/images/title_vector.png";
// import choose from "@/../public/images/choose_us2.png";
// import Link from "next/link";
// import { chooses } from "../../../../public/data/homeTwoData";
// import FadeTop from "@/components/motionEffect/FadeTop";
// import FadeDown from "@/components/motionEffect/FadeDown";
// import PrimaryButton from "@/components/UI/PrimaryButton";

// const Choose = () => {
//   return (
//     <section className="why-choose section">
//       <div className="container">
//         <div className="row align-items-center justify-content-center justify-content-lg-between gy-5 gy-lg-0">
//           <div className="col-12 col-sm-8 col-lg-6 col-xxl-5 order-1 order-lg-0">
//             <div className="how-works__thumbs previewShapeY unset-xxl-left me-4 me-xxl-0">
//               <Image src={choose} alt="image" />
//             </div>
//           </div>
//           <div className="col-12 col-lg-6 col-xxl-6">
//             <div className="section__content">
//               <FadeTop>
//                 <span className="section__content-sub-title headingFour">
//                   <Image src={title} alt="vector" />
//                   Why Choose Us
//                 </span>
//                 <h2 className="section__content-title">
//                   Unlocking Opportunities for Your Success Loan Solutions
//                 </h2>
//               </FadeTop>
//               <FadeDown>
//                 <p className="section__content-text">
//                   Our dedicated team of experts conducts thorough research and
//                   analysis to provide you with comprehensive and unbiased
//                   reviews of various loan options.
//                 </p>
//               </FadeDown>

//               <FadeTop>
//                 <div className="section__content-inner">
//                   {chooses.map((choose) => (
//                     <div key={choose.id} className="card">
//                       <div className="card__icon">
//                         <Image
//                           src={choose.img}
//                           alt="icon"
//                           width={36}
//                           height={36}
//                         />
//                       </div>
//                       <div className="card__content">
//                         <h4 className="card__title">{choose.title}</h4>
//                         <p className="fs-small">{choose.des}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </FadeTop>
//               <FadeDown>
//                 <Link href="/loan_reviews" className=" d-inline-flex mt_40">
//                   <PrimaryButton
//                     text=" Read On"
//                     icon={<i className="bi bi-arrow-up-right"></i>}
//                   />
//                 </Link>
//               </FadeDown>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Choose;

import Image from "next/image";
import React from "react";
import arrow from "@/../public/images/hero_vector_arrow.png";
import choose_vector from "@/../public/images/choose_vector.png";
import choose_us from "@/../public/images/choose_us.png";
import tittle from "@/../public/images/title_vector.png";
import Link from "next/link";
import { loanReviews } from "../../../../public/data/homePageData";
import FadeDown from "@/components/motionEffect/FadeDown";
import FadeTop from "@/components/motionEffect/FadeTop";
import PrimaryButton from "@/components/UI/PrimaryButton";
import OutlineButton from "@/components/UI/OutlineButton";

const ChooseUs = () => {
  return (
    <section className="choose-us ">
      <div className="animation">
        <Image src={arrow} alt="Image" />
        <Image src={choose_vector} alt="Image" />
      </div>
      <div className="container">
        <div className="row gy-5 gy-lg-0 justify-content-between align-items-center section">
          <div className="col-12 col-md-8 col-lg-5 mx-auto mx-lg-0 order-1 order-lg-0">
            <FadeTop>
              <div className="choose-us__thumb me-xl-4 me-xxl-0">
                <Image src={choose_us} alt="images" />
              </div>
            </FadeTop>
          </div>
          <div className="col-12 col-lg-7 col-xxl-6">
            <div className="section__content ms-lg-4 ms-xl-0">
              <FadeDown>
                <span className="section__content-sub-title headingFour">
                  <Image src={tittle} alt="vector" /> Why Choose Us
                </span>
                <h2 className="section__content-title">
                  Experience Excellence in Loan Review and Comparison
                </h2>
              </FadeDown>
              <FadeTop>
                <p className="section__content-text">
                  Our dedicated team of experts conducts thorough research and
                  analysis to provide you with comprehensive and unbiased
                  reviews of various loan options.
                </p>
              </FadeTop>
              <FadeDown>
                <div className="section__content-inner">
                  <ul>
                    <li>
                      <i className="bi bi-check2-circle"></i> Comprehensive and
                      Reviews
                    </li>
                    <li>
                      <i className="bi bi-check2-circle"></i> Expert Guidance
                      and Insights
                    </li>
                    <li>
                      <i className="bi bi-check2-circle"></i> User-Friendly
                      Comparison
                    </li>
                    <li>
                      <i className="bi bi-check2-circle"></i> Trusted User
                      Reviews
                    </li>
                  </ul>
                </div>

                <Link href="/services_details" className="mt_40 ">
                  <PrimaryButton
                    text=" Read On"
                    icon={<i className="bi bi-arrow-up-right"></i>}
                  />
                </Link>
              </FadeDown>
            </div>
          </div>
        </div>

        <div className="row justify-content-center section bg">
          <div className="col-12 col-xl-10 col-xxl-9">
            <div className="loan-reviews loan-reviews--secondary">
              <div className="row justify-content-center">
                <div className="col-12 col-lg-10 col-xxl-9">
                  <div className="section__header">
                    <FadeDown>
                      <span className="section__header-sub-title headingFour">
                        <Image src={tittle} alt="vector" />
                        Loan Reviews
                      </span>
                    </FadeDown>
                    <FadeTop>
                      <h2 className="section__header-title">
                        In-depth Analysis for Informed Borrowing Decisions
                      </h2>
                      <p className="section__header-content">
                        Welcome to our comprehensive loan reviews section, where
                        we provide you with detailed and unbiased analyses of
                        various loan options.
                      </p>
                    </FadeTop>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-12">
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
                                {review?.reviewList.map((item) => (
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
                              <Link href="/">
                                <PrimaryButton
                                  text="Visit Site"
                                  icon={
                                    <i className="bi bi-arrow-up-right"></i>
                                  }
                                />
                              </Link>

                              <Link href="/loan_reviews/HomeLoansMortgages">
                                <OutlineButton
                                  text=" Read On"
                                  icon={
                                    <i className="bi bi-arrow-up-right"></i>
                                  }
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
                    <Link href="/loan_reviews">
                      <OutlineButton
                        text="See All Review Loan"
                        icon={<i className="bi bi-arrow-up-right"></i>}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseUs;

