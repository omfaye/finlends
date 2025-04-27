import dollar from "@/../public/images/hero_vector_dollar.png";
import massage from "@/../public/images/hero_vector_message.png";
import title from "@/../public/images/title_vector.png";
import about from "@/../public/images/about_us.png";
import Image from "next/image";
import { aboutdata } from "../../../../public/data/homePageData";
import Link from "next/link";
import FadeDown from "@/components/motionEffect/FadeDown";
import FadeTop from "@/components/motionEffect/FadeTop";
import PrimaryButton from "@/components/UI/PrimaryButton";

const About = () => {
  return (
    <section className="about-us section overflow-y-hidden">
      <div className="animation">
        <Image src={dollar} alt="Image" />
        <Image src={massage} alt="Image" />
      </div>
      <div className="container">
        <div className="row gy-5 gy-lg-0 justify-content-between align-items-center">
          <div className="col-12 col-lg-7 col-xxl-6">
            <div className="section__content ms-lg-4 ms-xl-0">
              <FadeDown>
                <span className="section__content-sub-title headingFour">
                  <Image src={title} alt="vector" /> About Us
                </span>
              </FadeDown>
              <FadeDown>
                <h2 className="section__content-title ">
                  Your Trusted Source for Loan Reviews and Comparison
                </h2>
              </FadeDown>
              <FadeTop>
                <p className="section__content-text ">
                  We are dedicated to providing you with a reliable and
                  user-friendly platform for loan reviews and comparison. With a
                  mission to simplify the loan selection
                </p>
              </FadeTop>
              <FadeTop>
                <div className="section__content-inner">
                  {aboutdata.map((data) => (
                    <div key={data.id} className="card card--small">
                      <div className="card--small-icon">
                        <Image
                          src={data.img}
                          alt="image"
                          width={36}
                          height={36}
                        />
                      </div>
                      <div className="card--small-content">
                        <h5 className="card--small-title">{data.title}</h5>
                        <p className="card--small-text">{data.des}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeTop>
              <FadeTop>
                <Link href="#" className="mt_40">
                  <PrimaryButton
                    text="Read On"
                    icon={<i className="bi bi-arrow-up-right"></i>}
                  />
                </Link>
              </FadeTop>
            </div>
          </div>
          <div className="col-12 col-md-8 col-lg-5 mx-auto mx-lg-0">
            <FadeDown>
              <div className="choose-us__thumb unset-xxl me-xl-4 me-xxl-0">
                <Image src={about} alt="images" />
              </div>
            </FadeDown>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
