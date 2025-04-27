"use client";
import React, { SyntheticEvent, useState } from "react";
import title from "@/../public/images/title_vector.png";
import Image from "next/image";
import Link from "next/link";
import FadeLeft from "@/components/motionEffect/FadeLeft";
import FadeDown from "@/components/motionEffect/FadeDown";
import FadeTop from "@/components/motionEffect/FadeTop";
import PrimaryButton from "@/components/UI/PrimaryButton";

const BusinessLoanApplication = () => {

  const steps = [
    "Loan Amount",
    "Business Details",
    "Business Financials",
    "Employment Type",
    "Proprietor Details",
    "Personal Information"
  ];

  // Form state
  const [formData, setFormData] = useState({
    // Step 1: Loan Amount
    loanAmount: 1000000,
    loanPurpose: "",
    
    // Step 2: Business Details
    businessName: "",
    businessType: "",
    businessAddress: "",
    businessCity: "",
    businessState: "",
    businessPinCode: "",
    yearsInBusiness: "",
    
    // Step 3: Business Financials
    annualTurnover: "",
    monthlyProfit: "",
    existingLoans: "",
    gstRegistered: "",
    gstNumber: "",
    
    // Step 4: Employment Type
    employmentType: "",
    
    // Step 5: Proprietor Details
    // For Self-Employed
    businessOwnership: "",
    industryType: "",
    businessExperience: "",
    numberOfEmployees: "",
    
    // For Partnership/Company
    directorName: "",
    companyRegistrationNumber: "",
    partnershipDeed: "",
    partnerDetails: "",
    
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
      const response = await fetch('/api/business-loan-application', {
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
            <h4 className="mb-4">Select your desired business loan amount</h4>
            <div className="input-single">
              <label className="label" htmlFor="loanAmount">
                Loan Amount: {formatCurrency(formData.loanAmount)}
              </label>
              <input
                type="range"
                className="form-range"
                name="loanAmount"
                id="loanAmount"
                min="100000"
                max="5000000"
                step="50000"
                value={formData.loanAmount}
                onChange={handleInputChange}
              />
              <div className="d-flex justify-content-between">
                <small>₹1 Lakh</small>
                <small>₹50 Lakhs</small>
              </div>
            </div>
            <div className="input-single mt-4">
              <label className="label" htmlFor="loanPurpose">
                Purpose of Loan
              </label>
              <select
                className="form-select"
                name="loanPurpose"
                id="loanPurpose"
                required
                value={formData.loanPurpose}
                onChange={handleInputChange}
              >
                <option value="">Select Purpose</option>
                <option value="Working Capital">Working Capital</option>
                <option value="Business Expansion">Business Expansion</option>
                <option value="Equipment Purchase">Equipment Purchase</option>
                <option value="Inventory Finance">Inventory Finance</option>
                <option value="Debt Consolidation">Debt Consolidation</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="calculate__form-part">
            <h4 className="mb-4">Tell us about your business</h4>
            <div className="input-single">
              <label className="label" htmlFor="businessName">
                Business Name
              </label>
              <input
                type="text"
                className="form-control"
                name="businessName"
                id="businessName"
                placeholder="Enter your business name"
                required
                value={formData.businessName}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="input-single mt-3">
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
                <option value="Sole Proprietorship">Sole Proprietorship</option>
                <option value="Partnership">Partnership</option>
                <option value="Limited Liability Partnership">Limited Liability Partnership</option>
                <option value="Private Limited Company">Private Limited Company</option>
                <option value="Public Limited Company">Public Limited Company</option>
                <option value="One Person Company">One Person Company</option>
              </select>
            </div>
            
            <div className="input-single mt-3">
              <label className="label" htmlFor="businessAddress">
                Business Address
              </label>
              <textarea
                className="form-control"
                name="businessAddress"
                id="businessAddress"
                placeholder="Enter your business address"
                required
                rows={3}
                value={formData.businessAddress}
                onChange={handleInputChange}
              ></textarea>
            </div>
            
            <div className="row mt-3">
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="businessCity">
                    City
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="businessCity"
                    id="businessCity"
                    placeholder="Enter city"
                    required
                    value={formData.businessCity}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="businessState">
                    State
                  </label>
                  <select
                    className="form-select"
                    name="businessState"
                    id="businessState"
                    required
                    value={formData.businessState}
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
            
            <div className="row mt-3">
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="businessPinCode">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="businessPinCode"
                    id="businessPinCode"
                    placeholder="Enter PIN code"
                    required
                    value={formData.businessPinCode}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="yearsInBusiness">
                    Years in Business
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="yearsInBusiness"
                    id="yearsInBusiness"
                    placeholder="Enter years"
                    min="0"
                    required
                    value={formData.yearsInBusiness}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="calculate__form-part">
            <h4 className="mb-4">Business Financials</h4>
            <div className="row">
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="annualTurnover">
                    Annual Turnover (₹)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="annualTurnover"
                    id="annualTurnover"
                    placeholder="Enter annual turnover"
                    min="0"
                    required
                    value={formData.annualTurnover}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="monthlyProfit">
                    Monthly Profit (₹)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="monthlyProfit"
                    id="monthlyProfit"
                    placeholder="Enter monthly profit"
                    min="0"
                    required
                    value={formData.monthlyProfit}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            
            <div className="input-single mt-3">
              <label className="label" htmlFor="existingLoans">
                Any Existing Business Loans?
              </label>
              <select
                className="form-select"
                name="existingLoans"
                id="existingLoans"
                required
                value={formData.existingLoans}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            
            <div className="input-single mt-3">
              <label className="label" htmlFor="gstRegistered">
                Is your Business GST Registered?
              </label>
              <select
                className="form-select"
                name="gstRegistered"
                id="gstRegistered"
                required
                value={formData.gstRegistered}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            
            {formData.gstRegistered === "Yes" && (
              <div className="input-single mt-3">
                <label className="label" htmlFor="gstNumber">
                  GST Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="gstNumber"
                  id="gstNumber"
                  placeholder="Enter GST number"
                  required
                  value={formData.gstNumber}
                  onChange={handleInputChange}
                />
              </div>
            )}
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
                <div className="col-md-6 mb-3">
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="partnershipCompany"
                      name="employmentType"
                      value="Partnership/Company"
                      checked={formData.employmentType === "Partnership/Company"}
                      onChange={handleInputChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="partnershipCompany">
                      Partnership/Company
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
            <h4 className="mb-4">Proprietor Details</h4>
            
            {formData.employmentType === "Self-Employed" ? (
              <div className="row gy-3">
                <div className="col-md-6">
                  <div className="input-single">
                    <label className="label" htmlFor="businessOwnership">
                      Business Ownership
                    </label>
                    <select
                      className="form-select"
                      name="businessOwnership"
                      id="businessOwnership"
                      required
                      value={formData.businessOwnership}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Ownership</option>
                      <option value="Owned">Owned</option>
                      <option value="Rented">Rented</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-single">
                    <label className="label" htmlFor="industryType">
                      Industry Type
                    </label>
                    <select
                      className="form-select"
                      name="industryType"
                      id="industryType"
                      required
                      value={formData.industryType}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Industry</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Retail">Retail</option>
                      <option value="Wholesale">Wholesale</option>
                      <option value="Services">Services</option>
                      <option value="IT & Software">IT & Software</option>
                      <option value="Education">Education</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Food & Beverage">Food & Beverage</option>
                      <option value="Travel & Tourism">Travel & Tourism</option>
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
                    <label className="label" htmlFor="numberOfEmployees">
                      Number of Employees
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="numberOfEmployees"
                      id="numberOfEmployees"
                      placeholder="Enter number of employees"
                      min="0"
                      required
                      value={formData.numberOfEmployees}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            ) : formData.employmentType === "Partnership/Company" ? (
              <div className="row gy-3">
                <div className="col-md-6">
                  <div className="input-single">
                    <label className="label" htmlFor="directorName">
                      Director/Partner Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="directorName"
                      id="directorName"
                      placeholder="Enter director/partner name"
                      required
                      value={formData.directorName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-single">
                    <label className="label" htmlFor="companyRegistrationNumber">
                      Company Registration Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="companyRegistrationNumber"
                      id="companyRegistrationNumber"
                      placeholder="Enter registration number"
                      required
                      value={formData.companyRegistrationNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-single">
                    <label className="label" htmlFor="partnershipDeed">
                      Partnership Deed Available?
                    </label>
                    <select
                      className="form-select"
                      name="partnershipDeed"
                      id="partnershipDeed"
                      required
                      value={formData.partnershipDeed}
                      onChange={handleInputChange}
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>
                <div className="col-12">
                  <div className="input-single">
                    <label className="label" htmlFor="partnerDetails">
                      Partner/Director Details
                    </label>
                    <textarea
                      className="form-control"
                      name="partnerDetails"
                      id="partnerDetails"
                      placeholder="Enter details of all partners/directors"
                      required
                      rows={3}
                      value={formData.partnerDetails}
                      onChange={handleInputChange}
                    ></textarea>
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
                  I consent to the processing of my personal information for this business loan application.
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
    <section className="calculator section overflow-y-hidden" id="business-loan">
      <div className="container">
        <div className="row gy-5 gy-xl-0 justify-content-between align-items-center">
          <div className="col-12 col-lg-6 col-xxl-6 mx-auto mx-lg-0">
            <div className="calculator-input">
              {/* Form card */}
              <div className="card card--custom loan-form">
                <FadeLeft>
                  <h3 className="text-start">Business Loan Application</h3>
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
                      id="frmBusinessLoan"
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
              
              {/* Result card - Commented out as in the original */}
              {/* <div className="card card--custom loan-result">
                <div className="card--custom__loan text-center">
                  <i className="bi bi-check-circle-fill text-success" style={{ fontSize: "4rem" }}></i>
                  <h4 className="mt-4">Your Business Loan Application Has Been Submitted</h4>
                  <p className="mt-3">
                    Thank you for choosing our services. Our team will review your application
                    and get back to you within 24-48 hours.
                  </p>
                  <p className="mt-3">
                    Your application reference number: <strong>BL-{Math.floor(Math.random() * 1000000)}</strong>
                  </p>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="bg-transparent"
                      onClick={handleBack}
                    >
                      <PrimaryButton text="Apply for Another Loan" />
                    </button>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
      
          <div className="col-12 col-lg-6">
            <div className="section__content ms-lg-4 ms-xxl-0">
              <FadeDown>
                <span className="section__content-sub-title headingFour ">
                  <Image src={title} alt="vector" /> Business Loan
                </span>
              </FadeDown>
              <FadeTop>
                <h2 className="section__content-title">
                  Fuel Your Business Growth
                </h2>
              </FadeTop>
              <FadeDown>
                <p className="section__content-text">
                  Our business loans are designed to help your enterprise thrive with
                  competitive interest rates, flexible repayment options, and minimal
                  documentation requirements. Take the first step towards expanding your business today.
                </p>

                <ul className="section__content-list">
                  <li className="headingFive">Competitive Interest Rates</li>
                  <li className="headingFive">Loans up to ₹50 Lakhs</li>
                  <li className="headingFive">Flexible Repayment Terms</li>
                  <li className="headingFive">Quick Approval Process</li>
                  <li className="headingFive">Minimal Documentation</li>
                </ul>

                <Link href="/business_loan_education" className="mt_40">
                  <PrimaryButton
                    text="Learn About Business Loans"
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

export default BusinessLoanApplication;