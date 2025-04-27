"use client";
import React, { SyntheticEvent, useState } from "react";
import title from "@/../public/images/title_vector.png";
import Image from "next/image";
import Link from "next/link";
import FadeLeft from "@/components/motionEffect/FadeLeft";
import FadeDown from "@/components/motionEffect/FadeDown";
import FadeTop from "@/components/motionEffect/FadeTop";
import PrimaryButton from "@/components/UI/PrimaryButton";

const LoanAgainstPropertyTopUp = () => {
  const steps = [
    "Existing Loan Details",
    "Top-Up Requirements",
    "Property Valuation",
    "Financial Information",
    "Personal Details"
  ];

  const [formData, setFormData] = useState({
    // Step 1: Existing Loan Details
    existingLoanProvider: "",
    existingLoanAmount: "",
    existingLoanTenure: "",
    emiAmount: "",
    outstandingAmount: "",
    
    // Step 2: Top-Up Requirements
    topUpAmount: 1000000,
    topUpPurpose: "",
    
    // Step 3: Property Valuation
    propertyType: "",
    propertyLocation: "",
    currentMarketValue: "",
    
    // Step 4: Financial Information
    incomeType: "",
    monthlyIncome: "",
    existingLiabilities: "",
    
    // Step 5: Personal Details
    fullName: "",
    email: "",
    phone: "",
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
      setFormData(prev => ({...prev, error: "Please provide consent to proceed"}));
      return;
    }
    
    try {
      setFormData(prev => ({...prev, loading: true, error: ""}));
      
      const response = await fetch('/api/loan-against-property-topup', {
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
            <h4 className="mb-4">Your Existing Loan Details</h4>
            
            <div className="input-single">
              <label className="label" htmlFor="existingLoanProvider">
                Current Lender Name
              </label>
              <input
                type="text"
                className="form-control"
                name="existingLoanProvider"
                id="existingLoanProvider"
                placeholder="Enter lender/bank name"
                required
                value={formData.existingLoanProvider}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="row mt-3">
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="existingLoanAmount">
                    Original Loan Amount
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="existingLoanAmount"
                    id="existingLoanAmount"
                    placeholder="Enter loan amount"
                    min="0"
                    required
                    value={formData.existingLoanAmount}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="existingLoanTenure">
                    Loan Tenure (Years)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="existingLoanTenure"
                    id="existingLoanTenure"
                    placeholder="Enter tenure"
                    min="0"
                    required
                    value={formData.existingLoanTenure}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            
            <div className="row mt-3">
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="emiAmount">
                    Current EMI Amount
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="emiAmount"
                    id="emiAmount"
                    placeholder="Enter EMI amount"
                    min="0"
                    required
                    value={formData.emiAmount}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="outstandingAmount">
                    Outstanding Loan Amount
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="outstandingAmount"
                    id="outstandingAmount"
                    placeholder="Enter outstanding amount"
                    min="0"
                    required
                    value={formData.outstandingAmount}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="calculate__form-part">
            <h4 className="mb-4">Top-Up Requirements</h4>
            
            <div className="input-single">
              <label className="label" htmlFor="topUpAmount">
                Desired Top-Up Amount: {formatCurrency(formData.topUpAmount)}
              </label>
              <input
                type="range"
                className="form-range"
                name="topUpAmount"
                id="topUpAmount"
                min="500000"
                max="10000000"
                step="100000"
                value={formData.topUpAmount}
                onChange={handleInputChange}
              />
              <div className="d-flex justify-content-between">
                <small>₹5 Lakhs</small>
                <small>₹1 Crore</small>
              </div>
            </div>
            
            <div className="input-single mt-4">
              <label className="label" htmlFor="topUpPurpose">
                Purpose of Top-Up
              </label>
              <select
                className="form-select"
                name="topUpPurpose"
                id="topUpPurpose"
                required
                value={formData.topUpPurpose}
                onChange={handleInputChange}
              >
                <option value="">Select Purpose</option>
                <option value="Home Renovation">Home Renovation</option>
                <option value="Business Expansion">Business Expansion</option>
                <option value="Debt Consolidation">Debt Consolidation</option>
                <option value="Education">Education</option>
                <option value="Medical Emergency">Medical Emergency</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="calculate__form-part">
            <h4 className="mb-4">Property Valuation</h4>
            
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
              <label className="label" htmlFor="currentMarketValue">
                Current Market Value of Property
              </label>
              <input
                type="number"
                className="form-control"
                name="currentMarketValue"
                id="currentMarketValue"
                placeholder="Enter current market value"
                min="0"
                required
                value={formData.currentMarketValue}
                onChange={handleInputChange}
              />
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="calculate__form-part">
            <h4 className="mb-4">Financial Information</h4>
            
            <div className="input-single">
              <label className="label" htmlFor="incomeType">
                Income Type
              </label>
              <select
                className="form-select"
                name="incomeType"
                id="incomeType"
                required
                value={formData.incomeType}
                onChange={handleInputChange}
              >
                <option value="">Select Income Type</option>
                <option value="Salaried">Salaried</option>
                <option value="Self-Employed">Self-Employed</option>
                <option value="Business">Business</option>
                <option value="Professional">Professional</option>
              </select>
            </div>
            
            <div className="input-single mt-3">
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
            
            <div className="input-single mt-3">
              <label className="label" htmlFor="existingLiabilities">
                Existing Liabilities (Monthly Outgoings)
              </label>
              <input
                type="number"
                className="form-control"
                name="existingLiabilities"
                id="existingLiabilities"
                placeholder="Enter total monthly liabilities"
                min="0"
                required
                value={formData.existingLiabilities}
                onChange={handleInputChange}
              />
            </div>
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
            
            <div className="input-single mt-3">
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
                  I authorize the verification of my details and confirm all information provided is accurate.
                  I agree to the terms and conditions.
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
          style={{ width: `${progress}%` }} // Fixed: Use template literal correctly
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
      </div>
    );
  };
  
  return (
    <section className="calculator section overflow-y-hidden" id="loan-against-property-topup">
      <div className="container">
        <div className="row gy-5 gy-xl-0 justify-content-between align-items-center">
          <div className="col-12 col-lg-6 col-xxl-6 mx-auto mx-lg-0">
            <div className="calculator-input">
              <div className="card card--custom">
                <FadeLeft>
                  <h3 className="text-start">Loan Against Property Top-Up</h3>
                </FadeLeft>
                
                {renderProgressBar()}
                
                <div className="d-flex justify-content-between mb-4">
                  <span className="text-primary">Step {formData.currentStep} of {steps.length}</span>
                  <span className="fw-bold">{steps[formData.currentStep - 1]}</span>
                </div>
                
                {formData.error && (
                  <div className="alert alert-danger" role="alert">
                    {formData.error}
                  </div>
                )}
                
                {formData.success ? (
                  <div className="text-center py-4">
                    <div className="alert alert-success" role="alert">
                      <h4>Thank You!</h4>
                      <p>Your application has been submitted successfully.</p>
                      <p>Our representative will contact you shortly.</p>
                    </div>
                    <Link href="/" className="btn btn-primary">
                      Back to Home
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {renderStep()}
                    
                    <div className="d-flex justify-content-between mt-4">
                      {formData.currentStep > 1 && (
                        <button 
                          type="button" 
                          className="btn btn-outline-primary"
                          onClick={handleBack}
                        >
                          Back
                        </button>
                      )}
                      
                      {formData.currentStep < steps.length ? (
                        <button 
                          type="button" 
                          className="btn btn-primary ms-auto"
                          onClick={handleNext}
                        >
                          Next
                        </button>
                      ) : (
                        <button 
                          type="submit" 
                          className="btn btn-primary ms-auto"
                          disabled={formData.loading}
                        >
                          {formData.loading ? 'Submitting...' : 'Submit Application'}
                        </button>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
          
          <div className="col-12 col-lg-6 col-xxl-6">
            <FadeDown>
              <div className="calculator-title">
                <h2 className="title mb-3">
                  Get Additional Funds with <span>Property Top-Up Loan</span>
                </h2>
                <p className="mb-4">
                  Leverage your property's increased value to access additional funds at competitive rates.
                  Whether you need funds for business expansion, education, or any personal need, our top-up
                  loans provide the financial flexibility you require.
                </p>
                
                <div className="mb-4">
                  <h5 className="mb-3">Key Benefits:</h5>
                  <ul className="list-unstyled">
                    <li className="d-flex align-items-start mb-2">
                      <i className="fas fa-check-circle text-primary mt-1 me-2"></i>
                      <span>Lower interest rates compared to personal loans</span>
                    </li>
                    <li className="d-flex align-items-start mb-2">
                      <i className="fas fa-check-circle text-primary mt-1 me-2"></i>
                      <span>Longer repayment tenure up to 15 years</span>
                    </li>
                    <li className="d-flex align-items-start mb-2">
                      <i className="fas fa-check-circle text-primary mt-1 me-2"></i>
                      <span>Minimal documentation and quick processing</span>
                    </li>
                    <li className="d-flex align-items-start mb-2">
                      <i className="fas fa-check-circle text-primary mt-1 me-2"></i>
                      <span>No end-use restrictions on funds</span>
                    </li>
                  </ul>
                </div>
                
                <div className="mb-4">
                  <h5 className="mb-3">Eligibility Criteria:</h5>
                  <ul className="list-unstyled">
                    <li className="d-flex align-items-start mb-2">
                      <i className="fas fa-check-circle text-primary mt-1 me-2"></i>
                      <span>Indian resident aged 21-65 years</span>
                    </li>
                    <li className="d-flex align-items-start mb-2">
                      <i className="fas fa-check-circle text-primary mt-1 me-2"></i>
                      <span>Existing loan must be in good standing</span>
                    </li>
                    <li className="d-flex align-items-start mb-2">
                      <i className="fas fa-check-circle text-primary mt-1 me-2"></i>
                      <span>Property must have sufficient equity</span>
                    </li>
                  </ul>
                </div>
                
                <PrimaryButton text="Know More" url="/contact" />
              </div>
            </FadeDown>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoanAgainstPropertyTopUp;