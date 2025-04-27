"use client";
import React, { SyntheticEvent, useState } from "react";
import title from "@/../public/images/title_vector.png";
import Image from "next/image";
import Link from "next/link";
import FadeLeft from "@/components/motionEffect/FadeLeft";
import FadeDown from "@/components/motionEffect/FadeDown";
import FadeTop from "@/components/motionEffect/FadeTop";
import PrimaryButton from "@/components/UI/PrimaryButton";

const HomeLoanApplication = () => {
  // Define the steps for the loan application
  const steps = [
    "Loan Amount",
    "Property Location",
    "Property Type",
    "Employment Type",
    "Employment Details",
    "Personal Information"
  ];

  // Form state
  const [formData, setFormData] = useState({
    // Step 1: Loan Amount
    loanAmount: 2000000,
    
    // Step 2: Property Location
    city: "",
    state: "",
    
    // Step 3: Property Type
    propertyType: "",
    
    // Step 4: Employment Type
    employmentType: "",
    
    // Step 5: Employment Details
    // For Salaried
    companyName: "",
    designation: "",
    workExperience: "",
    monthlyIncome: "",
    
    // For Self-Employed
    businessName: "",
    businessType: "",
    businessExperience: "",
    annualIncome: "",
    
    // Step 6: Personal Information
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    panNumber: "",
    address: "",
    pinCode: "",
    
    // Form control
    currentStep: 1,
    consent: false,
    loading: false,
    error: "",
    success: false
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      setFormData(prev => ({...prev, error: "You must provide consent to proceed with your loan application"}));
      return;
    }
    
    try {
      setFormData(prev => ({...prev, loading: true, error: ""}));
      
      // Replace this with your actual API endpoint
      const response = await fetch('/api/home-loan-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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
      handleApplicationSubmit();
      
    } catch (error) {
      setFormData(prev => ({
        ...prev, 
        loading: false, 
        error: "An error occurred while submitting your request. Please try again."
      }));
    }
  };

  const handleApplicationSubmit = () => {
    const formElements = document.querySelectorAll(".loan-form");
    const resultElements = document.querySelectorAll(".loan-result");

    formElements.forEach((element) => {
      element.classList.add("calc_hide");
    });

    resultElements.forEach((element) => {
      element.classList.add("calc_show");
    });
  };
  
  const handleBack = () => {
    if (formData.currentStep > 1) {
      setFormData(prev => ({...prev, currentStep: prev.currentStep - 1}));
    }
  };
  
  const handleNext = () => {
    if (formData.currentStep < steps.length) {
      setFormData(prev => ({...prev, currentStep: prev.currentStep + 1}));
    }
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const renderStep = () => {
    switch(formData.currentStep) {
      case 1:
        return (
          <div className="calculate__form-part">
            <h4 className="mb-4">Select your desired home loan amount</h4>
            <div className="input-single">
              <label className="label" htmlFor="loanAmount">
                Loan Amount: {formatCurrency(formData.loanAmount)}
              </label>
              <input
                type="range"
                className="form-range"
                name="loanAmount"
                id="loanAmount"
                min="500000"
                max="10000000"
                step="100000"
                value={formData.loanAmount}
                onChange={handleInputChange}
              />
              <div className="d-flex justify-content-between">
                <small>₹5 Lakhs</small>
                <small>₹1 Crore</small>
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="calculate__form-part">
            <h4 className="mb-4">Where are you looking to buy property?</h4>
            <div className="row">
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="city">
                    City
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    id="city"
                    placeholder="Enter city name"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="state">
                    State
                  </label>
                  <select
                    className="form-select"
                    name="state"
                    id="state"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                  >
                    <option value="">Select State</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="West Bengal">West Bengal</option>
                    {/* Add more states as needed */}
                  </select>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="calculate__form-part">
            <h4 className="mb-4">What is the type of property?</h4>
            <div className="input-single">
              <label className="label" htmlFor="propertyType">
                Property Type
              </label>
              <select
                className="form-select"
                name="propertyType"
                id="propertyType"
                required
                value={formData.propertyType}
                onChange={handleInputChange}
              >
                <option value="">Select Property Type</option>
                <option value="Apartment">Apartment</option>
                <option value="Independent House">Independent House</option>
                <option value="Villa">Villa</option>
                <option value="Plot">Plot</option>
                <option value="Under Construction">Under Construction</option>
                <option value="Ready to Move">Ready to Move</option>
              </select>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="calculate__form-part">
            <h4 className="mb-4">What is your employment type?</h4>
            <div className="input-single">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="salaried"
                      name="employmentType"
                      value="Salaried"
                      checked={formData.employmentType === "Salaried"}
                      onChange={handleInputChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="salaried">
                      Salaried
                    </label>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="selfEmployed"
                      name="employmentType"
                      value="Self-Employed"
                      checked={formData.employmentType === "Self-Employed"}
                      onChange={handleInputChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="selfEmployed">
                      Self-Employed
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="calculate__form-part">
            <h4 className="mb-4">Employment Details</h4>
            
            {formData.employmentType === "Salaried" ? (
              <div className="row gy-3">
                <div className="col-md-6">
                  <div className="input-single">
                    <label className="label" htmlFor="companyName">
                      Company Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="companyName"
                      id="companyName"
                      placeholder="Enter company name"
                      required
                      value={formData.companyName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-single">
                    <label className="label" htmlFor="designation">
                      Designation
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="designation"
                      id="designation"
                      placeholder="Enter your designation"
                      required
                      value={formData.designation}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-single">
                    <label className="label" htmlFor="workExperience">
                      Total Work Experience (Years)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="workExperience"
                      id="workExperience"
                      placeholder="Enter work experience"
                      min="0"
                      required
                      value={formData.workExperience}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-single">
                    <label className="label" htmlFor="monthlyIncome">
                      Monthly Income (₹)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="monthlyIncome"
                      id="monthlyIncome"
                      placeholder="Enter monthly income"
                      min="0"
                      required
                      value={formData.monthlyIncome}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            ) : formData.employmentType === "Self-Employed" ? (
              <div className="row gy-3">
                <div className="col-md-6">
                  <div className="input-single">
                    <label className="label" htmlFor="businessName">
                      Business Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="businessName"
                      id="businessName"
                      placeholder="Enter business name"
                      required
                      value={formData.businessName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-single">
                    <label className="label" htmlFor="businessType">
                      Business Type
                    </label>
                    <select
                      className="form-select"
                      name="businessType"
                      id="businessType"
                      required
                      value={formData.businessType}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Business Type</option>
                      <option value="Proprietorship">Proprietorship</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Private Limited">Private Limited</option>
                      <option value="LLP">LLP</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-single">
                    <label className="label" htmlFor="businessExperience">
                      Business Experience (Years)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="businessExperience"
                      id="businessExperience"
                      placeholder="Enter business experience"
                      min="0"
                      required
                      value={formData.businessExperience}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-single">
                    <label className="label" htmlFor="annualIncome">
                      Annual Income (₹)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="annualIncome"
                      id="annualIncome"
                      placeholder="Enter annual income"
                      min="0"
                      required
                      value={formData.annualIncome}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="alert alert-info">
                Please select an employment type in the previous step
              </div>
            )}
          </div>
        );
      
      case 6:
        return (
          <div className="calculate__form-part">
            <h4 className="mb-4">Personal Information</h4>
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
                  I consent to the processing of my personal information for this home loan application.
                  I confirm that all information provided is accurate and can be verified.
                </label>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderProgressBar = () => {
    const progress = (formData.currentStep / steps.length) * 100;
    
    return (
      <div className="progress mb-4" style={{ height: "10px" }}>
        <div 
          className="progress-bar bg-primary" 
          role="progressbar" 
          style={{ width: `${progress}%` }}
          aria-valuenow={progress} 
          aria-valuemin={0} 
          aria-valuemax={100}
        ></div>
      </div>
    );
  };
  
   
    return (
      <section className="calculator section overflow-y-hidden" id="home-loan">
        <div className="container">
          <div className="row gy-5 gy-xl-0 justify-content-between align-items-center">
            {/* Form card moved to left */}
            <div className="col-12 col-lg-6 col-xxl-6 mx-auto mx-lg-0">
              <div className="calculator-input">
                <div className="card card--custom loan-form">
                  <FadeLeft>
                    <h3 className="text-start">Home Loan Application</h3>
                  </FadeLeft>
                  
                  {renderProgressBar()}
                  
                  <div className="d-flex justify-content-between mb-4">
                    <span className="text-primary">Step {formData.currentStep} of {steps.length}</span>
                    <span className="fw-bold">{steps[formData.currentStep - 1]}</span>
                  </div>
                  
                  <div className="card--custom__loan">
                    <div className="card--custom__form">
                      <form
                        method="POST"
                        id="frmHomeLoan"
                        className="calculate__form"
                        onSubmit={handleSubmit}
                      >
                        <div className="row gy-4 mb_40">
                          <div className="col-12">
                            {renderStep()}
                            
                            {formData.error && (
                              <div className="alert alert-danger mt-4" role="alert">
                                {formData.error}
                              </div>
                            )}
                            
                            <div className="d-flex justify-content-between mt-5">
                              <button
                                type="button"
                                className="bg-transparent"
                                onClick={handleBack}
                                disabled={formData.currentStep === 1}
                              >
                                <PrimaryButton text="Previous" />
                              </button>
                              
                              {formData.currentStep < steps.length ? (
                                <button
                                  type="button"
                                  className="bg-transparent"
                                  onClick={handleNext}
                                >
                                  <PrimaryButton text="Next" />
                                </button>
                              ) : (
                                <button
                                  type="submit"
                                  className="bg-transparent"
                                  disabled={formData.loading}
                                >
                                  <PrimaryButton text={formData.loading ? "Processing..." : "Submit Application"} />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    
            {/* Content moved to right */}
            <div className="col-12 col-lg-6">
              <div className="section__content me-lg-4 me-xxl-0">
                <FadeDown>
                  <span className="section__content-sub-title headingFour ">
                    <Image src={title} alt="vector" /> Home Loan
                  </span>
                </FadeDown>
                <FadeTop>
                  <h2 className="section__content-title">
                    Make Your Dream Home a Reality
                  </h2>
                </FadeTop>
                <FadeDown>
                  <p className="section__content-text">
                    Our home loans are designed to help you achieve your dream of home ownership
                    with competitive interest rates, flexible repayment options, and a streamlined
                    application process. Take the first step towards owning your dream home today.
                  </p>
    
                  <ul className="section__content-list">
                    <li className="headingFive">Competitive Interest Rates</li>
                    <li className="headingFive">Up to 90% Loan-to-Value Ratio</li>
                    <li className="headingFive">Flexible Repayment Options</li>
                    <li className="headingFive">Quick Processing & Approval</li>
                    <li className="headingFive">Minimal Documentation</li>
                  </ul>
    
                  <Link href="/loan_education" className="mt_40">
                    <PrimaryButton
                      text="Learn About Home Loans"
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

export default HomeLoanApplication;