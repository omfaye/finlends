"use client";
import React, { SyntheticEvent, useState } from "react";
import title from "@/../public/images/title_vector.png";
import Image from "next/image";
import Link from "next/link";
import FadeLeft from "@/components/motionEffect/FadeLeft";
import FadeDown from "@/components/motionEffect/FadeDown";
import FadeTop from "@/components/motionEffect/FadeTop";
import PrimaryButton from "@/components/UI/PrimaryButton";

const CreditScoreChecker = () => {
  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    panNumber: "",
    address: "",
    pinCode: "",
    consent: false,
    loading: false,
    error: "",
    success: false
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.consent) {
      setFormData(prev => ({...prev, error: "You must provide consent to check your credit score"}));
      return;
    }
    
    try {
      setFormData(prev => ({...prev, loading: true, error: ""}));
      
      // Replace this with your actual API endpoint
      const response = await fetch('/api/check-credit-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          dateOfBirth: formData.dateOfBirth,
          panNumber: formData.panNumber,
          address: formData.address,
          pinCode: formData.pinCode
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit request');
      }
      
      // Show success message
      setFormData(prev => ({
        ...prev, 
        loading: false, 
        success: true
      }));
      
      // Show success message
      handleCheckSubmit();
      
    } catch (error) {
      setFormData(prev => ({
        ...prev, 
        loading: false, 
        error: "An error occurred while submitting your request. Please try again."
      }));
    }
  };

  const handleCheckSubmit = () => {
    const formElements = document.querySelectorAll(".check-form");
    const resultElements = document.querySelectorAll(".check-result");

    formElements.forEach((element) => {
      element.classList.add("calc_hide");
    });

    resultElements.forEach((element) => {
      element.classList.add("calc_show");
    });
  };
  
  const handleBack = () => {
    const formElements = document.querySelectorAll(".check-form");
    const resultElements = document.querySelectorAll(".check-result");

    formElements.forEach((element) => {
      element.classList.remove("calc_hide");
    });

    resultElements.forEach((element) => {
      element.classList.remove("calc_show");
    });
    
    // Reset form
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      panNumber: "",
      address: "",
      pinCode: "",
      consent: false,
      loading: false,
      error: "",
      success: false
    });
  };
  
  return (
    <section className="calculator section overflow-y-hidden" id="credit-checker">
      <div className="container">
        <div className="row gy-5 gy-xl-0 justify-content-between align-items-center">
          <div className="col-12 col-lg-6 col-xxl-6 mx-auto mx-lg-0">
            <div className="calculator-input">
              {/* Form card */}
              <div className="card card--custom check-form">
                <FadeLeft>
                  <h3 className="text-start">Check Your Credit Score</h3>
                </FadeLeft>
                <div className="card--custom__loan">
                  <div className="card--custom__form">
                    <form
                      method="POST"
                      id="frmCheckCreditScore"
                      className="calculate__form"
                      onSubmit={handleSubmit}
                    >
                      <div className="row gy-4 mb_40">
                        <div className="col-12">
                          <div className="calculate__form-part">
                            <div className="input-single">
                              <label className="label" htmlFor="fullName">
                                Full Name <span>(as per PAN card)</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="fullName"
                                id="fullName"
                                placeholder="Enter your full name"
                                required
                                value={formData.fullName}
                                onChange={handleInputChange}
                              />
                            </div>
                            
                            <div className="row">
                              <div className="col-md-6">
                                <div className="input-single">
                                  <label className="label" htmlFor="email">
                                    Email Address
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="input-single">
                                  <label className="label" htmlFor="phone">
                                    Phone Number
                                  </label>
                                  <input
                                    type="tel"
                                    className="form-control"
                                    name="phone"
                                    id="phone"
                                    placeholder="Enter your phone number"
                                    required
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                  />
                                </div>
                              </div>
                            </div>
                            
                            <div className="row">
                              <div className="col-md-6">
                                <div className="input-single">
                                  <label className="label" htmlFor="dateOfBirth">
                                    Date of Birth
                                  </label>
                                  <input
                                    type="date"
                                    className="form-control"
                                    name="dateOfBirth"
                                    id="dateOfBirth"
                                    required
                                    value={formData.dateOfBirth}
                                    onChange={handleInputChange}
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="input-single">
                                  <label className="label" htmlFor="panNumber">
                                    PAN Number
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="panNumber"
                                    id="panNumber"
                                    placeholder="Enter your PAN number"
                                    required
                                    value={formData.panNumber}
                                    onChange={handleInputChange}
                                  />
                                </div>
                              </div>
                            </div>
                            
                            <div className="input-single">
                              <label className="label" htmlFor="address">
                                Current Address
                              </label>
                              <textarea
                                className="form-control"
                                name="address"
                                id="address"
                                placeholder="Enter your current address"
                                required
                                rows={3}
                                value={formData.address}
                                onChange={handleInputChange}
                              ></textarea>
                            </div>
                            
                            <div className="input-single">
                              <label className="label" htmlFor="pinCode">
                                PIN Code
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="pinCode"
                                id="pinCode"
                                placeholder="Enter your PIN code"
                                required
                                value={formData.pinCode}
                                onChange={handleInputChange}
                              />
                            </div>
                            
                            <div className="input-single mt-4">
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="consent"
                                  name="consent"
                                  checked={formData.consent}
                                  onChange={handleInputChange}
                                  required
                                />
                                <label className="form-check-label" htmlFor="consent">
                                  I consent to the processing of my personal information and credit check. 
                                  I understand this will not affect my credit score.
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {formData.error && (
                        <div className="alert alert-danger" role="alert">
                          {formData.error}
                        </div>
                      )}
                      
                      <button
                        id="check_submit"
                        type="submit"
                        className="bg-transparent"
                        disabled={formData.loading}
                      >
                        <PrimaryButton text={formData.loading ? "Processing..." : "Check My Score"} />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              
              {/* Result card */}
             
            </div>
          </div>
          
          {/* Right side part */}
          <div className="col-12 col-lg-6">
            <div className="section__content ms-lg-4 ms-xxl-0">
              <FadeDown>
                <span className="section__content-sub-title headingFour ">
                  <Image src={title} alt="vector" /> Credit Report
                </span>
              </FadeDown>
              <FadeTop>
                <h2 className="section__content-title">
                  Get Your Free Credit Report & Analysis
                </h2>
              </FadeTop>
              <FadeDown>
                <p className="section__content-text">
                  Knowing your credit score is the first step toward financial freedom.
                  Our secure process connects with major credit bureaus to provide you with 
                  your current score, detailed report analysis, and personalized improvement 
                  recommendations — all without impacting your credit score.
                </p>

                <ul className="section__content-list">
                  <li className="headingFive">No Impact on Your Credit Score</li>
                  <li className="headingFive">Secure & Confidential Process</li>
                  <li className="headingFive">Reports from Major Credit Bureaus</li>
                  <li className="headingFive">Personalized Score Improvement Plan</li>
                </ul>

                <Link href="/credit_education" className="mt_40">
                  <PrimaryButton
                    text="Learn About Credit Scores"
                    icon={<i className="bi bi-arrow-up-right"></i>}
                  />
                </Link>
              </FadeDown>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreditScoreChecker;