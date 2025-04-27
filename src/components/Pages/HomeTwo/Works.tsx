import title from "@/../public/images/title_vector.png";
import work from "@/../public/images/how_works.png";
import Image from "next/image";
import { worksData } from "../../../../public/data/homeTwoData";
import FadeDown from "@/components/motionEffect/FadeDown";
import FadeTop from "@/components/motionEffect/FadeTop";

const Works = () => {
  return (
    <section className="how-works section py-16">
      <div className="container mx-auto">
        <div className="row">
          {/* Left Column - Image */}
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <FadeDown>
              <div className="how-works__image text-center">
                <Image 
                  src={work} 
                  alt="How Finlends Works" 
                  className="img-fluid rounded-lg mx-auto"
                />
              </div>
            </FadeDown>
          </div>
          
          {/* Right Column - Content */}
          <div className="col-md-6">
            <div className="section__content">
              <FadeDown>
                <div className="section__header mb-4 mt-4">
                  <div className="d-flex align-items-center mb-2">
                    <Image src={title} alt="vector" width={24} height={24} className="me-2" />
                    <h4 className="section__subtitle">
                      How Finlends Helps You Get Sanctioned in 4 Steps
                    </h4>
                  </div>
                  <h2 className="section__title fw-bold">
                    Simple Steps to Get Started
                  </h2>
                </div>
              </FadeDown>
              
              <FadeTop>
                <p className="section__description mb-5">
                  We simplify your loan journey from start to finish. With expert guidance at every stage, 
                  getting the right loan is now quick, clear, and stress-free.
                </p>
              </FadeTop>
              
              <div className="steps-container mt-4">
                {worksData.map((data, i) => (
                  <FadeDown key={i}>
                    <div className="step-card mb-4 p-4 border rounded-lg shadow-sm">
                      <div className="d-flex align-items-start">
                        <div className="step-icon me-4 position-relative">
                          <div className="icon-wrapper p-3 rounded-circle" style={{ minWidth: '70px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                              src={data.img}
                              alt={data.title}
                              width={40}
                              height={40}
                            />
                          </div>
                          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary fs-6" style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {i + 1}
                          </span>
                        </div>
                        <div className="step-content">
                          <h4 className="step-title fw-bold mb-2">{data.title}</h4>
                          <p className="step-description">{data.des}</p>
                        </div>
                      </div>
                    </div>
                  </FadeDown>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Works;