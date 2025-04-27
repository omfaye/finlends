import tittle from "@/../public/images/title_vector.png";
import Image from "next/image";
import { workingProcess } from "../../../../public/data/homePageData";
import FadeDown from "@/components/motionEffect/FadeDown";
import FadeTop from "@/components/motionEffect/FadeTop";

const WorkingProcess = () => {
  return (
    <section className="working-process section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-6 col-xxl-5">
            <div className="section__header">
              <FadeDown>
                <span className="section__header-sub-title headingFour">
                  <Image src={tittle} alt="vector" />
                  Our Working Process
                </span>
                <h2 className="section__header-title">
                  Simplified Steps to Find Your Ideal Loan
                </h2>
              </FadeDown>
              <FadeTop>
                <p className="section__header-content ch-xxl ">
                  Our working process is designed to make your loan search and
                  selection as seamless as possible.
                </p>
              </FadeTop>
            </div>
          </div>
        </div>
        <div className="row g-2 g-md-4">
          {workingProcess.map((process) => (
            <div key={process.id} className="col-12 col-sm-6 col-xxl-3 ">
              <div className="card card--custom">
                <div className="card__icon">
                  <Image
                    src={process.img}
                    alt="icon"
                    width={64}
                    height={64}
                    className=""
                  />
                  <span className="number-bullet">{process.bullet}</span>
                </div>
                <div className="card__content">
                  <h5 className="card__title">{process.title}</h5>
                  <p className="fs-small">{process.des}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkingProcess;
