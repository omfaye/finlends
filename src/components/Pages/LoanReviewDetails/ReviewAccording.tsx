import React from "react";
import { faqDataOne } from "../../../../public/data/homeTwoFrequently";

const ReviewAccording = () => {
  return (
    <div className="faq-section" id="faqa">
      <h4> Frequently Asked Question</h4>
      <div className="accordion mt_40" id="faq">
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
  );
};

export default ReviewAccording;
