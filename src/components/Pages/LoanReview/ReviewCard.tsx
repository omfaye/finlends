// "use client";
// import { loanReviewsData } from "../../../../public/data/loanReviewData";
// import Image from "next/image";
// import Link from "next/link";
// import FadeDown from "@/components/motionEffect/FadeDown";
// import OutlineButton from "@/components/UI/OutlineButton";
// import PrimaryButton from "@/components/UI/PrimaryButton";

// const ReviewCard = () => {
//   return (
//     <div className="col-12 col-lg-11 col-xl-9 col-xxl-8">
//       <div className="d-flex flex-column gap-4">
//         {loanReviewsData.map((review) => (
//           <FadeDown key={review.id}>
//             <div className="loan-reviews_card card ">
//               <div className="loan-reviews__part-one">
//                 <div className="loan-reviews__thumb">
//                   <Image
//                     width={172}
//                     height={96}
//                     src={review.logo}
//                     alt="image"
//                   />
//                 </div>
//                 <div className="loan-reviews__review">
//                   <p className="rating"> 4.9</p>
//                   <div className="d-flex gap-2 flex-column">
//                     <div className="star_review">
//                       <i className="bi bi-star-fill star-active"></i>
//                       <i className="bi bi-star-fill star-active"></i>
//                       <i className="bi bi-star-fill star-active"></i>
//                       <i className="bi bi-star-fill star-active"></i>
//                       <i className="bi bi-star-half star-active"></i>
//                     </div>
//                     <p className="fs-small">Average Review</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="loan-reviews__part-two">
//                 <div className="reviews-heading">
//                   <h4 className="reviews-heading__title">{review.title}</h4>
//                   <p className="reviews-heading__content">{review.heading}</p>
//                 </div>
//                 <div className="reviews-inner">
//                   <ul>
//                     {review.reviewList?.map((item: any) => (
//                       <li key={item.id}>
//                         <i className="bi bi-check2-circle"></i>
//                         {item.heading}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//               <div className="loan-reviews__part-three">
//                 <div className="btn-group">
//                   <Link href="#">
//                     <PrimaryButton
//                       text="Visit Site"
//                       icon={<i className="bi bi-arrow-up-right"></i>}
//                     />
//                   </Link>
//                   <Link
//                     className="btn-width"
//                     href={`/loan_reviews/${review.title.split(" ").join("")}`}
//                   >
//                     <OutlineButton
//                       text="Read On"
//                       icon={<i className="bi bi-arrow-up-right"></i>}
//                     />
//                   </Link>
//                   <Link href="/faqs" className="conditions_apply">
//                     Terms & Conditions Apply
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </FadeDown>
//         ))}
//       </div>
//       <FadeDown>
//         <div className="row">
//           <div className="col-12">
//             <nav aria-label="Page navigation" className="nav_pagination">
//               <ul className="pagination">
//                 <li className="page-item">
//                   <Link className="page-link" href="#">
//                     <span className="prev-icon"></span>
//                   </Link>
//                 </li>
//                 <li className="page-item">
//                   <Link className="page-link active" href="#">
//                     1
//                   </Link>
//                 </li>
//                 <li className="page-item">
//                   <Link className="page-link" href="#">
//                     2
//                   </Link>
//                 </li>
//                 <li className="page-item">
//                   <Link className="page-link three_dots_box" href="#">
//                     <span className="three-dots"> </span>
//                   </Link>
//                 </li>
//                 <li className="page-item">
//                   <Link className="page-link" href="#">
//                     5
//                   </Link>
//                 </li>
//                 <li className="page-item">
//                   <Link className="page-link" href="#">
//                     <span className="next-icon"></span>
//                   </Link>
//                 </li>
//               </ul>
//             </nav>
//           </div>
//         </div>
//       </FadeDown>
//     </div>
//   );
// };

// export default ReviewCard;
