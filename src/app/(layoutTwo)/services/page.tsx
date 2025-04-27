import Banner from "@/components/shared/Banner";
import banner from "@/../public/images/service_banner.png";
import { services } from "../../../../public/data/servicesPageData";
import Image from "next/image";
import Link from "next/link";
import FadeDown from "@/components/motionEffect/FadeDown";

const Services = () => {
  return (
    <div>
      <Banner
        heading={"Services"}
        items={["Home", "Pages", "Services"]}
        banner_img={banner}
      ></Banner>

      <section className="feature feature--tertiary section">
        <div className="container">
          <div className="row g-3 g-sm-2 g-md-3 g-xxl-4">
            {services.map((service) => (
              <div key={service.id} className="col-12 col-sm-6 col-xl-4">
                <FadeDown>
                  <div className="card card--custom">
                    <div className="card__icon">
                      <Image src={service.img} alt="icon" />
                    </div>
                    <div className="card__content">
                      <h4 className="card__title">
                        <Link href="/services_details">{service.name}</Link>
                      </h4>
                      <p className="fs-small">{service.des}</p>
                      <Link
                        href="/services_details"
                        className="btn_theme social_box"
                        aria-label="icon"
                      >
                        <i className="bi bi-arrow-up-right"></i>
                      </Link>
                    </div>
                  </div>
                </FadeDown>
              </div>
            ))}
          </div>
          <div className="row">
            <div className="col-12">
              <nav aria-label="Page navigation" className="nav_pagination">
                <ul className="pagination">
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      <span className="prev-icon"></span>
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link active" href="#">
                      1
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      2
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link three_dots_box" href="#">
                      <span className="three-dots"> </span>
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      5
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      <span className="next-icon"></span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
