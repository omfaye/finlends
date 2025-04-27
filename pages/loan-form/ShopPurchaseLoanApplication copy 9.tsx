"use client";
import React from "react";
import "./HomeLoanApplicationPage.css";
import HomeLoanApplication from "@/components/Pages/Home/HomeLoanApplication";
import ShopPurchaseLoanApplication from "@/components/Pages/Home/ShopPurchaseLoanApplication";

const ShopPurchaseLoanApplication = () => {
  return (
    <div className="bankingSection">
      <div className="container">
        <h1 className="mainTitle">Home Loan Application</h1>
        <HomeLoanApplication/>
      </div>
    </div>
  );
};

export default ShopPurchaseLoanApplication;