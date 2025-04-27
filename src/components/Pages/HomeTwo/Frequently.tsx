import Image from "next/image";
import tittle from "@/../public/images/title_vector.png";
import { faqDataOne } from "../../../../public/data/homeTwoFrequently";

const Frequently = () => {
  return (
    <section className="section faq-section" id="faqa">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-7 col-xxl-6">
            <div className="section__header">
              <span className="section__header-sub-title headingFour">
                <Image src={tittle} alt="vector" />
                Frequently Asked Questions
              </span>
              <h2 className="section__header-title">
                Find Answers to Common Questions
              </h2>
              <p className="section__header-content">
                We've compiled a list of frequently asked questions to provide
                you with quick and helpful answers. If you have a question that
                is not addressed below
              </p>
            </div>
          </div>
        </div>
        <div className="row justify-content-center gy-4 gy-lg-0">
          <div className="col-12 col-lg-10 col-xxl-8">
            <div className="accordion" id="faq">
              {faqDataOne.map(({ id, headerId, question, collapseId, ans }) => (
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Frequently;
