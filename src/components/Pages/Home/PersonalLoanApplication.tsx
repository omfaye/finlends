"use client";
import React, { SyntheticEvent, useState } from "react";
import title from "@/../public/images/title_vector.png";
import Image from "next/image";
import Link from "next/link";
import FadeLeft from "@/components/motionEffect/FadeLeft";
import FadeDown from "@/components/motionEffect/FadeDown";
import FadeTop from "@/components/motionEffect/FadeTop";
import PrimaryButton from "@/components/UI/PrimaryButton";

const PersonalLoanApplication = () => {
  // Define the steps for the loan application
  const steps = [
    "Loan Amount",
    "Loan Purpose",
    "Employment Type",
    "Employment Details",
    "Personal Information",
    "Bank Details"
  ];

  // Form state
  const [formData, setFormData] = useState({
    // Step 1: Loan Amount
    loanAmount: 500000,
    loanTenure: 36,
    
    // Step 2: Loan Purpose
    loanPurpose: "",
    
    // Step 3: Employment Type
    employmentType: "",
    
    // Step 4: Employment Details
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
    
    // Step 5: Personal Information
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    panNumber: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    
    // Step 6: Bank Details
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    accountType: "",
    
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
      const response = await fetch('/api/personal-loan-application', {
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
            <h4 className="mb-4">Select your desired personal loan amount</h4>
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
                max="2000000"
                step="50000"
                value={formData.loanAmount}
                onChange={handleInputChange}
              />
              <div className="d-flex justify-content-between">
                <small>₹1 Lakh</small>
                <small>₹20 Lakhs</small>
              </div>
            </div>
            
            <div className="input-single mt-4">
              <label className="label" htmlFor="loanTenure">
                Loan Tenure (in months): {formData.loanTenure} months
              </label>
              <input
                type="range"
                className="form-range"
                name="loanTenure"
                id="loanTenure"
                min="12"
                max="60"
                step="6"
                value={formData.loanTenure}
                onChange={handleInputChange}
              />
              <div className="d-flex justify-content-between">
                <small>12 months</small>
                <small>60 months</small>
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="calculate__form-part">
            <h4 className="mb-4">What is the purpose of your personal loan?</h4>
            <div className="input-single">
              <label className="label" htmlFor="loanPurpose">
                Loan Purpose
              </label>
              <select
                className="form-select"
                name="loanPurpose"
                id="loanPurpose"
                required
                value={formData.loanPurpose}
                onChange={handleInputChange}
              >
                <option value="">Select Loan Purpose</option>
                <option value="Debt Consolidation">Debt Consolidation</option>
                <option value="Home Renovation">Home Renovation</option>
                <option value="Medical Expenses">Medical Expenses</option>
                <option value="Wedding Expenses">Wedding Expenses</option>
                <option value="Education">Education</option>
                <option value="Travel">Travel</option>
                <option value="Vehicle Purchase">Vehicle Purchase</option>
                <option value="Business Expansion">Business Expansion</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        );
      
      case 3:
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
      
      case 4:
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
      
      case 5:
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
            
            <div className="row">
              <div className="col-md-4">
                <div className="input-single">
                  <label className="label" htmlFor="city">
                    City
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    id="city"
                    placeholder="Enter city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-4">
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
              <div className="col-md-4">
                <div className="input-single">
                  <label className="label" htmlFor="pinCode">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="pinCode"
                    id="pinCode"
                    placeholder="Enter PIN code"
                    required
                    value={formData.pinCode}
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
            <h4 className="mb-4">Bank Account Details</h4>
            <div className="input-single">
              <label className="label" htmlFor="bankName">
                Bank Name
              </label>
              <select
                className="form-select"
                name="bankName"
                id="bankName"
                required
                value={formData.bankName}
                onChange={handleInputChange}
              >
                <option value="">Select Bank</option>
                <option value="State Bank of India">State Bank of India</option>
                <option value="HDFC Bank">HDFC Bank</option>
                <option value="ICICI Bank">ICICI Bank</option>
                <option value="Axis Bank">Axis Bank</option>
                <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                <option value="Yes Bank">Yes Bank</option>
                <option value="Punjab National Bank">Punjab National Bank</option>
                <option value="Bank of Baroda">Bank of Baroda</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="row">
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="accountNumber">
                    Account Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="accountNumber"
                    id="accountNumber"
                    placeholder="Enter account number"
                    required
                    value={formData.accountNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="ifscCode">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="ifscCode"
                    id="ifscCode"
                    placeholder="Enter IFSC code"
                    required
                    value={formData.ifscCode}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            
            <div className="input-single">
              <label className="label" htmlFor="accountType">
                Account Type
              </label>
              <select
                className="form-select"
                name="accountType"
                id="accountType"
                required
                value={formData.accountType}
                onChange={handleInputChange}
              >
                <option value="">Select Account Type</option>
                <option value="Savings">Savings</option>
                <option value="Current">Current</option>
              </select>
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
                  I consent to the processing of my personal information for this personal loan application.
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
    <section className="calculator section overflow-y-hidden" id="personal-loan">
      <div className="container">
        <div className="row gy-5 gy-xl-0 justify-content-between align-items-center">
          <div className="col-12 col-lg-6 col-xxl-6 mx-auto mx-lg-0">
            <div className="calculator-input">
              {/* Form card */}
              <div className="card card--custom loan-form">
                <FadeLeft>
                  <h3 className="text-start">Personal Loan Application</h3>
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
                      id="frmPersonalLoan"
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
          
          {/* Right side part */}
          <div className="col-12 col-lg-6">
            <div className="section__content ms-lg-4 ms-xxl-0">
              <FadeDown>
                <span className="section__content-sub-title headingFour ">
                  <Image src={title} alt="vector" /> Personal Loan
                </span>
              </FadeDown>
              <FadeTop>
                <h2 className="section__content-title">
                  Quick Funds for Your Personal Needs
                </h2>
              </FadeTop>
              <FadeDown>
                <p className="section__content-text">
                  Our personal loans offer flexible financing solutions to meet your immediate financial 
                  needs with minimal documentation, competitive interest rates, and quick approval process. 
                  Whether it's for debt consolidation, medical expenses, education, or any other personal need.
                </p>

                <ul className="section__content-list">
                  <li className="headingFive">Low Interest Rates Starting from 10.5%</li>
                  <li className="headingFive">Loan Amount up to ₹20 Lakhs</li>
                  <li className="headingFive">Flexible Repayment Options (1-5 years)</li>
                  <li className="headingFive">Quick Disbursal within 48 Hours</li>
                  <li className="headingFive">No Collateral Required</li>
                </ul>

                <Link href="/loan_education" className="mt_40">
                  <PrimaryButton
                    text="Learn About Personal Loans"
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

export default PersonalLoanApplication;