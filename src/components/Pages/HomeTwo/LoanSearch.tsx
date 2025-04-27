import title from "@/../public/images/title_vector.png";
import solution from "@/../public/images/loan_solution.png";
import Image from "next/image";
import FadeLeft from "@/components/motionEffect/FadeLeft";
import FadeDown from "@/components/motionEffect/FadeDown";
import PrimaryButton from "@/components/UI/PrimaryButton";
import Link from "next/link";

const LoanSearch = () => {
  return (
    <section className="loan-solution section">
      <div className="container position-relative">
        <div className="row gy-5 gy-xl-0 justify-content-center justify-content-xxl-between align-items-center">
          <div className="col-12 col-lg-6 col-xxl-6">
            <FadeLeft>
              <div className="section__content ms-xl-4 ms-xl-0">
                <span className="section__content-sub-title headingFour">
                  <Image src={title} alt="vector" /> Start Your Loan Search
                  Today
                </span>
                <h2
                  className="section__content-title wow fadeInUp"
                  data-wow-duration="0.8s"
                >
                  Find the Perfect Loan Solution for Your Financial Needs
                </h2>
                <Link href="/contact" className="mt-3">
                  <PrimaryButton
                    text="Contact Us"
                    icon={<i className="bi bi-arrow-up-right"></i>}
                  />
                </Link>
              </div>
            </FadeLeft>
          </div>
          <div className="col-12 col-sm-8 col-md-6 col-xxl-5">
            <div className="loan-solution__thumb unset-xxl">
              <FadeDown>
                <Image src={solution} alt="image" />
              </FadeDown>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoanSearch;
