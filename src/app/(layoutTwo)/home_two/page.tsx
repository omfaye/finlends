import ClientSlider from "@/components/Pages/Home/ClientSlider";

import Line from "@/components/Pages/Home/line";

import BankingHomepage from "@/components/Pages/HomeTwo/BankingHomePage";

import ClientTestimonal from "@/components/Pages/HomeTwo/ClientTestimonal";

import Works from "@/components/Pages/HomeTwo/Works";
import React from "react";

const HomeTwo = () => {
  return (
    <div>
      {/* <Banner /> */}
      <BankingHomepage/>
     
      <Works />

      <Line/>
      {/* <Choose />  */}
      <ClientSlider/>

      <Line/>

      <ClientTestimonal />
     
       {/* <HomeLoanApplication/> */}

      {/* <SchoolFundingLoanApplication/>
      
      <CashCreditODApplication/>

      <PersonalLoanApplication/>  */}

      {/* <CarLoanApplication/>

      <BuilderProjectFinanceApplication/>

      <LoanAgainstProperty/>

      <HomeLoanBTTopUp/> */}

      {/* <EducationLoanApplication/>
      
      <ShopPurchaseLoanApplication/>

      <BusinessLoanApplication/>

      <LoanAgainstPropertyTopUp/> */}
      {/* <EducationLoanApplication/> */}
{/*     
      <Counter />
      <AboutUs />
    
      <HomeLoanCalculator />
      
      <PersonalCalculator/>
      <HomeLoanBTTopupCalculator/> */}
      {/* <Calculetor /> */}
      {/* <LoanSearch />
      <ClientTestimonal />
      <DownloadApp />
      <Frequently />  */}
     
    </div>
  );
};

export default HomeTwo;
