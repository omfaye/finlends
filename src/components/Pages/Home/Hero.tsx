import Image from "next/image";
import dollar from "@/../public/images/hero_vector_dollar.png";
import massage from "@/../public/images/hero_vector_message.png";
import settings from "@/../public/images/hero_vector_setting.png";
import arrow from "@/../public/images/hero_vector_arrow.png";
import hero from "@/../public/images/hero_img.png";
import title from "@/../public/images/title_vector.png";
import Link from "next/link";
import FadeLeft from "@/components/motionEffect/FadeLeft";
import FadeRight from "@/components/motionEffect/FadeRight";
import FadeDown from "@/components/motionEffect/FadeDown";
import PrimaryButton from "@/components/UI/PrimaryButton";
import OutlineButton from "@/components/UI/OutlineButton";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__animation">
        <Image src={dollar} alt="Image" />
        <Image src={massage} alt="Image" />
        <Image src={dollar} alt="Image" />
        <Image src={settings} alt="Image" />
        <Image src={arrow} alt="Image" />
      </div>
      <div className="container">
        <div className="row gy-5 gy-lg-0 align-items-center justify-content-between">
          <div className="col-12 col-lg-6">
            <div className="section__content">
              <FadeLeft>
                <span className="section__content-sub-title headingFour wow fadeInDown">
                  <Image src={title} alt="Image" />
                  Compare and Choose the Best Loan
                </span>
              </FadeLeft>
              <FadeRight>
                <h1 className="section__content-title display-3">
                  <span>Find the </span>
                  <span className="word d-inline-flex">
                    <span className="letter wow fadeInDown">Perfect </span>
                  </span>
                  Loan for Your Needs
                </h1>
              </FadeRight>
              <FadeDown>
                <p className="section__content-text ">
                  Welcome to Finview, your trusted resource for financial loan
                  reviews and comparisons. Our dedicated team of experts
                  analyzes various loan
                </p>
                <div className="btn-group mt_40">
                  <Link href="#calculator">
                    <PrimaryButton
                      text="Loan Calculator"
                      icon={<i className="bi bi-arrow-up-right"></i>}
                    />
                  </Link>
                  <Link href="#">
                    <OutlineButton
                      text="About us"
                      icon={<i className="bi bi-arrow-up-right"></i>}
                    />
                  </Link>
                </div>
              </FadeDown>
            </div>
          </div>
          <div className="col-12 col-lg-6 col-xxl-5">
            <div className="hero__thumb wow fadeInUp" data-wow-duration="0.8s">
              <Image src={hero} alt="Image" />
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default Hero;
