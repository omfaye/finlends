import Image from "next/image";
import React from "react";
import arrow from "@/../public/images/hero_vector_arrow.png";
import choose_vector from "@/../public/images/choose_vector.png";
import choose_us from "@/../public/images/choose_us.png";
import title from "@/../public/images/title_vector.png";
import Link from "next/link";
import FadeDown from "@/components/motionEffect/FadeDown";
import FadeTop from "@/components/motionEffect/FadeTop";
import PrimaryButton from "@/components/UI/PrimaryButton";

const WhyChooseUs = () => {
  // Sample features data - replace with your actual features
  const features = [
    {
      id: 1,
      title: "Expert Financial Analysis",
      description: "Our team of experts provides in-depth analysis of each financial product."
    },
    {
      id: 2,
      title: "Unbiased Recommendations",
      description: "We offer objective comparisons to help you make informed decisions."
    },
    {
      id: 3,
      title: "Personalized Options",
      description: "Get customized recommendations based on your unique financial situation."
    },
    {
      id: 4,
      title: "Secure & Confidential",
      description: "Your personal and financial information is always protected."
    }
  ];

  return (
    <section className="choose-us section">
      <div className="animation">
        <Image src={arrow} alt="Image" />
        <Image src={choose_vector} alt="Image" />
      </div>
      <div className="container">
        <div className="row gy-5 gy-lg-0 justify-content-between align-items-center">
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
                  <Image src={title} alt="vector" /> Why Choose Us
                </span>
                <h2 className="section__content-title">
                  Experience Excellence in Financial Service and Comparison
                </h2>
              </FadeDown>
              <FadeTop>
                <p className="section__content-text">
                  Our dedicated team of experts conducts thorough research and
                  analysis to provide you with comprehensive and unbiased
                  reviews of various financial options.
                </p>
              </FadeTop>
              <FadeDown>
                <div className="section__content-inner">
                  {features.map((feature) => (
                    <div key={feature.id} className="card">
                      <div className="card__icon">
                        <i className="bi bi-check2-circle"></i>
                      </div>
                      <div className="card__content">
                        <h4 className="card__title">{feature.title}</h4>
                        <p className="fs-small">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link href="/about_us" className="mt_40">
                  <PrimaryButton
                    text="Learn More"
                    icon={<i className="bi bi-arrow-up-right"></i>}
                  />
                </Link>
              </FadeDown>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;