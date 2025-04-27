"use client";
import title from "@/../public/images/title_vector.png";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Autoplay } from "swiper/modules";
import { testimonials } from "../../../../public/data/homePageData";
import FadeDown from "@/components/motionEffect/FadeDown";
import FadeTop from "@/components/motionEffect/FadeTop";

const Testimonials = () => {
  return (
    <section className="testimonials section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-6 col-xxl-5">
            <div className="section__header">
              <FadeDown>
                <span className="section__header-sub-title headingFour">
                  <Image src={title} alt="vector" />
                  Client Testimonials
                </span>
                <h2 className="section__header-title">
                  Success Stories Shared by Our Customers
                </h2>
              </FadeDown>
              <FadeTop>
                <p className="section__header-content">
                  Feel free to customize the text with actual client
                  testimonials, ensuring you have their permission to use their
                  names and occupations
                </p>
              </FadeTop>
            </div>
          </div>
        </div>
        <div dir="ltr" className="row">
          <div className="col-12">
            <div className="testimonials-slider">
              <Swiper
                slidesPerView={2}
                spaceBetween={30}
                loop={true}
                speed={1500}
                autoplay={{
                  delay: 1500,
                  disableOnInteraction: false,
                }}
                navigation={{ prevEl: ".next", nextEl: ".prev" }}
                modules={[Navigation, Autoplay]}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                  },
                  992: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                  },
                }}
                className="mySwiper"
              >
                {testimonials.map((data) => (
                  <SwiperSlide key={data.id}>
                    <div className="card card--custom">
                      <div className="testimonials__author-review">
                        <div className="star_review mb-3">
                          <i className="bi bi-star-fill star-active"></i>
                          <i className="bi bi-star-fill star-active"></i>
                          <i className="bi bi-star-fill star-active"></i>
                          <i className="bi bi-star-fill star-active"></i>
                          <i className="bi bi-star-half star-active"></i>
                        </div>
                        <p className="text-start">{data.des}</p>
                      </div>
                      <div className="testimonials__author">
                        <div className="author__thumg">
                          <Image src={data.img} alt="testimonial" />
                        </div>
                        <div className="author__content">
                          <h5 className="author__title">{data.name}</h5>
                          <p className="author__desi">{data.post}</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
                <div className="col-12">
                  <div
                    className="slider-navigation wow fadeInRight"
                    data-wow-duration="1.2s"
                  >
                    <button
                      className="prev-testimonials pagination-button next"
                      aria-label="Previous Testimonials"
                    >
                      <i className="bi bi-chevron-left"></i>
                    </button>

                    <button
                      className="next-testimonials pagination-button prev"
                      aria-label="Next Testimonials"
                    >
                      <i className="bi bi-chevron-right"></i>
                    </button>
                  </div>
                </div>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
