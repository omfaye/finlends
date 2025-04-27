import Link from "next/link";
import { serviceCategory } from "../../../../public/data/servicesPageData";
import FadeRight from "@/components/motionEffect/FadeRight";
import FadeLeft from "@/components/motionEffect/FadeLeft";
import IconButton from "@/components/UI/IconButton";

const RightSide = () => {
  return (
    <div className="sidebar sidebar-sticky">
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
            <button type="submit" className="search_icon">
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
        <h4 className="sidebar__part-title">Share with</h4>
        <FadeRight>
          <div className="social mt_32">
            <Link href="#">
              <IconButton icon={<i className="bi bi-facebook"></i>} />
            </Link>
            <Link href="#">
              <IconButton icon={<i className="bi bi-twitter"></i>} />
            </Link>
            <Link href="#">
              <IconButton icon={<i className="bi bi-pinterest"></i>} />
            </Link>
            <Link href="#">
              <IconButton icon={<i className="bi bi-twitch"></i>} />
            </Link>
            <Link href="#">
              <IconButton icon={<i className="bi bi-skype"></i>} />
            </Link>
          </div>
        </FadeRight>
      </div>
    </div>
  );
};

export default RightSide;
