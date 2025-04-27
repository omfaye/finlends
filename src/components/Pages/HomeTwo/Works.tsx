import title from "@/../public/images/title_vector.png";
import work from "@/../public/images/how_works.png";
import Image from "next/image";
import { worksData } from "../../../../public/data/homeTwoData";
import FadeDown from "@/components/motionEffect/FadeDown";
import FadeTop from "@/components/motionEffect/FadeTop";

const Works = () => {
  return (
    <section className="how-works section section--space-top overflow-hidden">
      <div className="container">
        <div className="row align-items-center justify-content-center justify-content-lg-between gy-5 gy-lg-0">
          <div className="col-12 col-sm-8 col-lg-6 col-xxl-5 order-1 order-lg-0">
            <FadeDown>
              <div className="how-works__thumbs unset-xxl-left me-4 me-xxl-0">
                <Image src={work} alt="image" />
              </div>
            </FadeDown>
          </div>
          <div className="col-12 col-lg-6 col-xxl-6">
            <div className="section__content">
              <FadeDown>
                <span className="section__content-sub-title headingFour">
                  <Image src={title} alt="vector" />
                  How Finlends Helps You Get Sanctioned in 4 Steps
                </span>
                <h2 className="section__content-title ">
                  Simple Steps to Get Started
                </h2>
              </FadeDown>
              <FadeTop>
                <p className="section__content-text">
                We simplify your loan journey from start to finish. With expert guidance at every stage, getting the right loan is now quick, clear, and stress-free.
                </p>
              </FadeTop>
              <div className="section__content-inner mt_60">
                {worksData.map((data, i) => (
                  <FadeDown key={i}>
                    <div className="card">
                      <div className="card__icon">
                        <Image
                          src={data.img}
                          alt="icon"
                          width={40}
                          height={40}
                        />
                        <span className="number-bullet">{i + 1}</span>
                      </div>
                      <div className="card__content">
                        <h4 className="card__title">{data.title}</h4>
                        <p className="fs-small">{data.des}</p>
                      </div>
                    </div>
                  </FadeDown>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Works;
