"use client";
import Image from "next/image";
import Link from "next/link";

import { comments } from "../../../../public/data/BlogDetailsData";
import FadeDown from "@/components/motionEffect/FadeDown";
import FadeTop from "@/components/motionEffect/FadeTop";
import { useState } from "react";
import PrimaryButton from "@/components/UI/PrimaryButton";
import SelectOptions from "@/components/shared/SelectOptions";

const BlogComments = () => {
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
    <div className="card card--secondary part">
      <div className="comments-area">
        <div className="space_between">
          <h4>All Comments</h4>
          <div className="gap-2 comments-title">
            <p className="sort_by">Sort By : </p>
            <SelectOptions />
          </div>
        </div>
        {comments.map((comment) => (
          <FadeDown key={comment.id}>
            <div className="author__content author__content--secondary">
              <p className="author__submit-time">
                {comment.date}
                <i className="bi bi-dot"></i> {comment.time}
              </p>
              <div className="author__text">
                <div className="star_review">
                  <i className="bi bi-star-fill star-active"></i>
                  <i className="bi bi-star-fill star-active"></i>
                  <i className="bi bi-star-fill star-active"></i>
                  <i className="bi bi-star-fill star-active"></i>
                  <i className="bi bi-star-half star-active"></i>
                </div>
                <p>{comment.des}</p>
              </div>
              <div className="author">
                <div className="author__thumbs">
                  <Image
                    src={comment.img}
                    alt="image"
                    className="authorImage rounded-circle"
                  />
                </div>
                <div className="author__info">
                  <h5 className="author__name res-font">{comment.name}</h5>
                  <p>{comment.position}</p>
                </div>
              </div>
              <div className="feedback">
                <div className="gap-9 feedback__content">
                  <button className="like active-replyColor bg-transparent">
                    <i className="bi bi-hand-thumbs-up"></i>178
                  </button>
                  <button
                    className={` reply bg-transparent ${
                      replyStates[comment.id]
                        ? "reply-active active-replyColor"
                        : ""
                    }`}
                    onClick={() => handleReplyClick(comment.id)}
                  >
                    <i className="bi bi-chat-left-text"></i>Reply
                  </button>
                </div>

                <div
                  className={`reply__content ${
                    replyStates[comment.id] ? "d-block" : "d-none"
                  }`}
                >
                  <div className="gap-7">
                    <div className="author__thumbs">
                      <Image
                        src={comment.img}
                        alt="Author"
                        className="rounded-circle"
                      />
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
              text="See All Comments"
              icon={<i className="bi bi-arrow-up-right"></i>}
            />
          </Link>
        </div>
      </FadeTop>
    </div>
  );
};

export default BlogComments;
