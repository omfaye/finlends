"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "@/../public/images/logo.png";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import PrimaryButton from "../UI/PrimaryButton";
import { navMenus } from "../../../public/data/headerData";
import SearchButton from "../UI/SearchButton";
import AnimateHeight from "react-animate-height";

const NavbarTwo = () => {
  const refOne = useRef(null);
  const path = usePathname();
  const [bgColor, setBgColor] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<boolean>(false);
  const [toggle, setToggle] = useState<null | number>(null);

  const handleToggle = (idx: number) => {
    if (toggle === idx) {
      setToggle(null);
    } else {
      setToggle(idx);
    }
    return { toggle, handleToggle };
  };

  const handleSearch = (): void => {
    setSearchInput(!searchInput);
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 100) {
        setBgColor(true);
      } else {
        setBgColor(false);
      }
    });
  }, []);

  const handleClickOutside = (e: MouseEvent) => {
    //@ts-ignore
    if (!refOne?.current?.contains(e.target)) {
      setSearchInput(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <header
        className={
          bgColor ? "header-section header-animation2" : "header-section"
        }
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="navbar navbar-expand-xl nav-shadow " id="#navbar">
                <Link className="navbar-brand" href="/home_two">
                  <Image src={logo} className="logo" alt="logo" />
                </Link>

                <Link
                  href="#"
                  className={`navbar-toggler `}
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRight"
                  aria-controls="offcanvasRight"
                >
                  <i className="bi bi-list"></i>
                </Link>

                <div
                  className="collapse navbar-collapse ms-auto "
                  id="navbar-content"
                >
                  <div className="main-menu">
                    <div className="navbar-nav mb-lg-0 mx-auto">
                      {navMenus.map(
                        ({ id, name, submenus, url, isSubmenu }) => {
                          const isActive = submenus?.some(
                            (p) => path === p.url
                          );
                          return (
                            <div key={id} className=" dropdown nav-item">
                              {isSubmenu ? (
                                <>
                                  <button
                                    className={`nav-link dropdown-toggle ${
                                      isActive ? "activeColor" : ""
                                    }`}
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    {name}
                                  </button>
                                  <div className="dropdown-menu">
                                    <ul>
                                      {submenus?.map((menu) => (
                                        <li key={menu.id}>
                                          <Link
                                            className={`dropdown-item ${
                                              path === menu.url
                                                ? "activeColor"
                                                : ""
                                            }`}
                                            href={menu.url}
                                          >
                                            {menu.title}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </>
                              ) : (
                                <div className="nav-item">
                                  <Link
                                    className={`nav-link ${
                                      path == url ? "activeColor" : ""
                                    }`}
                                    href={`${url}`}
                                  >
                                    {name}
                                  </Link>
                                </div>
                              )}
                            </div>
                          );
                        }
                      )}
                    </div>
                    <div className="nav-right d-none d-xl-block" ref={refOne}>
                      <div className="nav-right__search">
                        {/* <button
                          onClick={handleSearch}
                          className="bg-transparent"
                        >
                          <SearchButton
                            icon={<i className="bi bi-search"></i>}
                          />
                        </button> */}
                        <Link href="/sign_in">
                          <PrimaryButton
                            text="Login "
                            // chnage to sign up to login 
                            icon={<i className="bi bi-arrow-up-right"></i>}
                          />
                        </Link>
                      </div>
                      <div
                        className={`nav-right__search-inner ${
                          searchInput ? "d-block" : "d-none"
                        }`}
                      >
                        <div className="nav-search-inner__form">
                          <form
                            method="POST"
                            id="search"
                            className="inner__form"
                          >
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
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
        {/* offcanvas */}
        <div className="">
          <div
            className={`offcanvas offcanvas-start`}
            tabIndex={-1}
            id="offcanvasRight"
          >
            <div className="offcanvas-body custom-nevbar overflow-hidden z-2">
              <div className="row">
                <div className="custom-nevbar__left">
                  <div className="sidebar-header">
                    <Link href="/home_two" className="">
                      <Image
                        src={logo}
                        alt="logo"
                        data-bs-dismiss="offcanvas"
                        width={200}
                      />
                    </Link>

                    <button
                      type="button"
                      className="close-icon"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    >
                      <i className="bi bi-x"></i>
                    </button>
                  </div>
                  <div className="custom-nevbar__nav mb-lg-0 my-4 ">
                    {navMenus.map(
                      ({ id, name, submenus, url, isSubmenu }, idx) => {
                        const isActive = submenus?.some((p) => path === p.url);
                        return (
                          <div key={id} className="menu_item dropdown mt-2 ">
                            {isSubmenu ? (
                              <>
                                <div className="  border border-secondary  px-3 rounded w-100">
                                  <Link
                                    className={`menu_link  dropdown-toggle nav-menu w-100 ${
                                      isActive ? "dropdown_active_color" : ""
                                    }`}
                                    href="#"
                                    onClick={() => handleToggle(idx)}
                                  >
                                    {name}
                                  </Link>
                                  <div>
                                    <AnimateHeight
                                      duration={500}
                                      height={toggle === idx ? "auto" : 0}
                                    >
                                      <ul className="mb-2">
                                        {submenus?.map((menu) => (
                                          <li
                                            className="border border-secondary w-100 px-3 rounded mt-2"
                                            key={menu.id}
                                            data-bs-dismiss="offcanvas"
                                          >
                                            <Link
                                              className={`dropdown-item ${
                                                path === menu.url
                                                  ? "dropdown_active_color"
                                                  : ""
                                              }`}
                                              href={`${menu.url}`}
                                            >
                                              {menu.title}
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </AnimateHeight>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <div
                                className="menu_item"
                                data-bs-dismiss="offcanvas"
                              >
                                <Link
                                  aria-label="Close"
                                  className={`nav-menu-link border border-secondary w-100 px-3 rounded ${
                                    path === url ? "dropdown_active_color" : ""
                                  }`}
                                  href={`${url}`}
                                >
                                  {name}
                                </Link>
                              </div>
                            )}
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default NavbarTwo;
