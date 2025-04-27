import banner from "@/../public/images/service_banner.png";
import banner_details from "@/../public/images/service_details.png";
import banner_details_sub from "@/../public/images/service_details_sub.png";
import RightSide from "@/components/Pages/Services/RightSide";
import IconButton from "@/components/UI/IconButton";
import FadeDown from "@/components/motionEffect/FadeDown";
import FadeTop from "@/components/motionEffect/FadeTop";
import Banner from "@/components/shared/Banner";
import Image from "next/image";
import Link from "next/link";

const ServicesDetails = () => {
  return (
    <div className="overflowHidden">
      <Banner
        heading={"Services-Details"}
        items={["Home", "Pages", "Services-Details"]}
        banner_img={banner}
      ></Banner>
      <section className="service-details section">
        <div className="container ">
          <div className="row gy-4 gy-lg-0">
            <div className="col-12 col-lg-7 col-xl-8">
              <div className="card card--secondary">
                <FadeDown>
                  <div className="card--secondary__thumb">
                    <Image src={banner_details} alt="image" />
                  </div>
                </FadeDown>
                <div className="card--secondary__content">
                  <FadeTop>
                    <div className="card--secondary__content-part">
                      <h2>Loan Comparison</h2>
                      <p className="mt_20">
                        Provide a brief overview of the loan comparison service
                        and its benefits. Explain how it helps borrowers make
                        informed decisions and find the most suitable loan
                        options for their needs. Emphasize that users can
                        customize their search criteria, such as loan type, loan
                        amount range,
                      </p>
                    </div>
                  </FadeTop>
                  <FadeDown>
                    <div className="card--secondary__content-part">
                      <div className="content-part__thumb flex-wrap flex-xxl-nowrap">
                        <Image src={banner_details_sub} alt="image" />
                        <div className="content-part__thumb-text">
                          <h3>How It Works</h3>
                          <p className="mt_20">
                            Provide a step-by-step guide or overview of how
                            users can utilize the loan comparison service.
                            Explain the process of conducting a search, applying
                            filters, viewing loan profiles, and comparing
                            options. Make it clear and user-friendly. Encourage
                            users to take action by including a call-to-action
                            button or link that leads them to the loan
                            comparison tool or a page.
                          </p>
                        </div>
                      </div>
                    </div>
                  </FadeDown>
                  <FadeTop>
                    <div className="card--secondary__content-part">
                      <h4>Expert Guidance</h4>
                      <p className="mt_20">
                        Highlight that users can benefit from expert guidance
                        and recommendations. Explain how your team of loan
                        specialists can assist users in analyzing loan options,
                        understanding terms and conditions, and making informed
                        decisions.
                      </p>
                    </div>
                  </FadeTop>
                  <FadeDown>
                    <div className="card--secondary__content-part">
                      <h4>Benefits</h4>
                      <p className="mt_20">
                        Summarize the main benefits of using your loan
                        comparison service. Focus on aspects such as saving
                        time, finding competitive rates, accessing a diverse
                        range of loan options, and receiving personalized
                        recommendations.
                      </p>
                    </div>
                  </FadeDown>
                  <FadeTop>
                    <div className="tag-area">
                      <div className="tag">
                        <p className="tag__name">Tag -</p>
                        <div>
                          <Link
                            href="#"
                            className="border border-gray py-2 px-3 rounded-5 m-2"
                          >
                            Loan Comparison
                          </Link>
                          <Link
                            href="#"
                            className="border border-gray py-2 px-3 rounded-5 m-2"
                          >
                            Loans
                          </Link>
                          <Link
                            href="#"
                            className="border border-gray py-2 px-3 rounded-5 m-2"
                          >
                            Supports
                          </Link>
                        </div>
                      </div>
                      <div className="tag">
                        <p className="tag__name">Share -</p>
                        <div className="social">
                          <Link href="#">
                            <IconButton
                              icon={<i className="bi bi-facebook"></i>}
                            />
                          </Link>
                          <Link href="#">
                            <IconButton
                              icon={<i className="bi bi-twitter"></i>}
                            />
                          </Link>
                          <Link href="#">
                            <IconButton
                              icon={<i className="bi bi-pinterest"></i>}
                            />
                          </Link>
                          <Link href="#">
                            <IconButton
                              icon={<i className="bi bi-twitch"></i>}
                            />
                          </Link>
                          <Link href="#">
                            <IconButton
                              icon={<i className="bi bi-skype"></i>}
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </FadeTop>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-5 col-xl-4">
              <RightSide />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesDetails;
