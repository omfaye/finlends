import Banner from "@/components/shared/Banner";
import banner from "@/../public/images/about_banner.png";
import choose_us from "@/../public/images/choose_us.png";
import tittle from "@/../public/images/title_vector.png";
import Image from "next/image";
import Link from "next/link";
import FadeDown from "@/components/motionEffect/FadeDown";
import FadeTop from "@/components/motionEffect/FadeTop";
import About from "@/components/Pages/Home/About";
import Counter from "@/components/Pages/HomeTwo/Counter";
import WorkingProcess from "@/components/Pages/Home/WorkingProcess";
import DownloadApp from "@/components/Pages/Home/DownloadApp";
import Calculetor from "@/components/Pages/Home/Calculetor";
import Testimonials from "@/components/Pages/Home/Testimonials";
import PrimaryButton from "@/components/UI/PrimaryButton";

const About_Us = () => {
  return (
    <div>
      <Banner
        heading={"About Us"}
        items={["Home", "Pages", "About us"]}
        banner_img={banner}
      ></Banner>
      <section className="container">
        <div className="row gy-5 gy-lg-0 justify-content-between align-items-center section">
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
                  <Image src={tittle} alt="vector" /> Why Choose Us
                </span>
                <h2 className="section__content-title">
                  Experience Excellence in Loan Review and Comparison
                </h2>
              </FadeDown>
              <FadeTop>
                <p className="section__content-text">
                  Our dedicated team of experts conducts thorough research and
                  analysis to provide you with comprehensive and unbiased
                  reviews of various loan options.
                </p>
              </FadeTop>
              <FadeDown>
                <div className="section__content-inner">
                  <ul>
                    <li>
                      <i className="bi bi-check2-circle"></i> Comprehensive and
                      Reviews
                    </li>
                    <li>
                      <i className="bi bi-check2-circle"></i> Expert Guidance
                      and Insights
                    </li>
                    <li>
                      <i className="bi bi-check2-circle"></i> User-Friendly
                      Comparison
                    </li>
                    <li>
                      <i className="bi bi-check2-circle"></i> Trusted User
                      Reviews
                    </li>
                  </ul>
                </div>

                <Link href="#" className="mt_40">
                  <PrimaryButton
                    text="Read On"
                    icon={<i className="bi bi-arrow-up-right"></i>}
                  />
                </Link>
              </FadeDown>
            </div>
          </div>
        </div>
      </section>
      <About />

      <div className="container">
        <Counter />
      </div>

      <WorkingProcess />
      <DownloadApp />
      <Calculetor />
      <Testimonials />
    </div>
  );
};

export default About_Us;
