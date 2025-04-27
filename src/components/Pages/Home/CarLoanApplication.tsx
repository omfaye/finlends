"use client";
import React, { SyntheticEvent, useState } from "react";
import title from "@/../public/images/title_vector.png";
import Image from "next/image";
import Link from "next/link";
import FadeLeft from "@/components/motionEffect/FadeLeft";
import FadeDown from "@/components/motionEffect/FadeDown";
import FadeTop from "@/components/motionEffect/FadeTop";
import PrimaryButton from "@/components/UI/PrimaryButton";

const CarLoanApplication = () => {
  // Define the steps for the loan application
  const steps = [
    "Loan Amount",
    "Vehicle Details",
    "Employment Type",
    "Employment Details",
    "Personal Information",
    "Bank Details"
  ];

  // Form state
  const [formData, setFormData] = useState({
    // Step 1: Loan Amount
    loanAmount: 600000,
    loanTenure: 60,
    
    // Step 2: Vehicle Details
    vehicleType: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    vehiclePrice: "",
    dealerName: "",
    dealerLocation: "",
    
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
      const response = await fetch('/api/car-loan-application', {
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
            <h4 className="mb-4">Select your desired car loan amount</h4>
            <div className="input-single">
              <label className="label" htmlFor="loanAmount">
                Loan Amount: {formatCurrency(formData.loanAmount)}
              </label>
              <input
                type="range"
                className="form-range"
                name="loanAmount"
                id="loanAmount"
                min="200000"
                max="5000000"
                step="100000"
                value={formData.loanAmount}
                onChange={handleInputChange}
              />
              <div className="d-flex justify-content-between">
                <small>₹2 Lakhs</small>
                <small>₹50 Lakhs</small>
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
                max="84"
                step="12"
                value={formData.loanTenure}
                onChange={handleInputChange}
              />
              <div className="d-flex justify-content-between">
                <small>12 months</small>
                <small>84 months</small>
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="calculate__form-part">
            <h4 className="mb-4">Vehicle Details</h4>
            <div className="input-single">
              <label className="label" htmlFor="vehicleType">
                Vehicle Type
              </label>
              <select
                className="form-select"
                name="vehicleType"
                id="vehicleType"
                required
                value={formData.vehicleType}
                onChange={handleInputChange}
              >
                <option value="">Select Vehicle Type</option>
                <option value="New Car">New Car</option>
                <option value="Used Car">Used Car</option>
                <option value="Commercial Vehicle">Commercial Vehicle</option>
              </select>
            </div>
            
            <div className="row">
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="vehicleMake">
                    Vehicle Make
                  </label>
                  <select
                    className="form-select"
                    name="vehicleMake"
                    id="vehicleMake"
                    required
                    value={formData.vehicleMake}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Make</option>
                    <option value="Maruti Suzuki">Maruti Suzuki</option>
                    <option value="Hyundai">Hyundai</option>
                    <option value="Tata Motors">Tata Motors</option>
                    <option value="Mahindra">Mahindra</option>
                    <option value="Honda">Honda</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Kia">Kia</option>
                    <option value="Volkswagen">Volkswagen</option>
                    <option value="Mercedes-Benz">Mercedes-Benz</option>
                    <option value="BMW">BMW</option>
                    <option value="Audi">Audi</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="vehicleModel">
                    Vehicle Model
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="vehicleModel"
                    id="vehicleModel"
                    placeholder="Enter vehicle model"
                    required
                    value={formData.vehicleModel}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="vehicleYear">
                    Manufacturing Year
                  </label>
                  <select
                    className="form-select"
                    name="vehicleYear"
                    id="vehicleYear"
                    required
                    value={formData.vehicleYear}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Year</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="vehiclePrice">
                    Vehicle Price (₹)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="vehiclePrice"
                    id="vehiclePrice"
                    placeholder="Enter vehicle price"
                    required
                    value={formData.vehiclePrice}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="dealerName">
                    Dealer Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="dealerName"
                    id="dealerName"
                    placeholder="Enter dealer name"
                    value={formData.dealerName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="dealerLocation">
                    Dealer Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="dealerLocation"
                    id="dealerLocation"
                    placeholder="Enter dealer location"
                    value={formData.dealerLocation}
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
                  I consent to the processing of my personal information for this car loan application.
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
    <section className="calculator section overflow-y-hidden" id="car-loan">
      <div className="container">
        <div className="row gy-5 gy-xl-0 justify-content-between align-items-center">
          <div className="col-12 col-lg-6 col-xxl-6 mx-auto mx-lg-0">
            <div className="calculator-input">
              {/* Form card */}
              <div className="card card--custom loan-form">
                <FadeLeft>
                  <h3 className="text-start">Car Loan Application</h3>
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
                      id="frmCarLoan"
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
              
              {/* Result card */}
              {/* <div className="card card--custom loan-result">
                <div className="card--custom__loan text-center">
                  <i className="bi bi-check-circle-fill text-success" style={{ fontSize: "4rem" }}></i>
                  <h4 className="mt-4">Your Car Loan Application Has Been Submitted</h4>
                  <p className="mt-3">
                    Thank you for choosing our services. Our team will review your application and get back to you within 48 hours.
                  </p>
                  <p>
                    A confirmation email has been sent to your registered email address with your application details.
                  </p>
                  <div className="mt-4">
                    <Link href="/dashboard">
                      <PrimaryButton text="Go to Dashboard" />
                    </Link>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          
          <div className="col-12 col-lg-6 col-xxl-5 mx-auto mx-lg-0">
            <FadeDown>
              <div className="calculate-result">
                <h4 className="mb-4">Your Loan Summary</h4>
                <div className="card card--custom">
                  <div className="card--custom__form">
                    <div className="calculate-result__single">
                      <div className="calculate-result__content">
                        <span>Loan Amount</span>
                        <h6>{formatCurrency(formData.loanAmount)}</h6>
                      </div>
                    </div>
                    <div className="calculate-result__single">
                      <div className="calculate-result__content">
                        <span>Loan Tenure</span>
                        <h6>{formData.loanTenure} months</h6>
                      </div>
                    </div>
                    <div className="calculate-result__single">
                      <div className="calculate-result__content">
                        <span>Interest Rate</span>
                        <h6>9.50% p.a.</h6>
                      </div>
                    </div>
                    <div className="calculate-result__single">
                      <div className="calculate-result__content">
                        <span>Monthly EMI</span>
                        <h6>{formatCurrency((formData.loanAmount * 0.0095 * Math.pow(1 + 0.0095, formData.loanTenure)) / (Math.pow(1 + 0.0095, formData.loanTenure) - 1))}</h6>
                      </div>
                    </div>
                    <div className="calculate-result__single">
                      <div className="calculate-result__content">
                        <span>Total Interest Payable</span>
                        <h6>{formatCurrency(((formData.loanAmount * 0.0095 * Math.pow(1 + 0.0095, formData.loanTenure)) / (Math.pow(1 + 0.0095, formData.loanTenure) - 1)) * formData.loanTenure - formData.loanAmount)}</h6>
                      </div>
                    </div>
                    <div className="calculate-result__single">
                      <div className="calculate-result__content">
                        <span>Total Amount Payable</span>
                        <h6>{formatCurrency(((formData.loanAmount * 0.0095 * Math.pow(1 + 0.0095, formData.loanTenure)) / (Math.pow(1 + 0.0095, formData.loanTenure) - 1)) * formData.loanTenure)}</h6>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h5>Need Help?</h5>
                  <p className="mb-3">Our loan specialists are available to assist you with any questions about your application.</p>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-telephone-fill me-2 text-primary"></i>
                    <span>Call us at: <a href="tel:+918001234567">+91 800 123 4567</a></span>
                  </div>
                  <div className="d-flex align-items-center mt-2">
                    <i className="bi bi-envelope-fill me-2 text-primary"></i>
                    <span>Email us at: <a href="mailto:loans@example.com">loans@example.com</a></span>
                  </div>
                </div>
              </div>
            </FadeDown>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarLoanApplication;