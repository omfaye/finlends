import Banner from "@/components/shared/Banner";
import banner from "@/../public/images/blog_banner.png";
import RightSide from "@/components/Pages/Services/RightSide";
import Link from "next/link";
import Image from "next/image";
import { blogsData } from "../../../../public/data/blogPageData";
import FadeDown from "@/components/motionEffect/FadeDown";

const Blog = () => {
  return (
    <div>
      <Banner
        heading={"Blog"}
        items={["Home", "Pages", "Blog"]}
        banner_img={banner}
      ></Banner>
      <section className="blog section">
        <div className="container overflowHidden">
          <div className="row gy-5 gy-lg-0">
            <div className="col-12 col-lg-7 col-xl-8">
              <div className="row g-4">
                {blogsData.map((blog) => (
                  <div key={blog.id} className="col-12 col-xl-6">
                    <FadeDown>
                      <div className="card card--secondary">
                        <Link
                          href="/blog_details"
                          className="card--secondary__thumb zoom_effect"
                        >
                          <Image src={blog.img} alt="image" />
                        </Link>
                        <div className="card--secondary__content">
                          <p className="card--secondary__time mb-4 res-margin-bottom">
                            <span className="gap-6">
                              <i className="bi bi-person-circle"></i>
                              {blog.name}
                            </span>
                            <i className="bi bi-dot"></i>
                            <span className="gap-6">
                              <i className="bi bi-calendar3"></i>
                              {blog.date}
                            </span>
                          </p>
                          <h4>
                            <Link href="/blog_details">{blog.heading}</Link>
                          </h4>
                          <p className="mt-4 res-margin-top">{blog.des}</p>
                          <Link
                            href="/blog_details"
                            className="mt_32 read_more res-margin-top"
                          >
                            Read On <i className="bi bi-arrow-right"></i>
                          </Link>
                        </div>
                      </div>
                    </FadeDown>
                  </div>
                ))}
              </div>
              <div className="row">
                <div className="col-12">
                  <nav
                    aria-label="Page navigation"
                    className="nav_pagination wow fadeInUp"
                    data-wow-duration="0.8s"
                  >
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
            <div className="col-12 col-lg-5 col-xl-4">
              <RightSide />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
