import Image from "next/image";
import Link from "next/link";
import logo from "@/../public/images/logo.png";

const FooterOne = () => {
  return (
    <footer className="footer footer-secondary">
      <div className="container">
        <div className="row section">
          <div className="col-12">
            <div className="footer-secondary__content">
              <div className="footer__logo">
                <Link href="/">
                  <Image src={logo} alt="Logo" />
                </Link>
              </div>
              <div className="quick-link order-1 order-lg-0">
                <ul className="quick-link__list">
                  <li>
                    <Link href="#">Help & Support</Link>
                  </li>
                  <li>
                    <Link href="#">Privacy policy</Link>
                  </li>
                  <li>
                    <Link href="#">Terms & Conditions</Link>
                  </li>
                  <li>
                    <Link href="#">Contact us</Link>
                  </li>
                </ul>
              </div>
              <div className="social">
                <Link href="#" className=" icon-one" aria-label="icon">
                  <i className="bi bi-facebook"></i>
                </Link>
                <Link href="#" className=" icon-one" aria-label="icon">
                  <i className="bi bi-twitter"></i>
                </Link>
                <Link href="#" className="icon-one" aria-label="icon">
                  <i className="bi bi-pinterest"></i>
                </Link>
                <Link href="#" className=" icon-one" aria-label="icon">
                  <i className="bi bi-twitch"></i>
                </Link>
                <Link href="#" className=" icon-one" aria-label="icon">
                  <i className="bi bi-skype"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="footer__copyright">
              <p className="copyright text-center">
                Copyright © 2023 <span id="copyYear"></span>{" "}
                <Link href="#" className="secondary_color">
                  FINVIEW
                </Link>
                . Designed By{" "}
                <Link href="#" className="secondary_color">
                  Pixelaxis
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterOne;
