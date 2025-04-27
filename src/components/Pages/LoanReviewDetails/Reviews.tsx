import FadeDown from "@/components/motionEffect/FadeDown";
import FadeTop from "@/components/motionEffect/FadeTop";
import Image from "next/image";
import Link from "next/link";
import { reviews } from "../../../../public/data/loanReviewDetails";
import { useState } from "react";
import PrimaryButton from "@/components/UI/PrimaryButton";
import SelectOptions from "@/components/shared/SelectOptions";
import ReviewsBar from "@/components/progressBar/ReviewsBar";

const Reviews = () => {
  const [replyStates, setReplyStates] = useState<{
    [commentId: number]: boolean;
  }>({});

  const handleReplyClick = (commentId: number) => {
    setReplyStates((prevStates) => ({
      ...prevStates,
      [commentId]: !prevStates[commentId] || false,
    }));
  };
  return (
    <div className="reviews-details__part">
      <ReviewsBar />
      <div className="comments-area">
        <div className="space_between">
          <h4>All Reviews</h4>
          <div className="gap-2 comments-title">
            <p className="sort_by">Sort By : </p>
            <SelectOptions />
          </div>
        </div>

        {reviews.map((review) => (
          <FadeDown key={review.id}>
            <div className="author__content wow fadeInUp">
              <p className="author__submit-time">
                {review.date}
                <i className="bi bi-dot"></i> {review.time}
              </p>
              <div className="author__text">
                <div className="star_review">
                  <i className="bi bi-star-fill star-active"></i>
                  <i className="bi bi-star-fill star-active"></i>
                  <i className="bi bi-star-fill star-active"></i>
                  <i className="bi bi-star-fill star-active"></i>
                  <i className="bi bi-star-half star-active"></i>
                </div>
                <p>{review.des}</p>
              </div>
              <div className="author">
                <div className="author__thumbs">
                  <Image src={review.img} alt="image" className="authorImage" />
                </div>
                <div className="author__info">
                  <h5 className="author__name">{review.name}</h5>
                  <p>{review.position}</p>
                </div>
              </div>
              <div className="feedback">
                <div className="gap-9 feedback__content">
                  <button className="like active-replyColor">
                    <i className="bi bi-hand-thumbs-up active-replyColor"></i>
                    178
                  </button>
                  <button
                    className={` reply ${
                      replyStates[review.id]
                        ? "reply-active active-replyColor"
                        : ""
                    }`}
                    onClick={() => handleReplyClick(review.id)}
                  >
                    <i className="bi bi-chat-left-text"></i>Reply
                  </button>
                </div>
                <div
                  className={`reply__content ${
                    replyStates[review.id] ? "d-block" : "d-none"
                  }`}
                >
                  <div className="gap-7">
                    <div className="author__thumbs">
                      <Image src={review.img2} alt="Author" />
                    </div>
                    <form method="POST" className="reply__form">
                      <div>
                        <input
                          type="text"
                          className="form-control"
                          name="reply__text"
                          placeholder="Join the discussion..."
                          required
                        />
                        <button
                          type="submit"
                          className="d-none"
                          name="reply__submit"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </FadeDown>
        ))}
      </div>
      <FadeTop>
        <div className="text-start">
          <Link href="/sign_in">
            <PrimaryButton
              text="See All Reviews"
              icon={<i className="bi bi-arrow-up-right"></i>}
            />
          </Link>
        </div>
      </FadeTop>
    </div>
  );
};

export default Reviews;
