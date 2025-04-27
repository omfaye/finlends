import Image from "next/image";
import title from "@/../public/images/title_vector.png";
import guidline from "@/../public/images/about_guideline.png";
import FadeDown from "@/components/motionEffect/FadeDown";
import FadeTop from "@/components/motionEffect/FadeTop";
import FadeLeft from "@/components/motionEffect/FadeLeft";
import FadeRight from "@/components/motionEffect/FadeRight";
import Link from "next/link";
import PrimaryButton from "@/components/UI/PrimaryButton";
import SingleBar from "@/components/progressBar/SingleBar";

const AboutUs = () => {
  return (
    <section className="about-guideline section">
      <div className="container">
        <div className="row gy-5 gy-lg-0 justify-content-between align-items-center">
          <div className="col-12 col-lg-7 col-xxl-6">
            <div className="section__content me-lg-5 me-xxl-0">
              <FadeDown>
                <span className="section__content-sub-title headingFour">
                  <Image src={title} alt="vector" /> About Us
                </span>
                <h2 className="section__content-title">
                  Your Trusted Guideline to Finding the Perfect Loan
                </h2>
              </FadeDown>
              <FadeTop>
                <p className="section__content-text">
                  At FINVIEW, we understand the significance of making informed
                  financial decisions, especially when it comes to loans. Our
                  mission is to provide you with a reliable platform
                </p>
              </FadeTop>
              {/* progress bar */}
              <SingleBar />
              <FadeLeft>
                <div className="section__content-inner">
                  <div className="row gy-4 gy-md-0">
                    <div className="col-12 col-md-6">
                      <div className="mission ">
                        <div className="card card--small">
                          <div className="card--small-content">
                            <h5 className="card--small-title gap-6">
                              <i className="bi bi-check2-circle"></i>Our Mission
                            </h5>
                            <p className="card--small-text">
                              To empower individuals and businesses with the
                              knowledge and tools to make informed
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="vision">
                        <div className="card card--small">
                          <div className="card--small-content">
                            <h5 className="card--small-title gap-6">
                              <i className="bi bi-check2-circle"></i>Our Vision
                            </h5>
                            <p className="card--small-text">
                              To empower individuals and businesses with the
                              knowledge and tools to make informed
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeLeft>
              <FadeRight>
                <div className="btn-group align-items-center">
                  <Link href="">
                    <PrimaryButton
                      text="Read On"
                      icon={<i className="bi bi-arrow-up-right"></i>}
                    />
                  </Link>
                  <div className="card card--small">
                    <div className="card--small-icon">
                      <i className="bi bi-headset"></i>
                    </div>
                    <div className="card--small-content">
                      <p className="card--small-title">Support us</p>
                      <Link href="tel:+1234567891" className="card--small-call">
                        (123) 456-7891
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeRight>
            </div>
          </div>
          <div className="col-12 col-sm-8 col-md-8 col-lg-5 mx-auto mx-lg-0">
            <FadeRight>
              <div className="choose-us__thumb unset-xxl me-xl-4 me-xxl-0">
                <Image src={guidline} alt="images" />
              </div>
            </FadeRight>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
