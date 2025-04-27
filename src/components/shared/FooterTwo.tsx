import Image from "next/image";
import Link from "next/link";
import logo from "@/../public/images/logo.png";

const FooterOne = () => {
  // Loan categories data
  const loanCategories = [
    {
      id: 3,
      name: "Retail Loan",
      submenus: [
        { id: 1, title: "Home Loan", url: "/loan_reviews" },
        { id: 2, title: "Home Loan BT Top Up", url: "/loan_reviews/HomeLoansMortgages" },
        { id: 3, title: "Loan Against Properties", url: "/loan_reviews" },
        { id: 4, title: "Loan Against Properties BT Top Up", url: "/loan_reviews" },
        { id: 5, title: "Education Loan", url: "/loan_reviews" },
        { id: 6, title: "Car Loan", url: "/loan_reviews" },
        { id: 7, title: "Personal Loan", url: "/loan_reviews" },
      ],
    },
    {
      id: 4,
      name: "MSME Loan",
      submenus: [
        { id: 1, title: "Business Loan", url: "/loan_reviews" },
        { id: 2, title: "Cash Credit Over Draft", url: "/loan_reviews" },
        { id: 3, title: "School Funding", url: "/loan_reviews" },
        { id: 4, title: "Builder Project finance", url: "/loan_reviews" },
        { id: 5, title: "Shop Purchase Loan", url: "/loan_reviews/HomeLoansMortgages" },
      ],
    },
  ];

  return (
    <footer className="footer footer-secondary pt-4"> {/* Added top padding */}
      <div className="container">
        <div className="row align-items-start"> {/* Align items to top */}
          {/* Left Side - Logo and Icons (Shifted left and down) */}
          <div className="col-md-3 mb-3 mb-md-0 ps-md-0 ps-3"> {/* Left padding adjustment */}
            <div className="footer__logo mb-3"> {/* Increased bottom margin */}
              <Link href="/">
                <Image 
                  src={logo} 
                  alt="Logo" 
                  width={250} 
                  height={75}
                  className="img-fluid"
                  style={{ marginLeft: '-8px' }} /* Slight left shift */
                />
              </Link>
            </div>
            <div className="social mt-3 ps-1"> {/* Increased top margin */}
              <Link href="#" className="icon-one mx-2" aria-label="Facebook">
                <i className="bi bi-facebook fs-3"></i>
              </Link>
              <Link href="#" className="icon-one mx-2" aria-label="Twitter">
                <i className="bi bi-twitter fs-3"></i>
              </Link>
              <Link href="#" className="icon-one mx-2" aria-label="Instagram">
                <i className="bi bi-instagram fs-3"></i>
              </Link>
              <Link href="#" className="icon-one mx-2" aria-label="LinkedIn">
                <i className="bi bi-linkedin fs-3"></i>
              </Link>
            </div>
          </div>

          {/* Right Side - Three Columns with More Space */}
          <div className="col-md-9">
            <div className="row g-4">
              {/* Retail Loan */}
              <div className="col-md-4">
                <div className="h-100 pe-4"> {/* Added right padding */}
                  <h3 className="footer__title mb-3">Retail Loan</h3>
                  <ul className="quick-link__list">
                    {loanCategories[0].submenus.map((submenu) => (
                      <li key={submenu.id} className="mb-3"> {/* Increased bottom margin */}
                        <Link href={submenu.url} className="hover:text-primary">
                          {submenu.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* MSME Loan */}
              <div className="col-md-4">
                <div className="h-100 pe-4"> {/* Added right padding */}
                  <h3 className="footer__title mb-3">MSME Loan</h3>
                  <ul className="quick-link__list">
                    {loanCategories[1].submenus.map((submenu) => (
                      <li key={submenu.id} className="mb-3"> {/* Increased bottom margin */}
                        <Link href={submenu.url} className="hover:text-primary">
                          {submenu.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Company */}
              <div className="col-md-4">
                <div className="h-100">
                  <h3 className="footer__title mb-3">Company</h3>
                  <ul className="quick-link__list">
                    <li className="mb-3"><Link href="#" className="hover:text-primary">About Us</Link></li>
                    <li className="mb-3"><Link href="#" className="hover:text-primary">News</Link></li>
                    <li className="mb-3"><Link href="#" className="hover:text-primary">Grow With Us</Link></li>
                    <li className="mb-3"><Link href="#" className="hover:text-primary">Contact Us</Link></li>
                    <li className="mb-3"><Link href="#" className="hover:text-primary">Privacy Policy</Link></li>
                    <li className="mb-3"><Link href="#" className="hover:text-primary">Data Storage Policy</Link></li>
                    <li className="mb-3"><Link href="#" className="hover:text-primary">Terms of Service</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright - Moved down slightly */}
        <div className="row mt-4 mb-2"> {/* Adjusted margins */}
          <div className="col-12">
            <div className="footer__copyright text-center">
              <p className="copyright m-0 py-2"> {/* Added vertical padding */}
                Copyright © {new Date().getFullYear()} FINLENDS. Designed By Blint Digital
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterOne;