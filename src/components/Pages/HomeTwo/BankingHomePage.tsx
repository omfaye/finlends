"use client";
import React from 'react';
import Link from "next/link";
import Image from "next/image"; // Import Next.js Image component
import styles from './BankingHomepage.module.css';
import FadeLeft from "@/components/motionEffect/FadeLeft";
import FadeRight from "@/components/motionEffect/FadeRight";
import FadeDown from "@/components/motionEffect/FadeDown";
import FadeTop from "@/components/motionEffect/FadeTop";
import PrimaryButton from "@/components/UI/PrimaryButton";
import AboutButton from "@/components/UI/AboutButton";

const loanIcons = {
  student: "/images/loans/Student-Loan.svg",
  business: "/images/loans/Business-Loan.svg",
  construction: "/images/loans/construction-loan.svg",
  personal: "/images/loans/personal-loan.svg",
  mortgage: "/images/loans/mortgageloan.png",
  medical: "/images/loans/Medical-Loan.svg",
  home: "/images/loans/HomeLoan.svg",
  renovation: "/images/loans/Renovation-Loan.svg"
};

const BankingHomepage = () => {
  return (
    <section className={styles.bankingSection}>
      <div className={styles.bgWrapper}>
        {/* Background decorative elements */}
        <div className={styles.decorativeElements}>
          <div className={styles.circle1}></div>
          <div className={styles.circle2}></div>
          <div className={styles.circle3}></div>
          <div className={styles.circle4}></div>
          <div className={styles.circle5}></div>
        </div>
        
        <div className={`container ${styles.contentContainer}`}>
          {/* Header Section */}
          <div className="row justify-content-center position-relative">
  {/* Background image container - positioned absolutely */}
  <div className="position-absolute h-100" style={{ left: 0, top: 0, width: "30%", zIndex: 0 }}>
    <Image
      src="/images/background/Elements.png"
      alt="Banking background with financial elements"
      width={300}
      height={500}
      objectFit="contain"
      priority
      className="opacity-75"
    />
  </div>
  
  {/* Content container - with proper z-index to appear above background */}
  <div className="col-lg-9 col-xxl-8 position-relative" style={{ zIndex: 1 }}>
    <div className="section__content titlemain">
      <FadeLeft>
        <div className={styles.titleWrapper}>
          <div className={styles.dotContainer}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
          </div>
          <h1 className={styles.subTitle}>Find. Fit. Finance.

          </h1>
        </div>
      </FadeLeft>
      
      <FadeRight>
        <h1 className={styles.mainTitle}>Discover the loan that fits your life.
        </h1>
      </FadeRight>
      
      <FadeDown>
        <p className={styles.description}>
        At Finlends, we help you find the right loan, tailored to your needs — quickly, clearly, and confidently.
        </p>
      </FadeDown>
    </div>
  </div>
  
  <div className="col-12 col-md-9 col-lg-5 col-xxl-5">
    <FadeTop>
      <div className="hero--secondary__thumb">
        {/* Hero image placeholder */}
      </div>
    </FadeTop>
  </div>
</div>
          
          {/* Loan Options Cards */}
          <div className={styles.loanGrid}>
           
            <LoanCard 
              title="HOME LOAN" 
              iconSrc={loanIcons.home}
              link="/loan_reviews/HomeLoan"
            />

            <LoanCard 
              title="HOME LOAN BT TOP-UP" 
              iconSrc={loanIcons.home}
              link="/loan_reviews/HomeLoanBTTopUp"
            />
            
            <LoanCard 
              title="LOAN AGAINST PROPERTY" 
              iconSrc={loanIcons.home}
              link="/loan_reviews/LoanAgainstProperties"
            />
           
            <LoanCard 
              title="LOAN AGAINST PROPERTY BT TOP-UP" 
              iconSrc={loanIcons.personal}
              link="/loan_reviews/LoanAgainstPropertiesBTTopUp"
            />
            
            <LoanCard 
              title="EDUCATION LOAN" 
              iconSrc={loanIcons.mortgage}
              link="/loan_reviews/EducationLoan"
            />
            
            <LoanCard 
              title="BUSINESS LOAN" 
              iconSrc={loanIcons.business}
              link="/loan_reviews/BusinessLoan"
            />
            
            <LoanCard 
              title="CAR LOAN" 
              iconSrc={loanIcons.renovation}
              link="/loan_reviews/CarLoan"
            />
            
            <LoanCard 
              title="PERSONAL LOAN" 
              iconSrc={loanIcons.medical}
              link="/loan_reviews/PersonalLoan"
            />
          
            <LoanCard 
              title="CASH CREDIT/OD" 
              iconSrc={loanIcons.medical}
              link="/loan_reviews/CashCreditOD"
            />
            <LoanCard 
              title="SCHOOL FUNDING" 
              iconSrc={loanIcons.medical}
              link="/loan_reviews/SchoolFunding"
            />
            <LoanCard 
              title="BUILDER PROJECT FINANCE" 
              iconSrc={loanIcons.medical}
              link="/loan_reviews/BuilderProjectFinance"
            />
            <LoanCard 
              title="SHOP PURCHASE LOAN" 
              iconSrc={loanIcons.medical}
              link="/loan_reviews/ShopPurchaseLoan"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const LoanCard = ({ title, iconSrc, link = "#" }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div 
      className={styles.loanCard}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.iconWrapper}>
        <Image 
          src={iconSrc}
          alt={`${title} icon`}
          width={69}
          height={69}
          className={styles.loanIcon}
        />
      </div>
      <h3 className={styles.cardTitle}>{title}</h3>

      {/* Hover overlay with link inside */}
      <div className={`${styles.hoverOverlay} ${isHovered ? styles.active : ''}`}>
        <Link href={link} className={styles.cardText}>
          {title}
          <div className={styles.actionButton}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className={styles.arrowIcon}
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </Link>
      </div>
    </div>
  );
};


export default BankingHomepage;