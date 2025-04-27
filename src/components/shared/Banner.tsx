import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";

type BreadCrumbPropsType = {
  items: string[];
  banner_img: StaticImageData;
  heading: string;
};

const Banner = ({ items, banner_img, heading }: BreadCrumbPropsType) => {
  return (
    <section className="banner">
      <div className="container ">
        <div className="row gy-4 gy-sm-0 align-items-center">
          <div className="col-12 col-sm-6">
            <div className="banner__content">
              <h1 className="banner__title display-4">{heading}</h1>
              {/* breadCrumb part  */}
              <div className="banner_dir">
                <ul className="d-flex align-items-center gap-1 text-white res-margin-top ">
                  {items.map((item, i) => (
                    <React.Fragment key={item}>
                      <li className="lastBread">
                        {item === "Home" ? (
                          <Link
                            className={`banner_dir_item mb-2`}
                            href={item == "Home" ? "/" : "#"}
                          >
                            {item}
                          </Link>
                        ) : (
                          <div className={`banner_dir_item mb-2`}>{item}</div>
                        )}
                      </li>
                      {i !== items.length - 1 && (
                        <li>
                          <i className="bi bi-chevron-right text-white"></i>
                        </li>
                      )}
                    </React.Fragment>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6">
            <div className="banner__thumb text-end banner-animation">
              <Image src={banner_img} alt="image" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
