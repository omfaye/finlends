import PrimaryButton from "@/components/UI/PrimaryButton";
import React from "react";

const CommentForm = () => {
  return (
    <div className="card card--secondary part">
      <div className="sign-up contact">
        <form
          method="POST"
          autoComplete="off"
          id="frmContactus"
          className="sign-up__form"
        >
          <h3 className="contact__title">Write a Comments</h3>
          <div className="sign-up__form-part">
            <div className="input-single">
              <label className="label" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                id="name"
                placeholder="Enter Your Name..."
                required
              />
            </div>
            <div className="input-single">
              <label className="label" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                placeholder="Enter Your Email..."
                required
              />
            </div>
            <div className="input-single">
              <label className="label" htmlFor="message">
                Comments
              </label>
              <textarea
                className="form-control"
                id="message"
                name="message"
                rows={8}
                placeholder="Enter Your Message..."
                required
              ></textarea>
            </div>
          </div>
          <span id="msg"></span>
          <div className="mt_40">
            <PrimaryButton
              text="Submit Comments"
              icon={<i className="bi bi-arrow-up-right"></i>}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentForm;
