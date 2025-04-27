"use client";
import dollar from "@/../public/images/hero_vector_dollar.png";
import massage from "@/../public/images/hero_vector_message.png";
import title from "@/../public/images/title_vector.png";
import Image from "next/image";
import { featuredServices } from "../../../../public/data/homePageData";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid"; // Add this import for grid functionality
import "swiper/css/pagination";
import { Grid, Pagination, Autoplay } from "swiper/modules"; // Added Grid import
import Link from "next/link";
import FadeDown from "@/components/motionEffect/FadeDown";
import FadeTop from "@/components/motionEffect/FadeTop";


const Featured = () => {
  return (
    <section className="feature section">
      <div className="animation">
        <Image src={dollar} alt="Image" />
        <Image src={massage} alt="Image" />
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-9 col-xxl-8">
            <div className="section__header">
              <FadeDown>
                <span className="section__header-sub-title headingFour">
                  <Image src={title} alt="vector" />
                  Featured Services
                </span>
                <h2 className="section__header-title">
                  Empowering You with Loan Knowledge and Comparison Tools
                </h2>
              </FadeDown>
              <FadeTop>
              <p className="section__header-content">
                  We are dedicated to providing you with valuable services that
                  simplify your loan search and empower you to make informed
                  borrowing decisions. Our comprehensive range of services
                </p>
              </FadeTop>
            </div>
          </div>
        </div>

        <div dir="ltr" className="row">
          <div className="col-12">
            <div>
              <Swiper
                slidesPerView={3}
                grid={{
                  rows: 3,
                  fill: "row"
                }}
                spaceBetween={30}
                loop={true}
                speed={1500}
                autoplay={{
                  delay: 1500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                  el: ".service-pagination",
                }}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    grid: {
                      rows: 1
                    },
                    spaceBetween: 30,
                  },
                  768: {
                    slidesPerView: 2,
                    grid: {
                      rows: 2
                    },
                    spaceBetween: 30,
                  },
                  1200: {
                    slidesPerView: 3,
                    grid: {
                      rows: 3
                    },
                    spaceBetween: 30,
                  },
                }}
                modules={[Grid, Pagination, Autoplay]}
                className="mySwiper"
              >
                {featuredServices.map((service) => (
                  <SwiperSlide key={service.id}>
                    <div className="card card--custom">
                      <div className="card__icon">
                        <Image
                          src={service.img}
                          alt="loan"
                          width={46}
                          height={46}
                        />
                      </div>
                      <div className="card__content">
                        <h4 className="card__title">
                          <Link href={service.url}>{service.name}</Link>
                        </h4>
                        <p className="fs-small">{service.des}</p>
                        <Link
                          href={service.url}
                          className="btn_theme social_box"
                          aria-label="icon"
                        >
                          <i className="bi bi-arrow-up-right"></i>
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
        <div className="service-pagination mt-4 d-flex justify-content-center gap-3"></div>
      </div>
    </section>
  );
};

export default Featured;
