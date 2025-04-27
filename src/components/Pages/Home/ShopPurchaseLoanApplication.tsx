"use client";
import React, { SyntheticEvent, useState } from "react";
import title from "@/../public/images/title_vector.png";
import Image from "next/image";
import Link from "next/link";
import FadeLeft from "@/components/motionEffect/FadeLeft";
import FadeDown from "@/components/motionEffect/FadeDown";
import FadeTop from "@/components/motionEffect/FadeTop";
import PrimaryButton from "@/components/UI/PrimaryButton";

const ShopPurchaseLoanApplication = () => {
  // Define the steps for the loan application
  const steps = [
    "Loan Amount",
    "Shop Details",
    "Employment Type",
    "Business Details",
    "Financial Information",
    "Personal Information"
  ];

  // Form state
  const [formData, setFormData] = useState({
    // Step 1: Loan Amount
    loanAmount: 2000000,
    loanTenure: 60,
    
    // Step 2: Shop Details
    propertyType: "",
    shopArea: "",
    shopLocation: "",
    city: "",
    state: "",
    propertyAge: "",
    propertyValue: "",
    
    // Step 3: Employment Type
    employmentType: "",
    
    // Step 4: Business Details
    // For Self-Employed/Business
    businessName: "",
    businessType: "",
    businessNature: "",
    businessVintage: "",
    gstRegistered: "",
    
    // For Salaried Applicants
    companyName: "",
    designation: "",
    workExperience: "",
    
    // Step 5: Financial Information
    annualIncome: "",
    monthlyIncome: "",
    existingEmi: "",
    itrFiled: "",
    bankAccountNumber: "",
    bankName: "",
    
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
      const response = await fetch('/api/shop-purchase-loan', {
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
            <h4 className="mb-4">Select your desired shop purchase loan amount</h4>
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
                max="50000000"
                step="100000"
                value={formData.loanAmount}
                onChange={handleInputChange}
              />
              <div className="d-flex justify-content-between">
                <small>₹5 Lakhs</small>
                <small>₹5 Crores</small>
              </div>
            </div>
            
            <div className="input-single mt-4">
              <label className="label" htmlFor="loanTenure">
                Loan Tenure (in months): {formData.loanTenure}
              </label>
              <input
                type="range"
                className="form-range"
                name="loanTenure"
                id="loanTenure"
                min="12"
                max="180"
                step="12"
                value={formData.loanTenure}
                onChange={handleInputChange}
              />
              <div className="d-flex justify-content-between">
                <small>1 Year</small>
                <small>15 Years</small>
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="calculate__form-part">
            <h4 className="mb-4">Shop Property Details</h4>
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
                <option value="Commercial Shop">Commercial Shop</option>
                <option value="Retail Shop">Retail Shop</option>
                <option value="Office Space">Office Space</option>
                <option value="Restaurant/Cafe Space">Restaurant/Cafe Space</option>
                <option value="Showroom">Showroom</option>
                <option value="Commercial Complex">Commercial Complex</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="input-single">
              <label className="label" htmlFor="shopArea">
                Shop Area (sq. ft.)
              </label>
              <input
                type="number"
                className="form-control"
                name="shopArea"
                id="shopArea"
                placeholder="Enter shop area in sq. ft."
                min="0"
                required
                value={formData.shopArea}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="input-single">
              <label className="label" htmlFor="shopLocation">
                Shop Address
              </label>
              <textarea
                className="form-control"
                name="shopLocation"
                id="shopLocation"
                placeholder="Enter complete shop address"
                required
                rows={2}
                value={formData.shopLocation}
                onChange={handleInputChange}
              ></textarea>
            </div>
            
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
                  </select>
                </div>
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="propertyAge">
                    Property Age (in years)
                  </label>
                  <select
                    className="form-select"
                    name="propertyAge"
                    id="propertyAge"
                    required
                    value={formData.propertyAge}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Property Age</option>
                    <option value="New Construction">New Construction</option>
                    <option value="0-2 years">0-2 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="6-10 years">6-10 years</option>
                    <option value="11-15 years">11-15 years</option>
                    <option value="15+ years">15+ years</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="propertyValue">
                    Property Value (₹)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="propertyValue"
                    id="propertyValue"
                    placeholder="Enter property value"
                    min="0"
                    required
                    value={formData.propertyValue}
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
            <h4 className="mb-4">Employment Type</h4>
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
                      Self-Employed/Business Owner
                    </label>
                  </div>
                </div>
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
                      Salaried Employee
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="calculate__form-part">
            <h4 className="mb-4">Business/Employment Details</h4>
            
            {formData.employmentType === "Self-Employed" ? (
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
                    <label className="label" htmlFor="businessNature">
                      Nature of Business
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="businessNature"
                      id="businessNature"
                      placeholder="E.g., Retail, Services, Manufacturing, etc."
                      required
                      value={formData.businessNature}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-single">
                    <label className="label" htmlFor="businessVintage">
                      Business Vintage (Years)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="businessVintage"
                      id="businessVintage"
                      placeholder="Enter years in business"
                      min="0"
                      required
                      value={formData.businessVintage}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-single">
                    <label className="label" htmlFor="gstRegistered">
                      GST Registration Status
                    </label>
                    <select
                      className="form-select"
                      name="gstRegistered"
                      id="gstRegistered"
                      required
                      value={formData.gstRegistered}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Status</option>
                      <option value="Registered">Registered</option>
                      <option value="Not Registered">Not Registered</option>
                      <option value="In Process">In Process</option>
                    </select>
                  </div>
                </div>
              </div>
            ) : formData.employmentType === "Salaried" ? (
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
              </div>
            ) : (
              <div className="alert alert-info">
                Please select an employment type in the previous step
              </div>
            )}
          </div>
        );
      
      case 5:
        return (
          <div className="calculate__form-part">
            <h4 className="mb-4">Financial Information</h4>
            
            {formData.employmentType === "Self-Employed" ? (
              <div className="row gy-3">
                <div className="col-md-6">
                  <div className="input-single">
                    <label className="label" htmlFor="annualIncome">
                      Annual Business Income (₹)
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
              <div className="row gy-3">
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
            )}
            
            <div className="row gy-3 mt-2">
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="existingEmi">
                    Existing EMI (₹)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="existingEmi"
                    id="existingEmi"
                    placeholder="Enter existing EMI (if any)"
                    min="0"
                    value={formData.existingEmi}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="itrFiled">
                    ITR Filed for Last 2 Years
                  </label>
                  <select
                    className="form-select"
                    name="itrFiled"
                    id="itrFiled"
                    required
                    value={formData.itrFiled}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Partial">Partial (1 year only)</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="row gy-3 mt-2">
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="bankAccountNumber">
                    Bank Account Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="bankAccountNumber"
                    id="bankAccountNumber"
                    placeholder="Enter bank account number"
                    required
                    value={formData.bankAccountNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="bankName">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="bankName"
                    id="bankName"
                    placeholder="Enter bank name"
                    required
                    value={formData.bankName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
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
                  I consent to the processing of my personal information for this shop purchase loan application.
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
          style={{ width: `${progress}%` }} // Corrected syntax
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
      </div>
    );
  };
  
  return (
    <section className="calculator section overflow-y-hidden" id="shop-loan">
      <div className="container">
        <div className="row gy-5 gy-xl-0 justify-content-between align-items-center">
          <div className="col-12 col-lg-6 col-xxl-6 mx-auto mx-lg-0">
            <div className="calculator-input">
              {/* Form card */}
              <div className="card card--custom loan-form">
                <FadeLeft>
                  <h3 className="text-start">Shop Purchase Loan Application</h3>
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
                      id="frmShopLoan"
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
              
              {/* Result card - Hidden initially */}
              {/* <div className="card card--custom loan-result" style={{ display: "none" }}>
                <div className="card--custom__loan text-center">
                  <i className="bi bi-check-circle-fill text-success" style={{ fontSize: "4rem" }}></i>
                  <h4 className="mt-4">Your Shop Purchase Loan Application Has Been Submitted</h4>
                  <p className="mt-3">
                    Thank you for choosing our services. Our team will review your application
                    and get back to you within 24-48 hours.
                  </p>
                  <p className="mt-3">
                    Your application reference number: <strong>SP-{Math.floor(Math.random() * 1000000)}</strong>
                  </p>
                  <div className="mt-4">
                    <Link href="/business_loans">
                      <PrimaryButton text="Explore Other Business Loans" />
                    </Link>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          
    {/* Right side part */}
  <div className="col-12 col-lg-6 col-xxl-6">
    <div className="calculator-thumb">
      <FadeTop>
        <div className="section-header">
          <h2 className="title title--section">Shop Purchase Loan</h2>
          <p className="desc desc--section">
            Fulfill your business expansion plans with our Shop Purchase Loan. Buy the perfect commercial space for your business with flexible financing options.
          </p>
        </div>
      </FadeTop>
      
      <FadeDown>
        <div className="loan-features mt-5">
          <h4>Benefits of Our Shop Purchase Loan</h4>
          <ul className="loan-features-list mt-4">
            <li>
              <i className="bi bi-check-circle-fill text-primary me-2"></i>
              Loan amounts from ₹5 Lakhs to ₹5 Crores
            </li>
            <li>
              <i className="bi bi-check-circle-fill text-primary me-2"></i>
              Flexible repayment tenure up to 15 years
            </li>
            <li>
              <i className="bi bi-check-circle-fill text-primary me-2"></i>
              Competitive interest rates starting from 9.5% p.a.
            </li>
            <li>
              <i className="bi bi-check-circle-fill text-primary me-2"></i>
              Quick approval process with minimal documentation
            </li>
            <li>
              <i className="bi bi-check-circle-fill text-primary me-2"></i>
              No prepayment penalties after 12 months
            </li>
            <li>
              <i className="bi bi-check-circle-fill text-primary me-2"></i>
              Tax benefits available under Section 80C
            </li>
          </ul>
        </div>
      </FadeDown>
      
      <div className="documents-required mt-5">
        <h4>Documents Required</h4>
        <div className="row mt-4 gy-3">
          <div className="col-md-6">
            <div className="document-item p-3 bg-light rounded">
              <h5>Identity Proof</h5>
              <p>PAN Card, Aadhaar Card, Passport, or Voter ID</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="document-item p-3 bg-light rounded">
              <h5>Address Proof</h5>
              <p>Utility Bills, Rental Agreement, or Property Documents</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="document-item p-3 bg-light rounded">
              <h5>Business Proof</h5>
              <p>Business Registration, GST Certificate, or Shop Act License</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="document-item p-3 bg-light rounded">
              <h5>Financial Documents</h5>
              <p>Bank Statements, ITR for last 2 years, Balance Sheet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
      </div>
    </section>
  );
};

export default ShopPurchaseLoanApplication;