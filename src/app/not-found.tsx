import Image from "next/image";
import error from "@/../public/images/error_page.png";
import FadeDown from "@/components/motionEffect/FadeDown";
import FadeTop from "@/components/motionEffect/FadeTop";
import Link from "next/link";
import PrimaryButton from "@/components/UI/PrimaryButton";

const NotFound = () => {
  return (
    <section className="error-page text-center section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-9 col-xxl-8">
            <div
              className="error-page__thumb wow fadeInDown"
              data-wow-duration="0.8s"
            >
              <Image src={error} alt="images" />
            </div>
          </div>
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="section__content mt-5">
              <FadeDown>
                <h2 className="section__content-title">Oops! Page Not Found</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </FadeDown>
              <FadeTop>
                <Link href="/" className=" mt_40">
                  <PrimaryButton
                    text="Back To Home"
                    icon={<i className="bi bi-arrow-up-right"></i>}
                  />
                </Link>
              </FadeTop>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
