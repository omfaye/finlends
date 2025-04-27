"use client";
import Image from "next/image";
import sign from "@/../public/images/sign_up.png";
import Banner from "@/components/shared/Banner";
import banner from "@/../public/images/faq_banner.png";
import Link from "next/link";
import OutlineButton from "@/components/UI/OutlineButton";
import { useState } from "react";

const SignIn = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };
  return (
    <div>
      <Banner
        heading={"Sign In"}
        items={["Home", "Pages", "Sign In"]}
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
                <h3 className="sign-up__title">Welcome Back!</h3>
                <p className="sign-up__sub-title mb_40">
                  Sign in to your account and join us
                </p>
                <div className="sign-up__form-part">
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
                  <Link href="#" className="fs-small forget-pass">
                    Forget password
                  </Link>
                </div>
                <p className="have_account">
                  Do you have an account?{" "}
                  <Link href="/sign_up" className="signin">
                    SignUp
                  </Link>
                </p>
                <span id="msg"></span>
                <div className=" mt_32 cursor-pointer" id="submit">
                  <OutlineButton
                    text="Sign In"
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

export default SignIn;
