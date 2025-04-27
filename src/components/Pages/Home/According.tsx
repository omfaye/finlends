import Image from "next/image";
import title from "@/../public/images/title_vector.png";
import FadeDown from "@/components/motionEffect/FadeDown";
import FadeTop from "@/components/motionEffect/FadeTop";
import {
  faqDataOne,
  faqDataTwo,
} from "../../../../public/data/homeTwoFrequently";

const According = () => {
  return (
    <section className="section faq-section" id="faqa">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-7 col-xxl-6">
            <div className="section__header">
              <FadeDown>
                <span className="section__header-sub-title headingFour">
                  <Image src={title} alt="vector" />
                  Frequently Asked Questions
                </span>
              </FadeDown>
              <FadeTop>
                <h2 className="section__header-title">
                  Find Answers to Common Questions
                </h2>
              </FadeTop>
              <FadeDown>
                <p className="section__header-content">
                  We've compiled a list of frequently asked questions to provide
                  you with quick and helpful answers. If you have a question
                  that is not addressed below
                </p>
              </FadeDown>
            </div>
          </div>
        </div>
        <div className="row justify-content-between gy-4 gy-lg-0">
          <div className="col-12 col-lg-6 col-xxl-6">
            <FadeDown>
              <div className="accordion" id="faq">
                {faqDataOne.map(
                  ({ id, headerId, question, collapseId, ans }) => (
                    <div key={id} className="accordion-item">
                      <div className="accordion-header" id={headerId}>
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#${collapseId}`}
                          aria-expanded="true"
                          aria-controls={collapseId}
                        >
                          {question}
                        </button>
                        <div
                          id={collapseId}
                          className="accordion-collapse collapse"
                          aria-labelledby={headerId}
                          data-bs-parent="#faq"
                        >
                          <div className="accordion-body">
                            <p className="mb-0">{ans}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </FadeDown>
          </div>
          <div className="col-12 col-lg-6 col-xxl-6">
            <FadeTop>
              <div className="accordion" id="faq2">
                {faqDataTwo.map(
                  ({ id, headerId, question, collapseId, ans }) => (
                    <div key={id} className="accordion-item">
                      <div className="accordion-header" id={headerId}>
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#${collapseId}`}
                          aria-expanded="true"
                          aria-controls={collapseId}
                        >
                          {question}
                        </button>
                        <div
                          id={collapseId}
                          className="accordion-collapse collapse"
                          aria-labelledby={headerId}
                          data-bs-parent="#faq2"
                        >
                          <div className="accordion-body">
                            <p className="mb-0">{ans}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </FadeTop>
          </div>
        </div>
      </div>
    </section>
  );
};

export default According;
