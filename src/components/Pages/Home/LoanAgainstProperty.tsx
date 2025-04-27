"use client";
import React, { SyntheticEvent, useState } from "react";
import title from "@/../public/images/title_vector.png";
import Image from "next/image";
import Link from "next/link";
import FadeLeft from "@/components/motionEffect/FadeLeft";
import FadeDown from "@/components/motionEffect/FadeDown";
import FadeTop from "@/components/motionEffect/FadeTop";
import PrimaryButton from "@/components/UI/PrimaryButton";

const LoanAgainstProperty = () => {
  const steps = [
    "Loan Amount",
    "Property Details",
    "Employment Type",
    "Financial Information",
    "Personal Details"
  ];

  const [formData, setFormData] = useState({
    // Step 1: Loan Amount
    loanAmount: 5000000,
    loanPurpose: "",
    
    // Step 2: Property Details
    propertyType: "",
    propertyLocation: "",
    propertyValue: "",
    propertyOwnership: "",
    
    // Step 3: Employment Type
    employmentType: "",
    
    // Step 4: Financial Information
    // For Salaried
    monthlyIncome: "",
    existingLoans: "",
    emiAmount: "",
    
    // For Self-Employed
    businessIncome: "",
    businessStability: "",
    annualTurnover: "",
    
    // Step 5: Personal Details
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    panNumber: "",
    address: "",
    
    // Form control
    currentStep: 1,
    consent: false,
    loading: false,
    error: "",
    success: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    
    if (!formData.consent) {
      setFormData(prev => ({...prev, error: "You must provide consent to proceed"}));
      return;
    }
    
    try {
      setFormData(prev => ({...prev, loading: true, error: ""}));
      
      const response = await fetch('/api/loan-against-property', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) throw new Error('Submission failed');
      
      setFormData(prev => ({
        ...prev, 
        loading: false, 
        success: true
      }));
      
    } catch (error) {
      setFormData(prev => ({
        ...prev, 
        loading: false, 
        error: "An error occurred. Please try again."
      }));
    }
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
            <h4 className="mb-4">Loan Requirements</h4>
            <div className="input-single">
              <label className="label" htmlFor="loanAmount">
                Desired Loan Amount: {formatCurrency(formData.loanAmount)}
              </label>
              <input
                type="range"
                className="form-range"
                name="loanAmount"
                id="loanAmount"
                min="1000000"
                max="50000000"
                step="500000"
                value={formData.loanAmount}
                onChange={handleInputChange}
              />
              <div className="d-flex justify-content-between">
                <small>₹10 Lakhs</small>
                <small>₹5 Crores</small>
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
                <option value="Business Expansion">Business Expansion</option>
                <option value="Debt Consolidation">Debt Consolidation</option>
                <option value="Education">Education</option>
                <option value="Medical Emergency">Medical Emergency</option>
                <option value="Wedding">Wedding</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="calculate__form-part">
            <h4 className="mb-4">Property Details</h4>
            
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
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Industrial">Industrial</option>
                <option value="Plot">Plot</option>
              </select>
            </div>
            
            <div className="input-single mt-3">
              <label className="label" htmlFor="propertyLocation">
                Property Location (City)
              </label>
              <input
                type="text"
                className="form-control"
                name="propertyLocation"
                id="propertyLocation"
                placeholder="Enter city where property is located"
                required
                value={formData.propertyLocation}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="input-single mt-3">
              <label className="label" htmlFor="propertyValue">
                Current Market Value of Property
              </label>
              <input
                type="number"
                className="form-control"
                name="propertyValue"
                id="propertyValue"
                placeholder="Enter estimated property value"
                min="0"
                required
                value={formData.propertyValue}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="input-single mt-3">
              <label className="label" htmlFor="propertyOwnership">
                Ownership Type
              </label>
              <select
                className="form-select"
                name="propertyOwnership"
                id="propertyOwnership"
                required
                value={formData.propertyOwnership}
                onChange={handleInputChange}
              >
                <option value="">Select Ownership Type</option>
                <option value="Single Owner">Single Owner</option>
                <option value="Joint Owners">Joint Owners</option>
                <option value="Co-owned">Co-owned</option>
              </select>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="calculate__form-part">
            <h4 className="mb-4">Employment Details</h4>
            
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
        );
      
      case 4:
        return (
          <div className="calculate__form-part">
            <h4 className="mb-4">Financial Information</h4>
            
            {formData.employmentType === "Salaried" ? (
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
                      placeholder="Enter net monthly income"
                      min="0"
                      required
                      value={formData.monthlyIncome}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-single">
                    <label className="label" htmlFor="existingLoans">
                      Existing Loans
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
                </div>
                {formData.existingLoans === "Yes" && (
                  <div className="col-md-6">
                    <div className="input-single">
                      <label className="label" htmlFor="emiAmount">
                        Total EMI Amount (₹)
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="emiAmount"
                        id="emiAmount"
                        placeholder="Enter total EMI amount"
                        min="0"
                        required
                        value={formData.emiAmount}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : formData.employmentType === "Self-Employed" ? (
              <div className="row gy-3">
                <div className="col-md-6">
                  <div className="input-single">
                    <label className="label" htmlFor="businessIncome">
                      Average Monthly Income (₹)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="businessIncome"
                      id="businessIncome"
                      placeholder="Enter average monthly income"
                      min="0"
                      required
                      value={formData.businessIncome}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-single">
                    <label className="label" htmlFor="businessStability">
                      Business Stability (Years)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="businessStability"
                      id="businessStability"
                      placeholder="Enter years in business"
                      min="0"
                      required
                      value={formData.businessStability}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
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
              </div>
            ) : (
              <div className="alert alert-info">
                Please select employment type in previous step
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
                Full Name
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
            
            <div className="row mt-3">
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
                    placeholder="Enter 10-digit mobile number"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            
            <div className="row mt-3">
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="dob">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="dob"
                    id="dob"
                    required
                    value={formData.dob}
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
                    placeholder="Enter your PAN"
                    required
                    value={formData.panNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            
            <div className="input-single mt-3">
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
                  I authorize the bank/NBFC to verify my information and agree to the terms.
                  I confirm all details provided are accurate.
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

  if (formData.success) {
    return (
      <section className="calculator section overflow-y-hidden">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="success-icon mb-4">
                <i className="fas fa-check-circle fa-5x text-success"></i>
              </div>
              <h3 className="mb-3">Application Submitted Successfully!</h3>
              <p className="mb-4">
                Thank you for applying for a Loan Against Property. 
                Our team will review your application and contact you shortly.
              </p>
              <div className="application-summary p-4 bg-light rounded text-start">
                <h5 className="mb-3">Application Summary</h5>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <p className="mb-1"><strong>Loan Amount:</strong></p>
                    <p>{formatCurrency(Number(formData.loanAmount))}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <p className="mb-1"><strong>Property Type:</strong></p>
                    <p>{formData.propertyType || 'N/A'}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <p className="mb-1"><strong>Application ID:</strong></p>
                    <p>LAP{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Link href="/dashboard" className="btn btn-primary me-3">
                  Go to Dashboard
                </Link>
                <Link href="/" className="btn btn-outline-primary">
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="calculator section overflow-y-hidden" id="loan-against-property">
      <div className="container">
        <div className="row gy-5 gy-xl-0 justify-content-between align-items-center">
          <div className="col-12 col-lg-6 order-2 order-lg-1">
            <div className="section__content me-lg-4 me-xxl-0">
              <FadeDown>
                <span className="section__content-sub-title headingFour">
                  <Image src={title} alt="vector" /> Property Loan
                </span>
              </FadeDown>
              <FadeTop>
                <h2 className="section__content-title">
                  Unlock Your Property's Value
                </h2>
              </FadeTop>
              <FadeDown>
                <p className="section__content-text">
                  Get funds by mortgaging your residential or commercial property while retaining 
                  ownership. Our Loan Against Property offers high-value loans at competitive rates 
                  with flexible repayment options.
                </p>

                <ul className="section__content-list">
                  <li className="headingFive">Up to 60% of property value as loan</li>
                  <li className="headingFive">Interest rates starting from 8.50% p.a.</li>
                  <li className="headingFive">Loan tenure up to 15 years</li>
                  <li className="headingFive">Minimal documentation</li>
                  <li className="headingFive">Quick disbursal within 72 hours</li>
                </ul>

                <Link href="/loan-against-property" className="mt_40">
                  <PrimaryButton
                    text="Learn More"
                    icon={<i className="bi bi-arrow-up-right"></i>}
                  />
                </Link>
              </FadeDown>
            </div>
          </div>
          
          <div className="col-12 col-lg-6 col-xxl-6 mx-auto mx-lg-0 order-1 order-lg-2">
            <div className="calculator-input">
              <div className="card card--custom">
                <FadeLeft>
                  <h3 className="text-start">Loan Against Property</h3>
                </FadeLeft>
                
                {renderProgressBar()}
                
                <div className="d-flex justify-content-between mb-4">
                  <span className="text-primary">Step {formData.currentStep} of {steps.length}</span>
                  <span className="fw-bold">{steps[formData.currentStep - 1]}</span>
                </div>
                
                <div className="card--custom__loan">
                  <div className="card--custom__form">
                    <form className="calculate__form" onSubmit={handleSubmit}>
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
        </div>
      </div>
    </section>
  );
};

export default LoanAgainstProperty;
