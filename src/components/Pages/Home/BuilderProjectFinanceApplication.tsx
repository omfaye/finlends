"use client";
import React, { SyntheticEvent, useState } from "react";
import title from "@/../public/images/title_vector.png";
import Image from "next/image";
import Link from "next/link";
import FadeLeft from "@/components/motionEffect/FadeLeft";
import FadeDown from "@/components/motionEffect/FadeDown";
import FadeTop from "@/components/motionEffect/FadeTop";
import PrimaryButton from "@/components/UI/PrimaryButton";

const BuilderProjectFinanceApplication = () => {
  // Define the steps for the loan application
  const steps = [
    "Project Details",
    "Loan Requirements",
    "Project Location",
    "Developer Information",
    "Financial Details",
    "Personal Information"
  ];

  // Form state
  const [formData, setFormData] = useState({
    // Step 1: Project Details
    projectName: "",
    projectType: "",
    projectPhase: "",
    totalUnits: "",
    completedUnits: "",
    soldUnits: "",
    
    // Step 2: Loan Requirements
    loanAmount: 10000000,
    loanTenure: 60,
    purposeOfFunding: "",
    
    // Step 3: Project Location
    projectAddress: "",
    city: "",
    state: "",
    pinCode: "",
    landArea: "",
    constructionArea: "",
    
    // Step 4: Developer Information
    developerName: "",
    developerType: "",
    establishmentYear: "",
    totalCompletedProjects: "",
    ongoingProjects: "",
    
    // Step 5: Financial Details
    annualTurnover: "",
    projectCost: "",
    fundsInvested: "",
    netWorth: "",
    existingLoans: "",
    
    // Step 6: Personal Information
    fullName: "",
    designation: "",
    email: "",
    phone: "",
    alternatePhone: "",
    address: "",
    
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
      const response = await fetch('/api/builder-project-finance', {
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
            <h4 className="mb-4">Project Details</h4>
            <div className="input-single">
              <label className="label" htmlFor="projectName">
                Project Name
              </label>
              <input
                type="text"
                className="form-control"
                name="projectName"
                id="projectName"
                placeholder="Enter project name"
                required
                value={formData.projectName}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="input-single">
              <label className="label" htmlFor="projectType">
                Project Type
              </label>
              <select
                className="form-select"
                name="projectType"
                id="projectType"
                required
                value={formData.projectType}
                onChange={handleInputChange}
              >
                <option value="">Select Project Type</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Mixed Use">Mixed Use</option>
                <option value="Township">Township</option>
                <option value="Villa Project">Villa Project</option>
              </select>
            </div>
            
            <div className="input-single">
              <label className="label" htmlFor="projectPhase">
                Current Project Phase
              </label>
              <select
                className="form-select"
                name="projectPhase"
                id="projectPhase"
                required
                value={formData.projectPhase}
                onChange={handleInputChange}
              >
                <option value="">Select Current Phase</option>
                <option value="Planning">Planning</option>
                <option value="Land Acquisition">Land Acquisition</option>
                <option value="Approvals">Approvals</option>
                <option value="Initial Construction">Initial Construction</option>
                <option value="Mid Construction">Mid Construction</option>
                <option value="Finishing Stage">Finishing Stage</option>
              </select>
            </div>
            
            <div className="row">
              <div className="col-md-4">
                <div className="input-single">
                  <label className="label" htmlFor="totalUnits">
                    Total Units
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="totalUnits"
                    id="totalUnits"
                    placeholder="Total units"
                    min="0"
                    required
                    value={formData.totalUnits}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="input-single">
                  <label className="label" htmlFor="completedUnits">
                    Completed Units
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="completedUnits"
                    id="completedUnits"
                    placeholder="Completed units"
                    min="0"
                    required
                    value={formData.completedUnits}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="input-single">
                  <label className="label" htmlFor="soldUnits">
                    Sold Units
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="soldUnits"
                    id="soldUnits"
                    placeholder="Sold units"
                    min="0"
                    required
                    value={formData.soldUnits}
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
            <h4 className="mb-4">Loan Requirements</h4>
            <div className="input-single">
              <label className="label" htmlFor="loanAmount">
                Loan Amount Required: {formatCurrency(formData.loanAmount)}
              </label>
              <input
                type="range"
                className="form-range"
                name="loanAmount"
                id="loanAmount"
                min="5000000"
                max="500000000"
                step="1000000"
                value={formData.loanAmount}
                onChange={handleInputChange}
              />
              <div className="d-flex justify-content-between">
                <small>₹50 Lakhs</small>
                <small>₹50 Crores</small>
              </div>
            </div>
            
            <div className="input-single">
              <label className="label" htmlFor="loanTenure">
                Loan Tenure (in months): {formData.loanTenure}
              </label>
              <input
                type="range"
                className="form-range"
                name="loanTenure"
                id="loanTenure"
                min="12"
                max="120"
                step="6"
                value={formData.loanTenure}
                onChange={handleInputChange}
              />
              <div className="d-flex justify-content-between">
                <small>12 months</small>
                <small>120 months</small>
              </div>
            </div>
            
            <div className="input-single">
              <label className="label" htmlFor="purposeOfFunding">
                Purpose of Funding
              </label>
              <select
                className="form-select"
                name="purposeOfFunding"
                id="purposeOfFunding"
                required
                value={formData.purposeOfFunding}
                onChange={handleInputChange}
              >
                <option value="">Select Purpose</option>
                <option value="Land Acquisition">Land Acquisition</option>
                <option value="Construction">Construction</option>
                <option value="Working Capital">Working Capital</option>
                <option value="Refinance Existing Debt">Refinance Existing Debt</option>
                <option value="Infrastructure Development">Infrastructure Development</option>
                <option value="Multiple Purposes">Multiple Purposes</option>
              </select>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="calculate__form-part">
            <h4 className="mb-4">Project Location</h4>
            <div className="input-single">
              <label className="label" htmlFor="projectAddress">
                Project Address
              </label>
              <textarea
                className="form-control"
                name="projectAddress"
                id="projectAddress"
                placeholder="Enter complete project address"
                required
                rows={3}
                value={formData.projectAddress}
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
            
            <div className="row">
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="landArea">
                    Land Area (sq. ft.)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="landArea"
                    id="landArea"
                    placeholder="Enter land area"
                    min="0"
                    required
                    value={formData.landArea}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="constructionArea">
                    Construction Area (sq. ft.)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="constructionArea"
                    id="constructionArea"
                    placeholder="Enter construction area"
                    min="0"
                    required
                    value={formData.constructionArea}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="calculate__form-part">
            <h4 className="mb-4">Developer Information</h4>
            <div className="input-single">
              <label className="label" htmlFor="developerName">
                Developer/Company Name
              </label>
              <input
                type="text"
                className="form-control"
                name="developerName"
                id="developerName"
                placeholder="Enter developer/company name"
                required
                value={formData.developerName}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="input-single">
              <label className="label" htmlFor="developerType">
                Developer Type
              </label>
              <select
                className="form-select"
                name="developerType"
                id="developerType"
                required
                value={formData.developerType}
                onChange={handleInputChange}
              >
                <option value="">Select Developer Type</option>
                <option value="Sole Proprietorship">Sole Proprietorship</option>
                <option value="Partnership">Partnership</option>
                <option value="Private Limited">Private Limited</option>
                <option value="Public Limited">Public Limited</option>
                <option value="LLP">LLP</option>
              </select>
            </div>
            
            <div className="input-single">
              <label className="label" htmlFor="establishmentYear">
                Year of Establishment
              </label>
              <input
                type="number"
                className="form-control"
                name="establishmentYear"
                id="establishmentYear"
                placeholder="Enter establishment year"
                min="1900"
                max="2025"
                required
                value={formData.establishmentYear}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="row">
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="totalCompletedProjects">
                    Total Completed Projects
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="totalCompletedProjects"
                    id="totalCompletedProjects"
                    placeholder="Enter number of completed projects"
                    min="0"
                    required
                    value={formData.totalCompletedProjects}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="ongoingProjects">
                    Ongoing Projects
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="ongoingProjects"
                    id="ongoingProjects"
                    placeholder="Enter number of ongoing projects"
                    min="0"
                    required
                    value={formData.ongoingProjects}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="calculate__form-part">
            <h4 className="mb-4">Financial Details</h4>
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
            
            <div className="input-single">
              <label className="label" htmlFor="projectCost">
                Total Project Cost (₹)
              </label>
              <input
                type="number"
                className="form-control"
                name="projectCost"
                id="projectCost"
                placeholder="Enter total project cost"
                min="0"
                required
                value={formData.projectCost}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="input-single">
              <label className="label" htmlFor="fundsInvested">
                Funds Already Invested (₹)
              </label>
              <input
                type="number"
                className="form-control"
                name="fundsInvested"
                id="fundsInvested"
                placeholder="Enter funds already invested"
                min="0"
                required
                value={formData.fundsInvested}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="input-single">
              <label className="label" htmlFor="netWorth">
                Company Net Worth (₹)
              </label>
              <input
                type="number"
                className="form-control"
                name="netWorth"
                id="netWorth"
                placeholder="Enter company net worth"
                min="0"
                required
                value={formData.netWorth}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="input-single">
              <label className="label" htmlFor="existingLoans">
                Existing Loans/Liabilities (₹)
              </label>
              <input
                type="number"
                className="form-control"
                name="existingLoans"
                id="existingLoans"
                placeholder="Enter existing loans/liabilities"
                min="0"
                required
                value={formData.existingLoans}
                onChange={handleInputChange}
              />
            </div>
          </div>
        );
      
      case 6:
        return (
          <div className="calculate__form-part">
            <h4 className="mb-4">Contact Person Details</h4>
            <div className="input-single">
              <label className="label" htmlFor="fullName">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                name="fullName"
                id="fullName"
                placeholder="Enter full name"
                required
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </div>
            
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
                    placeholder="Enter email address"
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
                    placeholder="Enter phone number"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            
            <div className="input-single">
              <label className="label" htmlFor="alternatePhone">
                Alternate Phone Number
              </label>
              <input
                type="tel"
                className="form-control"
                name="alternatePhone"
                id="alternatePhone"
                placeholder="Enter alternate phone number"
                value={formData.alternatePhone}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="input-single">
              <label className="label" htmlFor="address">
                Contact Address
              </label>
              <textarea
                className="form-control"
                name="address"
                id="address"
                placeholder="Enter contact address"
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
                  I consent to the processing of my personal and business information for this project finance application.
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
    <section className="calculator section overflow-y-hidden" id="builder-finance">
      <div className="container">
        <div className="row gy-5 gy-xl-0 justify-content-between align-items-center">
          <div className="col-12 col-lg-6 col-xxl-6 mx-auto mx-lg-0">
            <div className="calculator-input">
              {/* Form card */}
              <div className="card card--custom loan-form">
                <FadeLeft>
                  <h3 className="text-start">Builder Project Finance Application</h3>
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
                      id="frmBuilderFinance"
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
                  <h4 className="mt-4">Your Project Finance Application Has Been Submitted</h4>
                  <p className="mt-3">
                    Thank you for choosing our services. Our team will review your application
                    and get back to you within 48-72 hours.
                  </p>
                  <p className="mt-3">
                    Your application reference number: <strong>PF-{Math.floor(Math.random() * 1000000)}</strong>
                  </p>
                  <div className="mt-4">
                    <Link href="/finance_options">
                      <PrimaryButton text="Explore Other Finance Options" />
                    </Link>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          
          {/* Right side part */}
          <div className="col-12 col-lg-6">
            <div className="section__content ms-lg-4 ms-xxl-0">
              <FadeDown>
                <span className="section__content-sub-title headingFour ">
                  <Image src={title} alt="vector" /> Builder Finance
                </span>
              </FadeDown>
              <FadeTop>
                <h2 className="section__content-title">
                  Financial Solutions for Real Estate Development
                </h2>
              </FadeTop>
              <FadeDown>
                <p className="section__content-text">
                  Our tailored project finance solutions are designed to meet the unique funding requirements
                  of real estate developers. Whether you're developing residential apartments, commercial complexes,
                  townships, or mixed-use projects, we provide end-to-end financing options to fulfill your project needs.
                </p>

                <ul className="section__content-list">
                  <li className="headingFive">Customized Loan Structures</li>
                  <li className="headingFive">Competitive Interest Rates</li>
                  <li className="headingFive">Flexible Repayment Options</li>
                  <li className="headingFive">Construction Linked Payment Plans</li>
                  <li className="headingFive">Expert Advisory Services</li>
                </ul>

                <Link href="/builder_finance_guide" className="mt_40">
                  <PrimaryButton
                    text="Learn More About Project Finance"
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

export default BuilderProjectFinanceApplication;