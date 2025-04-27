"use client";
import React from "react";
import "./HomeLoanApplicationPage.css";
import title from "@/../public/images/title_vector.png";
import Image from "next/image";
import Link from "next/link";
import FadeLeft from "@/components/motionEffect/FadeLeft";
import FadeDown from "@/components/motionEffect/FadeDown";
import FadeTop from "@/components/motionEffect/FadeTop";
import PrimaryButton from "@/components/UI/PrimaryButton";

import HomeLoanApplication from "@/components/Pages/Home/HomeLoanApplication";

const HomeLoanApplicationPage = () => {
  return (
    <div className="bankingSection">
      <div className="container">
        <h1 className="mainTitle">Home Loan Application</h1>
        <HomeLoanApplication/>
      </div>
    </div>
  );
};

export default HomeLoanApplicationPage;