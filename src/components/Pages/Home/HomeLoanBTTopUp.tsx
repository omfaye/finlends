"use client";
import React, { SyntheticEvent, useState } from "react";
import title from "@/../public/images/title_vector.png";
import Image from "next/image";
import Link from "next/link";
import FadeLeft from "@/components/motionEffect/FadeLeft";
import FadeDown from "@/components/motionEffect/FadeDown";
import FadeTop from "@/components/motionEffect/FadeTop";
import PrimaryButton from "@/components/UI/PrimaryButton";

interface FormData {
  // Step 1: Existing Loan Details
  currentLender: string;
  outstandingAmount: number;
  currentROI: number;
  emiAmount: number;
  remainingTenure: number;
  
  // Step 2: Top-Up Requirements
  topUpAmount: number;
  topUpPurpose: string;
  
  // Step 3: Property Details
  propertyAddress: string;
  propertyAge: string;
  propertyValue: string;
  city: string;
  state: string;
  pinCode: string;
  
  // Step 4: Employment Details
  employmentType: string;
  // For Salaried
  companyName: string;
  designation: string;
  workExperience: string;
  monthlyIncome: string;
  
  // For Self-Employed
  businessName: string;
  businessType: string;
  businessExperience: string;
  annualIncome: string;
  
  // Step 5: Personal Information
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  panNumber: string;
  address: string;
  
  // Step 6: Document Upload
  existingLoanStatement: File | null;
  propertyDocuments: File | null;
  incomeProof: File | null;
  identityProof: File | null;
  
  // Form control
  currentStep: number;
  consent: boolean;
  loading: boolean;
  error: string;
  success: boolean;
}

