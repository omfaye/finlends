import OutlineButton from "@/components/UI/OutlineButton";
import Link from "next/link";

export const comparisons = [
  {
    id: 1,
    features: "Loan Types",
    bank: "Personal, Mortgage",
    union: "Personal, Auto",
    lender: "Personal, Business",
  },
  {
    id: 2,
    features: "Interest Rates",
    bank: "5.5% - 7.2%",
    union: "4.8% - 6.5%",
    lender: "6.2% - 8.5%",
  },
  {
    id: 3,
    features: "Loan Amount Range",
    bank: "$5,000 - $100,000",
    union: "$2,000 - $50,000",
    lender: "$1,000 - $250,000",
  },
  {
    id: 4,
    features: "Repayment Terms",
    bank: "1 - 10 years",
    union: "1 - 7 years",
    lender: "1 - 15 years",
  },
  {
    id: 5,
    features: "Eligibility Criteria",
    bank: "Credit score above 650",
    union: "Membership, credit score 600",
    lender: "Credit score 550, business revenue",
  },
  {
    id: 6,
    features: "Application Process",
    bank: "In-person or online",
    union: "In-person or online",
    lender: "Online only",
  },
  {
    id: 7,
    features: "Customer Support",
    bank: "SupportPhone, Email, Branches",
    union: "Phone, Email, Branches",
    lender: "Online Chat, Email",
  },
  {
    id: 8,
    features: "Additional Fees",
    bank: "Origination fee, Late payment fee",
    union: "Membership fee, Late payment fee",
    lender: "Origination fee, Prepayment penalty",
  },
  {
    id: 9,
    features: "Customer Reviews",
    bank: (
      <div className="star_review">
        <i className="bi bi-star-fill star-active"></i>
        <i className="bi bi-star-fill star-active"></i>
        <i className="bi bi-star-fill star-active"></i>
        <i className="bi bi-star-fill star-active"></i>
        <i className="bi bi-star-half star-active"></i>
      </div>
    ),
    union: (
      <div className="star_review">
        <i className="bi bi-star-fill star-active"></i>
        <i className="bi bi-star-fill star-active"></i>
        <i className="bi bi-star-fill star-active"></i>
        <i className="bi bi-star-fill star-active"></i>
        <i className="bi bi-star-half star-active"></i>
      </div>
    ),
    lender: (
      <div className="star_review">
        <i className="bi bi-star-fill star-active"></i>
        <i className="bi bi-star-fill star-active"></i>
        <i className="bi bi-star-fill star-active"></i>
        <i className="bi bi-star-fill star-active"></i>
        <i className="bi bi-star-half star-active"></i>
      </div>
    ),
  },
  {
    id: 10,
    features: (
      <Link className="w-100 d-block" href="#">
        <OutlineButton text="Visit Site" />
      </Link>
    ),
    bank: (
      <Link className="w-100 d-block" href="#">
        <OutlineButton text="Visit Site" />
      </Link>
    ),
    union: (
      <Link className="w-100 d-block" href="#">
        <OutlineButton text="Visit Site" />
      </Link>
    ),
    lender: (
      <Link className="w-100 d-block" href="#">
        {" "}
        <OutlineButton text="Visit Site" />
      </Link>
    ),
  },
];
