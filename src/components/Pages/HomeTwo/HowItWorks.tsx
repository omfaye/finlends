import Image from "next/image";
import React from "react";
import arrow from "@/../public/images/hero_vector_arrow.png";
import choose_vector from "@/../public/images/choose_vector.png"; // Using existing image instead of process_vector
import title from "@/../public/images/title_vector.png";
import Link from "next/link";
import FadeDown from "@/components/motionEffect/FadeDown";
import FadeTop from "@/components/motionEffect/FadeTop";
import PrimaryButton from "@/components/UI/PrimaryButton";

const HowItWorks = () => {
  // Sample steps data - replace with your actual steps data
  const workSteps = [
    {
      id: 1,
      number: "01",
      title: "Consultation & Requirement Check",
      description: "Begin by filling out our simple loan request form. Provide us with some basic information."
    },
    {
      id: 2,
      number: "02",
      title: "Compare Loan Options",
      description: "Picking a product refers to the process of selecting a specific from a range of options."
    },
    {
      id: 3,
      number: "03",
      title: "Select Your Preferred Loan",
      description: "Product packaging refers to the materials and design used to protect and present products."
    },
    {
      id: 4,
      number: "04",
      title: "Complete the Application",
      description: "Follow the lender's instructions to complete the loan application. You may need additional documents."
    },
    {
      id: 5,
      number: "05",
      title: "Complete the Application",
      description: "Follow the lender's instructions to complete the loan application. You may need additional documents."
    }
  ];

  return (
    <section className="how-it-works section" id="how-it-works">
      <div className="animation">
        <Image src={arrow} alt="Image" />
        <Image src={choose_vector} alt="Image" /> {/* Using existing image */}
      </div>
      <div className="container">
        <div className="row gy-5 gy-lg-0 justify-content-between align-items-center">
          <div className="col-12 col-lg-6 col-xxl-6">
            <div className="section__content">
              <FadeDown>
                <span className="section__content-sub-title headingFour">
                  <Image src={title} alt="vector" /> How It Works
                </span>
                <h2 className="section__content-title">
                How Finlends Helps You Get Sanctioned in 4 Steps
                </h2>
              </FadeDown>
              <FadeTop>
                <p className="section__content-text">
                  
We simplify your loan journey from start to finish. With expert guidance at every stage, getting the right loan is now quick, clear, and stress-free.
                </p>
              </FadeTop>
              <FadeDown>
                <div className="section__content-inner">
                  {workSteps.map((step) => (
                    <div key={step.id} className="process-card">
                      <div className="process-card__number">
                        <h3>{step.number}</h3>
                      </div>
                      <div className="process-card__content">
                        <h4 className="process-card__title">{step.title}</h4>
                        <p className="fs-small">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link href="/how_it_works" className="mt_40">
                  <PrimaryButton
                    text="Learn More"
                    icon={<i className="bi bi-arrow-up-right"></i>}
                  />
                </Link>
              </FadeDown>
            </div>
          </div>
          <div className="col-12 col-md-8 col-lg-5 mx-auto mx-lg-0">
            <FadeTop>
              <div className="how-it-works__thumb ms-xl-4 ms-xxl-0">
                {/* If you don't have this image, you can use any other image that exists in your project */}
                <img src="/images/placeholder.jpg" alt="How it works" className="img-fluid" />
              </div>
            </FadeTop>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;