const HomeLoanBTTopUp = () => {
  const steps = [
    "Existing Loan Details",
    "Top-Up Requirements",
    "Property Details",
    "Employment Details",
    "Personal Information",
    "Document Upload"
  ];

  const [formData, setFormData] = useState<FormData>({
    // Step 1: Existing Loan Details
    currentLender: "",
    outstandingAmount: 1000000,
    currentROI: 8.5,
    emiAmount: 10000,
    remainingTenure: 120,
    
    // Step 2: Top-Up Requirements
    topUpAmount: 500000,
    topUpPurpose: "",
    
    // Step 3: Property Details
    propertyAddress: "",
    propertyAge: "",
    propertyValue: "",
    city: "",
    state: "",
    pinCode: "",
    
    // Step 4: Employment Details
    employmentType: "",
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
    
    // Step 6: Document Upload
    existingLoanStatement: null,
    propertyDocuments: null,
    incomeProof: null,
    identityProof: null,
    
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    
    if (files && files.length > 0) {
      setFormData(prevState => ({
        ...prevState,
        [name]: files[0]
      }));
    }
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    
    if (!formData.consent) {
      setFormData(prev => ({...prev, error: "You must provide consent to proceed with your loan application"}));
      return;
    }
    
    try {
      setFormData(prev => ({...prev, loading: true, error: ""}));
      
      const submitData = new FormData();
      
      Object.entries(formData).forEach(([key, value]) => {
        if (value instanceof File) {
          submitData.append(key, value);
        } else if (typeof value !== 'boolean' && value !== null) {
          submitData.append(key, String(value));
        }
      });
      
      const response = await fetch('/api/home-loan-bt-topup', {
        method: 'POST',
        body: submitData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit request');
      }
      
      setFormData(prev => ({
        ...prev, 
        loading: false, 
        success: true
      }));
      
    } catch (error) {
      setFormData(prev => ({
        ...prev, 
        loading: false, 
        error: "An error occurred while submitting your request. Please try again."
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

  const calculateEstimatedSavings = () => {
    const currentROI = parseFloat(String(formData.currentROI));
    const newROI = 7.5; // Assumed new ROI
    const outstandingAmount = parseFloat(String(formData.outstandingAmount));
    const remainingTenure = parseInt(String(formData.remainingTenure));
    
    const currentMonthlyRate = currentROI / (12 * 100);
    const newMonthlyRate = newROI / (12 * 100);
    
    const currentEMI = (outstandingAmount * currentMonthlyRate * Math.pow(1 + currentMonthlyRate, remainingTenure)) / 
                      (Math.pow(1 + currentMonthlyRate, remainingTenure) - 1);
                      
    const newEMI = (outstandingAmount * newMonthlyRate * Math.pow(1 + newMonthlyRate, remainingTenure)) / 
                  (Math.pow(1 + newMonthlyRate, remainingTenure) - 1);
    
    const monthlySavings = currentEMI - newEMI;
    const totalSavings = monthlySavings * remainingTenure;
    
    return {
      monthlySavings: monthlySavings.toFixed(0),
      totalSavings: totalSavings.toFixed(0),
      newEMI: newEMI.toFixed(0),
      newROI: newROI
    };
  };

  const renderStep = () => {
    switch(formData.currentStep) {
      case 1:
        return (
          <div className="calculate__form-part">
            <h4 className="mb-4">Tell us about your existing home loan</h4>
            <div className="input-single">
              <label className="label" htmlFor="currentLender">
                Current Lender/Bank
              </label>
              <input
                type="text"
                className="form-control"
                name="currentLender"
                id="currentLender"
                placeholder="Enter your current bank name"
                required
                value={formData.currentLender}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="input-single">
              <label className="label" htmlFor="outstandingAmount">
                Outstanding Loan Amount: {formatCurrency(Number(formData.outstandingAmount))}
              </label>
              <input
                type="range"
                className="form-range"
                name="outstandingAmount"
                id="outstandingAmount"
                min="100000"
                max="10000000"
                step="100000"
                value={formData.outstandingAmount}
                onChange={handleInputChange}
              />
              <div className="d-flex justify-content-between">
                <small>₹1 Lakh</small>
                <small>₹1 Crore</small>
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="currentROI">
                    Current Interest Rate (% p.a.)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="currentROI"
                    id="currentROI"
                    placeholder="Enter current interest rate"
                    step="0.1"
                    min="5"
                    max="20"
                    required
                    value={formData.currentROI}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="emiAmount">
                    Current EMI Amount (₹)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="emiAmount"
                    id="emiAmount"
                    placeholder="Enter your current EMI"
                    min="1000"
                    required
                    value={formData.emiAmount}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            
            <div className="input-single">
              <label className="label" htmlFor="remainingTenure">
                Remaining Tenure (months)
              </label>
              <input
                type="number"
                className="form-control"
                name="remainingTenure"
                id="remainingTenure"
                placeholder="Enter remaining loan tenure in months"
                min="12"
                max="360"
                required
                value={formData.remainingTenure}
                onChange={handleInputChange}
              />
            </div>
            
            {formData.currentLender && formData.outstandingAmount && formData.currentROI && formData.remainingTenure && (
              <div className="mt-4 p-3 bg-light rounded">
                <h5 className="text-primary mb-3">Estimated Savings with Balance Transfer</h5>
                <div className="row">
                  <div className="col-6">
                    <p className="mb-1">New Interest Rate:</p>
                    <h6>{calculateEstimatedSavings().newROI}% p.a.</h6>
                  </div>
                  <div className="col-6">
                    <p className="mb-1">New EMI Amount:</p>
                    <h6>₹{calculateEstimatedSavings().newEMI}</h6>
                  </div>
                  <div className="col-6 mt-3">
                    <p className="mb-1">Monthly Savings:</p>
                    <h6 className="text-success">₹{calculateEstimatedSavings().monthlySavings}</h6>
                  </div>
                  <div className="col-6 mt-3">
                    <p className="mb-1">Total Savings:</p>
                    <h6 className="text-success">₹{calculateEstimatedSavings().totalSavings}</h6>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      
      case 2:
        return (
          <div className="calculate__form-part">
            <h4 className="mb-4">How much additional funds do you need?</h4>
            <div className="input-single">
              <label className="label" htmlFor="topUpAmount">
                Top-Up Loan Amount: {formatCurrency(Number(formData.topUpAmount))}
              </label>
              <input
                type="range"
                className="form-range"
                name="topUpAmount"
                id="topUpAmount"
                min="100000"
                max="5000000"
                step="100000"
                value={formData.topUpAmount}
                onChange={handleInputChange}
              />
              <div className="d-flex justify-content-between">
                <small>₹1 Lakh</small>
                <small>₹50 Lakhs</small>
              </div>
            </div>
            
            <div className="input-single">
              <label className="label" htmlFor="topUpPurpose">
                Purpose of Top-Up Loan
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
                <option value="Education">Education</option>
                <option value="Medical Expenses">Medical Expenses</option>
                <option value="Debt Consolidation">Debt Consolidation</option>
                <option value="Marriage">Marriage</option>
                <option value="Business Expansion">Business Expansion</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            {formData.topUpAmount && formData.outstandingAmount && (
              <div className="mt-4 p-3 bg-light rounded">
                <h5 className="text-primary mb-3">Your Loan Summary</h5>
                <div className="row">
                  <div className="col-6">
                    <p className="mb-1">Balance Transfer Amount:</p>
                    <h6>{formatCurrency(Number(formData.outstandingAmount))}</h6>
                  </div>
                  <div className="col-6">
                    <p className="mb-1">Top-Up Amount:</p>
                    <h6>{formatCurrency(Number(formData.topUpAmount))}</h6>
                  </div>
                  <div className="col-12 mt-3">
                    <p className="mb-1">Total Loan Amount:</p>
                    <h6 className="text-primary">{formatCurrency(Number(formData.outstandingAmount) + Number(formData.topUpAmount))}</h6>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      
      case 3:
        return (
          <div className="calculate__form-part">
            <h4 className="mb-4">Tell us about your property</h4>
            <div className="input-single">
              <label className="label" htmlFor="propertyAddress">
                Property Address
              </label>
              <textarea
                className="form-control"
                name="propertyAddress"
                id="propertyAddress"
                placeholder="Enter complete property address"
                required
                rows={3}
                value={formData.propertyAddress}
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
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="propertyAge">
                    Property Age (Years)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="propertyAge"
                    id="propertyAge"
                    placeholder="Enter property age"
                    min="0"
                    max="100"
                    required
                    value={formData.propertyAge}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            
            <div className="input-single">
              <label className="label" htmlFor="propertyValue">
                Current Market Value of Property (₹)
              </label>
              <input
                type="number"
                className="form-control"
                name="propertyValue"
                id="propertyValue"
                placeholder="Enter current market value"
                min="500000"
                required
                value={formData.propertyValue}
                onChange={handleInputChange}
              />
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
                Please select an employment type
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
          </div>
        );
      
      case 6:
        return (
          <div className="calculate__form-part">
            <h4 className="mb-4">Document Upload</h4>
            <p className="text-muted mb-4">Please upload clear, readable scanned copies or photos of the following documents:</p>
            
            <div className="mb-4">
              <label className="label d-block mb-2" htmlFor="existingLoanStatement">
                Existing Loan Statement <span className="text-danger">*</span>
              </label>
              <input
                type="file"
                className="form-control"
                name="existingLoanStatement"
                id="existingLoanStatement"
                accept=".pdf,.jpg,.jpeg,.png"
                required
                onChange={handleFileChange}
              />
              <small className="text-muted">Last 6 months statement from current lender</small>
            </div>
            
            <div className="mb-4">
              <label className="label d-block mb-2" htmlFor="propertyDocuments">
                Property Documents <span className="text-danger">*</span>
              </label>
              <input
                type="file"
                className="form-control"
                name="propertyDocuments"
                id="propertyDocuments"
                accept=".pdf,.jpg,.jpeg,.png"
                required
                onChange={handleFileChange}
              />
              <small className="text-muted">Sale deed, registration document, etc.</small>
            </div>
            
            <div className="mb-4">
              <label className="label d-block mb-2" htmlFor="incomeProof">
                Income Proof <span className="text-danger">*</span>
              </label>
              <input
                type="file"
                className="form-control"
                name="incomeProof"
                id="incomeProof"
                accept=".pdf,.jpg,.jpeg,.png"
                required
                onChange={handleFileChange}
              />
              <small className="text-muted">Salary slips, ITR, bank statements, etc.</small>
            </div>
            
            <div className="mb-4">
              <label className="label d-block mb-2" htmlFor="identityProof">
                Identity Proof <span className="text-danger">*</span>
              </label>
              <input
                type="file"
                className="form-control"
                name="identityProof"
                id="identityProof"
                accept=".pdf,.jpg,.jpeg,.png"
                required
                onChange={handleFileChange}
              />
              <small className="text-muted">Aadhaar, PAN, passport, etc.</small>
            </div>
            
            <div className="input-single mt-4">
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="consent"
                  id="consent"
                  checked={formData.consent}
                  onChange={handleInputChange}
                  required
                />
                <label className="form-check-label" htmlFor="consent">
                  I consent to the processing of my information and authorize the company to verify my details. I have read and agree to the <Link href="/terms-conditions">Terms & Conditions</Link> and <Link href="/privacy-policy">Privacy Policy</Link>.
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
                Thank you for applying for a Home Loan Balance Transfer with Top-Up. 
                Our team will review your application and contact you shortly.
              </p>
              <div className="application-summary p-4 bg-light rounded text-start">
                <h5 className="mb-3">Application Summary</h5>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <p className="mb-1"><strong>Balance Transfer Amount:</strong></p>
                    <p>{formatCurrency(Number(formData.outstandingAmount))}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <p className="mb-1"><strong>Top-Up Amount:</strong></p>
                    <p>{formatCurrency(Number(formData.topUpAmount))}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <p className="mb-1"><strong>Total Loan Amount:</strong></p>
                    <p>{formatCurrency(Number(formData.outstandingAmount) + Number(formData.topUpAmount))}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <p className="mb-1"><strong>Application ID:</strong></p>
                    <p>BT{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}</p>
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
    <section className="calculator section overflow-y-hidden" id="home-loan-bt-topup">
      <div className="container">
        <div className="row gy-5 gy-xl-0 justify-content-between align-items-center">
          {/* Form card moved to left */}
          <div className="col-12 col-lg-6 col-xxl-6 mx-auto mx-lg-0 order-1 order-lg-1">
            <div className="calculator-input">
              <div className="card card--custom">
                <FadeLeft>
                  <h3 className="text-start">Home Loan Balance Transfer with Top-Up</h3>
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
          
          {/* Content moved to right */}
          <div className="col-12 col-lg-6 order-2 order-lg-2">
            <div className="section__content me-lg-4 me-xxl-0">
              <FadeDown>
                <span className="section__content-sub-title headingFour">
                  <Image src={title} alt="vector" /> Home Loan
                </span>
              </FadeDown>
              <FadeTop>
                <h2 className="section__content-title">
                  Lower Your EMI with Balance Transfer
                </h2>
              </FadeTop>
              <FadeDown>
                <p className="section__content-text">
                  Transfer your existing home loan to us for better interest rates and get additional 
                  funds for your needs. Our Home Loan Balance Transfer with Top-Up offers significant 
                  savings with competitive rates and flexible repayment options.
                </p>

                <ul className="section__content-list">
                  <li className="headingFive">Reduce your interest rate by up to 2%</li>
                  <li className="headingFive">Get additional funds up to 90% of property value</li>
                  <li className="headingFive">Interest rates starting from 7.50% p.a.</li>
                  <li className="headingFive">No prepayment charges</li>
                  <li className="headingFive">Quick processing within 72 hours</li>
                </ul>

                <Link href="/home-loan-balance-transfer" className="mt_40">
                  <PrimaryButton
                    text="Learn More"
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

export default HomeLoanBTTopUp;