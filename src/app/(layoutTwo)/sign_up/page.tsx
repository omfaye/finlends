"use client";
import Image from "next/image";
import sign from "@/../public/images/sign_up.png";
import Banner from "@/components/shared/Banner";
import banner from "@/../public/images/faq_banner.png";
import Link from "next/link";
import OutlineButton from "@/components/UI/OutlineButton";
import { useState } from "react";

const SignUp = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };
  return (
    <div>
      <Banner
        heading={"Sign Up"}
        items={["Home", "Pages", "Sign Up"]}
        banner_img={banner}
      ></Banner>
      <section className="sign-up section">
        <div className="container">
          <div className="row gy-5 gy-xl-0 justify-content-center justify-content-lg-between align-items-center">
            <div className="col-12 col-lg-7 col-xxl-6">
              <form
                method="POST"
                autoComplete="off"
                id="frmContactus"
                className="sign-up__form me-lg-4 me-xxl-0"
              >
                <h3 className="sign-up__title">Let’s Get Started!</h3>
                <p className="sign-up__sub-title mb_40">
                  Please enter your email address to join us
                </p>
                <div className="sign-up__form-part">
                  <div className="input-group">
                    <div className="input-single">
                      <label className="label" htmlFor="fname">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="fname"
                        id="fname"
                        placeholder="Enter First Name..."
                        required
                      />
                    </div>
                    <div className="input-single">
                      <label className="label" htmlFor="lname">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="lname"
                        id="lname"
                        placeholder="Enter Last Name..."
                        required
                      />
                    </div>
                  </div>
                  <div className="input-single">
                    <label className="label" htmlFor="email">
                      Enter Your Email ID
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
                    <label className="label" htmlFor="password">
                      Enter Your Password
                    </label>
                    <div className="input-pass">
                      <input
                        type={show ? "text" : "password"}
                        className="form-control"
                        name="password"
                        id="password"
                        placeholder="Enter Your Password..."
                        required
                      />

                      <span
                        className="input-icon position-absolute"
                        onClick={handleShow}
                      >
                        {show ? (
                          <i className="bi bi-eye fs-4 mt-2"></i>
                        ) : (
                          <i className="bi bi-eye-slash fs-4 mt-2"></i>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="have_account mt_24">
                  Do you have an account?{" "}
                  <Link href="/sign_in" className="signin">
                    SignIn
                  </Link>
                </p>
                <span id="msg"></span>
                <div className=" mt_32 cursor-pointer" id="submit">
                  <OutlineButton
                    text="Sign Up"
                    icon={<i className="bi bi-arrow-up-right"></i>}
                  />
                </div>
              </form>
            </div>
            <div className="col-12 col-sm-7 col-lg-5 col-xxl-5">
              <div className="sign-up__thumb previewShapeY unset-xxl">
                <Image src={sign} alt="images" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
