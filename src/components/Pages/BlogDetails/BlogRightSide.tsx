import FadeLeft from "@/components/motionEffect/FadeLeft";
import FadeRight from "@/components/motionEffect/FadeRight";
import Link from "next/link";
import { serviceCategory } from "../../../../public/data/servicesPageData";

import Image from "next/image";
import { posts } from "../../../../public/data/BlogDetailsData";
import FadeDown from "@/components/motionEffect/FadeDown";
import FadeTop from "@/components/motionEffect/FadeTop";
import OutlineButton from "@/components/UI/OutlineButton";
import IconButton from "@/components/UI/IconButton";

const BlogRightSide = () => {
  return (
    <div className="sidebar sidebar-sticky ">
      <div className="sidebar__part">
        <h4 className="sidebar__part-title">Search</h4>
        <form method="POST" id="filter_search" className="filter__search">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              required
            />
            <button type="submit" className="search_icon" aria-label="icon">
              <i className="bi bi-search"></i>
            </button>
          </div>
        </form>
      </div>
      <div className="sidebar__part">
        <h4 className="sidebar__part-title">Category</h4>
        <FadeLeft>
          <ul className="category">
            {serviceCategory.map((data) => (
              <li key={data.id}>
                <Link href="#">
                  <span className="caregory__icon">{data.img}</span>
                  <span className="caregory__content">{data.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </FadeLeft>
      </div>

      <div className="sidebar__part">
        <FadeRight>
          <h4 className="sidebar__part-title">Recent Posts</h4>
        </FadeRight>

        <div className="recent-posts">
          {posts.map((post) => (
            <FadeDown key={post.id}>
              <div className="recent-posts__part">
                <div className="recent-posts__thumb">
                  <Image src={post.img} alt="image" />
                </div>
                <div className="recent-posts__title">
                  <h5>
                    <Link href="#">{post.title}</Link>
                  </h5>
                  <Link href="#" className="mt_12 read_more">
                    Read On <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </FadeDown>
          ))}

          <FadeTop>
            <div className="section__cta text-start mt-2">
              <Link href="/sign_in">
                <OutlineButton
                  text="More Post"
                  icon={<i className="bi bi-arrow-up-right"></i>}
                />
              </Link>
            </div>
          </FadeTop>
        </div>
      </div>
      <div className="sidebar__part">
        <FadeRight>
          <h4 className="sidebar__part-title">Populer Tag</h4>
        </FadeRight>
        <FadeDown>
          <div className="tag-area">
            <div className="tag">
              <div className="tag-content">
                <Link
                  href="#"
                  className="border border-gray py-2 px-2  rounded-5"
                >
                  Loans
                </Link>
                <Link
                  href="#"
                  className="border border-gray py-2 px-2  rounded-5"
                >
                  Personal Loans
                </Link>
                <Link
                  href="#"
                  className="border border-gray py-2 px-2  rounded-5"
                >
                  Auto Loans
                </Link>
                <Link
                  href="#"
                  className="border border-gray py-2 px-2  rounded-5"
                >
                  Mortgage
                </Link>
                <Link
                  href="#"
                  className="border border-gray py-2 px-2  rounded-5 hover:bg-success"
                >
                  Student Loans
                </Link>
                <Link
                  href="#"
                  className="border border-gray py-2 px-2  rounded-5"
                >
                  Auto Loans
                </Link>
                <Link
                  href="#"
                  className="border border-gray py-2 px-2  rounded-5"
                >
                  Refinancing
                </Link>
                <Link
                  href="#"
                  className="border border-gray py-2 px-2  rounded-5"
                >
                  Interest Rates
                </Link>
                <Link
                  href="#"
                  className="border border-gray py-2 px-2  rounded-5"
                >
                  Loan Tips
                </Link>
                <Link
                  href="#"
                  className="border border-gray py-2 px-2  rounded-5"
                >
                  Loan Terms
                </Link>
              </div>
            </div>
          </div>
        </FadeDown>
        <FadeTop>
          <div className="section__cta text-start">
            <Link href="/blog">
              <OutlineButton
                text="More Tag"
                icon={<i className="bi bi-arrow-up-right"></i>}
              />
            </Link>
          </div>
        </FadeTop>
      </div>

      <div className="sidebar__part">
        <h4 className="sidebar__part-title">Share with</h4>
        <FadeRight>
          <div className="social mt_32">
            <Link href="#" aria-label="icon">
              <IconButton icon={<i className="bi bi-facebook"></i>} />
            </Link>
            <Link href="#" aria-label="icon">
              <IconButton icon={<i className="bi bi-twitter"></i>} />
            </Link>
            <Link href="#" aria-label="icon">
              <IconButton icon={<i className="bi bi-pinterest"></i>} />
            </Link>
            <Link href="#" aria-label="icon">
              <IconButton icon={<i className="bi bi-twitch"></i>} />
            </Link>
            <Link href="#" aria-label="icon">
              <IconButton icon={<i className="bi bi-skype"></i>} />
            </Link>
          </div>
        </FadeRight>
      </div>
    </div>
  );
};

export default BlogRightSide;
