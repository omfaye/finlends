export const navMenus = [
  {
    id: 1,
    name: "Home",
    isSubmenu: true,
    submenus: [
      {
        id: 1,
        title: "Home one",
        url: "/",
      },
      {
        id: 2,
        title: "Home Two",
        url: "/home_two",
      },
    ],
  },
   
  {
    id: 3,
    // name: "Loan Reviews", 
    name: "Retail Loan",
    isSubmenu: true,
    submenus: [
      {
        id: 1,
        title: "Home Loan",
        url: "/loan_reviews/HomeLoan",
      },
      {
        id: 2,
        title: "Home Loan BT Top Up",
        url: "/loan_reviews/HomeLoanBTTopUp",
      },
      {
        id: 3,
        title: "Loan Against Properties",
        url: "/loan_reviews/LoanAgainstProperties",
      },
      {
        id: 4,
        title: "Loan Against Properties BT Top Up",
        url: "/loan_reviews/LoanAgainstPropertiesBTTopUp",
      },
      {
        id: 5,
        title: "Education Loan",
        url: "/loan_reviews/EducationLoan",
      },
      {
        id: 6,
        title: "Car Loan",
        url: "/loan_reviews/CarLoan",
      },
      {
        id: 6,
        title: "Personal Loan",
        url: "/loan_reviews/PersonalLoan",
      },
    ],
  },
  {
    id: 4,
    // name: "Loan Reviews", 
    name: "MSME Loan",
    isSubmenu: true,
    submenus: [
      {
        id: 1,
        title: "Business Loan",
        url: "/loan_reviews/BusinessLoan",
      },
      {
        id: 2,
        title: "Cash Credit Over Draft",
        url: "/loan_reviews/CashCreditOverDraft",
      },
      {
        id: 3,
        title: "School Funding ",
        url: "/loan_reviews/SchoolFunding",
      },
      {
        id: 4,
        title: "Builder Project finance",
        url: "/loan_reviews/BuilderProjectFinance",
      },
      {
        id: 6,
        title: "Shop Purchase Loan",
        url: "/loan_reviews/ShopPurchaseLoan",
      },
    ],
  },
  {
    id: 5,
    // name: "Loan Comparison",
     name: "Credit Score",
    url: "/loan_comparision",
    isSubmenu: false,
  },
  {
    id: 6,
    // name: "Loan Comparison",
     name: "EMI Calculator",
    url: "/loan_comparision",
    isSubmenu: false,
  },
  // {
  //   id: 4,
  //   // name: "Pages",
  //   name: "Blog",
  //   isSubmenu: true,
  //   submenus: [
  //     {
  //       id: 1,
  //       title: "About us",
  //       url: "/about_us",
  //     },
  //     {
  //       id: 2,
  //       title: "Services",
  //       url: "/services",
  //     },
  //     {
  //       id: 3,
  //       title: "Services Details",
  //       url: "/services_details",
  //     },

  //     {
  //       id: 5,
  //       title: "Blog",
  //       url: "/blog",
  //     },
  //     {
  //       id: 6,
  //       title: "Blog Details",
  //       url: "/blog_details",
  //     },
  //     {
  //       id: 7,
  //       title: "FAQs",
  //       url: "/faqs",
  //     },
  //     {
  //       id: 8,
  //       title: "Sign Up",
  //       url: "/sign_up",
  //     },
  //     {
  //       id: 9,
  //       title: "Sign In",
  //       url: "/sign_in",
  //     },
  //     {
  //       id: 10,
  //       title: "404 Error Page",
  //       url: "/error",
  //     },
  //   ],
  // },
 
  {
    id: 7,
    // name: "Contact us",
    name: "Contact us",
    url: "/contact",
    isSubmenu: false,
  }
];
