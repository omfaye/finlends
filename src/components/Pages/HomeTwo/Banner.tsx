"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import title from "@/../public/images/title_vector.png";
import hero from "@/../public/images/hero_img2.png";

import sponsor from "@/../public/images/sponsor_logo.png";
import sponsor1 from "@/../public/images/sponsor_logo5.png";
import sponsor2 from "@/../public/images/sponsor_logo2.png";
import sponsor3 from "@/../public/images/sponsor_logo3.png";
import sponsor4 from "@/../public/images/sponsor_logo4.png";
import sponsor5 from "@/../public/images/sponsor_logo6.png";
import Link from "next/link";
import FadeLeft from "@/components/motionEffect/FadeLeft";
import FadeRight from "@/components/motionEffect/FadeRight";
import FadeDown from "@/components/motionEffect/FadeDown";
import FadeTop from "@/components/motionEffect/FadeTop";
import PrimaryButton from "@/components/UI/PrimaryButton";
import AboutButton from "@/components/UI/AboutButton";

const Banner = () => {
  return (
    <section>
      <div className="hero hero--secondary">
        <div className="container">
          <div className="row gy-5 gy-lg-0 align-items-center justify-content-center justify-content-lg-between">
            <div className="col-12 col-lg-7 col-xxl-6">
              <div className="section__content">
                <FadeLeft>
                  <span className="section__content-sub-title headingFour">
                    <Image src={title} alt="vector" width={32} height={32} />
                    Simplify Your Loan Search and Save Time
                  </span>
                </FadeLeft>
                <FadeRight>
                  <h1 className="section__content-title display-3">
                    Explore Your Loan Options with Ease
                  </h1>
                </FadeRight>
                <FadeDown>
                  <p className="section__content-text">
                    We understand that finding the right loan can be
                    overwhelming. That's why we're here to help simplify the
                    process
                  </p>
                  <div className="btn-group mt_40 mb_35">
                    <Link href="#calculator">
                      <PrimaryButton
                        text="Loan Calculator"
                        icon={<i className="bi bi-arrow-up-right"></i>}
                      />
                    </Link>
                    <Link href="/about_us">
                      <AboutButton
                        text="About us"
                        icon={<i className="bi bi-arrow-up-right"></i>}
                      />
                    </Link>
                  </div>
                </FadeDown>
              </div>
            </div>
            <div className="col-12 col-md-9 col-lg-5 col-xxl-5">
              <FadeTop>
                <div className="hero--secondary__thumb">
                  <Image src={hero}  alt="Image" />
                </div>
              </FadeTop>
            </div>
          </div>
        </div>
      </div>
      {/* sponsor start  */}
      <div dir="ltr" className="section sponsor-slider">
        <div className="container">
          <div className="row">
            <div className="sponsor__company" id="sponsor__company">
              <Swiper
                slidesPerView={6}
                spaceBetween={30}
                loop={true}
                speed={4000}
                autoplay={{
                  delay: 1,
                }}
                breakpoints={{
                  320: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                  },
                  576: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                  },
                  992: {
                    slidesPerView: 5,
                    spaceBetween: 30,
                  },
                  1200: {
                    slidesPerView: 6,
                    spaceBetween: 30,
                  },
                }}
                modules={[Autoplay]}
                className="mySwiper"
              >
                <SwiperSlide>
                  <Image src={sponsor} alt="Image" width={196} height={40} />
                </SwiperSlide>
                <SwiperSlide>
                  <Image src={sponsor1} alt="Image" width={196} height={40} />
                </SwiperSlide>
                <SwiperSlide>
                  <Image src={sponsor2} alt="Image" width={196} height={40} />
                </SwiperSlide>
                <SwiperSlide>
                  <Image src={sponsor3} alt="Image" width={196} height={40} />
                </SwiperSlide>
                <SwiperSlide>
                  <Image src={sponsor4} alt="Image" width={196} height={40} />
                </SwiperSlide>
                <SwiperSlide>
                  <Image src={sponsor5} alt="Image" width={196} height={40} />
                </SwiperSlide>
                <SwiperSlide>
                  <Image src={sponsor} alt="Image" width={196} height={40} />
                </SwiperSlide>
                <SwiperSlide>
                  <Image src={sponsor2} alt="Image" width={196} height={40} />
                </SwiperSlide>
                <SwiperSlide>
                  <Image src={sponsor} alt="Image" width={196} height={40} />
                </SwiperSlide>
                <SwiperSlide>
                  <Image src={sponsor1} alt="Image" width={196} height={40} />
                </SwiperSlide>
                <SwiperSlide>
                  <Image src={sponsor2} alt="Image" width={196} height={40} />
                </SwiperSlide>
                <SwiperSlide>
                  <Image src={sponsor3} alt="Image" width={196} height={40} />
                </SwiperSlide>
                <SwiperSlide>
                  <Image src={sponsor4} alt="Image" width={196} height={40} />
                </SwiperSlide>
                <SwiperSlide>
                  <Image src={sponsor5} alt="Image" width={196} height={40} />
                </SwiperSlide>
                <SwiperSlide>
                  <Image src={sponsor} alt="Image" width={196} height={40} />
                </SwiperSlide>
                <SwiperSlide>
                  <Image src={sponsor2} alt="Image" width={196} height={40} />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
