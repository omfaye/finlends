"use client";
import React, { SyntheticEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import titleVector from "@/../public/images/title_vector.png";

const SchoolFundingLoanApplication = () => {
  // Define the steps for the School Funding Loan application
  const steps = [
    "Loan Details",
    "Business Details",
    "Financial Information",
    "Land/Property Details",
    "Personal Information",
  ];

  // Form state
  const [formData, setFormData] = useState({
    // Step 1: Loan Details
    loanAmount: 5000000,
    loanTenure: 120,
    loanPurpose: "",

    // Step 2: Business Details
    businessName: "",
    businessType: "",
    businessRegistrationNo: "",
    businessAddress: "",
    businessCity: "",
    businessState: "",
    businessPinCode: "",
    yearsInBusiness: "",
    schoolAffiliation: "",

    // Step 3: Financial Information
    annualTurnover: "",
    profitLastYear: "",
    existingLoans: "",
    gstRegistered: "",
    gstNumber: "",

    // Step 4: Land/Property Details
    landOwnership: "",
    landArea: "",
    landAddress: "",
    landValue: "",
    propertyType: "",

    // Step 5: Personal Information
    fullName: "",
    email: "",
    phone: "",
    panNumber: "",
    address: "",
    pinCode: "",

    // Form control
    currentStep: 1,
    consent: false,
    loading: false,
    error: "",
    success: false,
  });

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (
    e: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    e.preventDefault();

    // Validate form
    if (!formData.consent) {
      setFormData((prev) => ({
        ...prev,
        error: "You must provide consent to proceed with your loan application",
      }));
      return;
    }

    try {
      setFormData((prev) => ({ ...prev, loading: true, error: "" }));

      // Simulate API call (replace with actual endpoint)
      const response = await fetch("/api/school-funding-loan-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit request");
      }

      setFormData((prev) => ({
        ...prev,
        loading: false,
        success: true,
      }));

      handleApplicationSubmit();
    } catch (error) {
      setFormData((prev) => ({
        ...prev,
        loading: false,
        error: "An error occurred while submitting your request. Please try again.",
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
      setFormData((prev) => ({ ...prev, currentStep: prev.currentStep - 1 }));
    }
  };

  const handleNext = () => {
    if (formData.currentStep < steps.length) {
      setFormData((prev) => ({ ...prev, currentStep: prev.currentStep + 1 }));
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate EMI
  const calculateEMI = () => {
    const principal = formData.loanAmount;
    const interestRate = 9.75 / 100 / 12; // 9.75% p.a. as per Paisabazaar business loan rates
    const tenure = formData.loanTenure;

    const emi =
      (principal * interestRate * Math.pow(1 + interestRate, tenure)) /
      (Math.pow(1 + interestRate, tenure) - 1);

    return Math.round(emi);
  };

  // Calculate total interest payable
  const calculateTotalInterest = () => {
    const emi = calculateEMI();
    const totalAmount = emi * formData.loanTenure;
    const totalInterest = totalAmount - formData.loanAmount;

    return totalInterest;
  };

  const renderStep = () => {
    switch (formData.currentStep) {
      case 1:
        return (
          <div className="calculate__form-part">
            <h4 className="mb-4">Select the loan details</h4>
            <div className="input-single">
              <label className="label" htmlFor="loanAmount">
                Loan Amount: {formatCurrency(formData.loanAmount)}
              </label>
              <input
                type="range"
                className="form-range"
                name="loanAmount"
                id="loanAmount"
                min="1000000"
                max="50000000"
                step="100000"
                value={formData.loanAmount}
                onChange={handleInputChange}
              />
              <div className="d-flex justify-content-between">
                <small>₹10 Lakh</small>
                <small>₹5 Crore</small>
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
                max="240"
                step="12"
                value={formData.loanTenure}
                onChange={handleInputChange}
              />
              <div className="d-flex justify-content-between">
                <small>1 year</small>
                <small>20 years</small>
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
                <option value="New School Establishment">New School Establishment</option>
                <option value="School Expansion">School Expansion</option>
                <option value="Infrastructure Development">Infrastructure Development</option>
                <option value="Working Capital">Working Capital</option>
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
                Business/School Name
              </label>
              <input
                type="text"
                className="form-control"
                name="businessName"
                id="businessName"
                placeholder="Enter your business/school name"
                required
                value={formData.businessName}
                onChange={handleInputChange}
              />
            </div>

            <div className="row mt-3">
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
                    <option value="Trust">Trust</option>
                    <option value="Society">Society</option>
                    <option value="Section 8 Company">Section 8 Company</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Private Limited Company">Private Limited Company</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="businessRegistrationNo">
                    Business Registration Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="businessRegistrationNo"
                    id="businessRegistrationNo"
                    placeholder="Enter registration number"
                    required
                    value={formData.businessRegistrationNo}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
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
              <div className="col-md-4">
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
              <div className="col-md-4">
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
                  </select>
                </div>
              </div>
              <div className="col-md-4">
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
            </div>

            <div className="row mt-3">
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
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="schoolAffiliation">
                    School Affiliation
                  </label>
                  <select
                    className="form-select"
                    name="schoolAffiliation"
                    id="schoolAffiliation"
                    required
                    value={formData.schoolAffiliation}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Affiliation</option>
                    <option value="CBSE">CBSE</option>
                    <option value="CISCE">CISCE</option>
                    <option value="State Board">State Board</option>
                    <option value="IB">International Baccalaureate (IB)</option>
                    <option value="Not Affiliated">Not Affiliated</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="calculate__form-part">
            <h4 className="mb-4">Financial Information</h4>
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
                  <label className="label" htmlFor="profitLastYear">
                    Profit Last Year (₹)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="profitLastYear"
                    id="profitLastYear"
                    placeholder="Enter profit amount"
                    min="0"
                    required
                    value={formData.profitLastYear}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="input-single mt-3">
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
                <option value="None">None</option>
                <option value="Business Loan">Business Loan</option>
                <option value="Loan Against Property">Loan Against Property</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="row mt-3">
              <div className="col-md-6">
                <div className="input-single">
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
              </div>
              {formData.gstRegistered === "Yes" && (
                <div className="col-md-6">
                  <div className="input-single">
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
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="calculate__form-part">
            <h4 className="mb-4">Land/Property Details</h4>
            <div className="input-single">
              <label className="label" htmlFor="landOwnership">
                Land Ownership
              </label>
              <select
                className="form-select"
                name="landOwnership"
                id="landOwnership"
                required
                value={formData.landOwnership}
                onChange={handleInputChange}
              >
                <option value="">Select Ownership</option>
                <option value="Owned">Owned</option>
                <option value="Leased">Leased</option>
                <option value="To Be Purchased">To Be Purchased</option>
              </select>
            </div>

            <div className="row mt-3">
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="landArea">
                    Land Area (sq. meters)
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
                  <label className="label" htmlFor="landValue">
                    Estimated Land Value (₹)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="landValue"
                    id="landValue"
                    placeholder="Enter land value"
                    min="0"
                    required
                    value={formData.landValue}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="input-single mt-3">
              <label className="label" htmlFor="landAddress">
                Land/Property Address
              </label>
              <textarea
                className="form-control"
                name="landAddress"
                id="landAddress"
                placeholder="Enter land/property address"
                required
                rows={3}
                value={formData.landAddress}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="input-single mt-3">
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
                <option value="Educational">Educational</option>
              </select>
            </div>
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

            <div className="input-single">
              <label className="label" htmlFor="address">
                Address
              </label>
              <textarea
                className="form-control"
                name="address"
                id="address"
                placeholder="Enter your address"
                required
                rows={3}
                value={formData.address}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="input-single mt-3">
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

            <div className="input-single mt-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="consent"
                  id="consent"
                  checked={formData.consent}
                  onChange={handleInputChange}
                />
                <label className="form-check-label" htmlFor="consent">
                  I hereby consent to the lender collecting, using, and storing my
                  personal and business information for the purpose of processing this
                  loan application and for future communications related to my account.
                  I confirm that all information provided is accurate and complete.
                </label>
              </div>
            </div>

            {formData.error && (
              <div className="alert alert-danger mt-3" role="alert">
                {formData.error}
              </div>
            )}
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
    <section className="calculator section overflow-y-hidden" id="school-funding-loan">
      <div className="container">
        <div className="row gy-5 gy-xl-0 justify-content-between align-items-center">
          <div className="col-12 col-lg-6 col-xxl-6 mx-auto mx-lg-0">
            <div className="calculator-input">
              {/* Form card */}
              <div className="card card--custom loan-form">
                <h3 className="text-start">School Funding Loan Application</h3>
                {renderProgressBar()}
                <div className="d-flex justify-content-between mb-4">
                  <span className="text-primary">
                    Step {formData.currentStep} of {steps.length}
                  </span>
                  <span className="fw-bold">{steps[formData.currentStep - 1]}</span>
                </div>

                <div className="card--custom__loan">
                  <div className="card--custom__form">
                    <form
                      method="POST"
                      id="frmSchoolFundingLoan"
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
                              className="btn btn-outline-primary"
                              onClick={handleBack}
                              disabled={formData.currentStep === 1}
                              aria-label="Previous step"
                            >
                              Previous
                            </button>
                            {formData.currentStep < steps.length ? (
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleNext}
                                aria-label="Next step"
                              >
                                Next
                              </button>
                            ) : (
                              <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={formData.loading}
                                aria-label="Submit application"
                              >
                                {formData.loading ? "Processing..." : "Submit Application"}
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
              {/* <div className="card card--custom loan-result calc_hide">
                <div className="card--custom__loan text-center">
                  <i
                    className="bi bi-check-circle-fill text-success"
                    style={{ fontSize: "4rem" }}
                  ></i>
                  <h4 className="mt-4">
                    Your School Funding Loan Application Has Been Submitted
                  </h4>
                  <p className="mt-3">
                    Thank you for choosing our services. Our team will review your
                    application and get back to you within 24-48 hours.
                  </p>
                  <p className="mt-3">
                    Your application reference number:{" "}
                    <strong>SFL-{Math.floor(Math.random() * 1000000)}</strong>
                  </p>

                  <div className="loan-summary mt-4">
                    <h4>Loan Summary</h4>
                    <div className="summary-item">
                      <span>Loan Amount:</span>
                      <strong>{formatCurrency(formData.loanAmount)}</strong>
                    </div>
                    <div className="summary-item">
                      <span>Loan Tenure:</span>
                      <strong>{formData.loanTenure} months</strong>
                    </div>
                    <div className="summary-item">
                      <span>Interest Rate:</span>
                      <strong>9.75% p.a.</strong>
                    </div>
                    <div className="summary-item">
                      <span>Estimated EMI:</span>
                      <strong>{formatCurrency(calculateEMI())}</strong>
                    </div>
                    <div className="summary-item">
                      <span>Total Interest Payable:</span>
                      <strong>{formatCurrency(calculateTotalInterest())}</strong>
                    </div>
                  </div>

                  <div className="mt-5">
                    <Link href="/" passHref>
                      <button
                        type="button"
                        className="btn btn-primary"
                        aria-label="Back to home"
                      >
                        Back to Home
                      </button>
                    </Link>
                  </div>
                </div>
              </div> */}
            </div>
          </div>

          {/* Right side part */}
          <div className="col-12 col-lg-6">
            <div className="section__content ms-lg-4 ms-xxl-0">
              <span className="section__content-sub-title headingFour">
                <Image src={titleVector} alt="vector" /> School Funding Loan
              </span>
              <h2 className="section__content-title">
                Empower Your Educational Vision
              </h2>
              <p className="section__content-text">
                Our School Funding Loan is designed to help you establish or expand
                your educational institution with flexible financing, competitive
                interest rates, and a streamlined application process. Build the
                future of education today.
              </p>

              <ul className="section__content-list">
                <li className="headingFive">Competitive Interest Rates</li>
                <li className="headingFive">Loan Amounts up to ₹5 Crore</li>
                <li className="headingFive">Flexible Tenure up to 20 Years</li>
                <li className="headingFive">Minimal Documentation</li>
                <li className="headingFive">Quick Approval Process</li>
              </ul>

              <Link href="/school-funding-loan" className="mt_40">
                <button className="btn btn-primary">
                  Learn About School Funding Loan{" "}
                  <i className="bi bi-arrow-up-right"></i>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SchoolFundingLoanApplication;