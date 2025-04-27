"use client";
import React, { SyntheticEvent, useState } from "react";
import title from "@/../public/images/title_vector.png";
import Image from "next/image";
import Link from "next/link";
import FadeLeft from "@/components/motionEffect/FadeLeft";
import FadeDown from "@/components/motionEffect/FadeDown";
import FadeTop from "@/components/motionEffect/FadeTop";
import PrimaryButton from "@/components/UI/PrimaryButton";

const CashCreditODApplication = () => {
  // Define the steps for the Cash Credit/OD application
  const steps = [
    "Facility Type & Amount",
    "Business Details",
    "Account Details",
    "Financial Information",
    "Security Details",
    "Personal Information",
  ];

  // Form state
  const [formData, setFormData] = useState({
    // Step 1: Facility Type & Amount
    facilityType: "",
    facilityAmount: 1000000,
    facilityTenure: 12, // Added tenure for EMI calculations
    facilityPurpose: "",

    // Step 2: Business Details
    businessName: "",
    businessType: "",
    businessRegistrationNo: "",
    businessAddress: "",
    businessCity: "",
    businessState: "",
    businessPinCode: "",
    yearsInBusiness: "",
    industryType: "",

    // Step 3: Account Details
    bankName: "",
    accountType: "",
    accountNumber: "",
    ifscCode: "",
    bankBranch: "",
    bankingRelationship: "",

    // Step 4: Financial Information
    annualTurnover: "",
    profitLastYear: "",
    workingCapitalCycle: "",
    existingCreditFacilities: "",
    gstRegistered: "",
    gstNumber: "",
    itrLastThreeYears: "",

    // Step 5: Security Details
    securityType: "",
    propertyAddress: "",
    propertyValue: "",
    propertyOwnership: "",
    fixedDepositAmount: "",
    fixedDepositMaturity: "",
    inventoryValue: "",
    debtorsValue: "",

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
        error:
          "You must provide consent to proceed with your Cash Credit/Overdraft application",
      }));
      return;
    }

    try {
      setFormData((prev) => ({ ...prev, loading: true, error: "" }));

      // Replace with your actual API endpoint
      const response = await fetch("/api/cash-credit-od-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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

  // Calculate EMI (assuming renewable facility with annual repayment)
  const calculateEMI = () => {
    const principal = formData.facilityAmount;
    const interestRate = 10.5 / 100 / 12; // 10.5% annual interest rate for CC/OD
    const tenure = formData.facilityTenure;

    const emi =
      (principal * interestRate * Math.pow(1 + interestRate, tenure)) /
      (Math.pow(1 + interestRate, tenure) - 1);

    return Math.round(emi);
  };

  // Calculate total interest payable
  const calculateTotalInterest = () => {
    const emi = calculateEMI();
    const totalAmount = emi * formData.facilityTenure;
    const totalInterest = totalAmount - formData.facilityAmount;

    return totalInterest;
  };

  const renderStep = () => {
    switch (formData.currentStep) {
      case 1:
        return (
          <div className="calculate__form-part">
            <h4 className="mb-4">Select the facility type and amount</h4>
            <div className="input-single">
              <label className="label" htmlFor="facilityType">
                Facility Type
              </label>
              <select
                className="form-select"
                name="facilityType"
                id="facilityType"
                required
                value={formData.facilityType}
                onChange={handleInputChange}
              >
                <option value="">Select Facility Type</option>
                <option value="Cash Credit">Cash Credit</option>
                <option value="Overdraft">Overdraft</option>
                <option value="Cash Credit Against Property">
                  Cash Credit Against Property
                </option>
                <option value="Overdraft Against Fixed Deposit">
                  Overdraft Against Fixed Deposit
                </option>
                <option value="Cash Credit Against Book Debts">
                  Cash Credit Against Book Debts
                </option>
              </select>
            </div>

            <div className="input-single mt-4">
              <label className="label" htmlFor="facilityAmount">
                Facility Amount: {formatCurrency(formData.facilityAmount)}
              </label>
              <input
                type="range"
                className="form-range"
                name="facilityAmount"
                id="facilityAmount"
                min="100000"
                max="10000000"
                step="100000"
                value={formData.facilityAmount}
                onChange={handleInputChange}
              />
              <div className="d-flex justify-content-between">
                <small>₹1 Lakh</small>
                <small>₹1 Crore</small>
              </div>
            </div>

            <div className="input-single mt-4">
              <label className="label" htmlFor="facilityTenure">
                Facility Tenure (in months): {formData.facilityTenure} months
              </label>
              <input
                type="range"
                className="form-range"
                name="facilityTenure"
                id="facilityTenure"
                min="12"
                max="60"
                step="12"
                value={formData.facilityTenure}
                onChange={handleInputChange}
              />
              <div className="d-flex justify-content-between">
                <small>1 year</small>
                <small>5 years</small>
              </div>
            </div>

            <div className="input-single mt-4">
              <label className="label" htmlFor="facilityPurpose">
                Purpose of Facility
              </label>
              <select
                className="form-select"
                name="facilityPurpose"
                id="facilityPurpose"
                required
                value={formData.facilityPurpose}
                onChange={handleInputChange}
              >
                <option value="">Select Purpose</option>
                <option value="Working Capital">Working Capital</option>
                <option value="Business Expansion">Business Expansion</option>
                <option value="Equipment Purchase">Equipment Purchase</option>
                <option value="Inventory Financing">Inventory Financing</option>
                <option value="Day-to-Day Operations">Day-to-Day Operations</option>
                <option value="Seasonal Requirements">Seasonal Requirements</option>
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
                    <option value="Sole Proprietorship">Sole Proprietorship</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Limited Liability Partnership">
                      Limited Liability Partnership
                    </option>
                    <option value="Private Limited Company">
                      Private Limited Company
                    </option>
                    <option value="Public Limited Company">
                      Public Limited Company
                    </option>
                    <option value="One Person Company">One Person Company</option>
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
            </div>
          </div>
        );

      case 3:
        return (
          <div className="calculate__form-part">
            <h4 className="mb-4">Banking Relationship & Account Details</h4>
            <div className="row">
              <div className="col-md-6">
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
              </div>
              <div className="col-md-6">
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
                    <option value="Current Account">Current Account</option>
                    <option value="Savings Account">Savings Account</option>
                    <option value="Cash Credit Account">Cash Credit Account</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row mt-3">
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

            <div className="row mt-3">
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="bankBranch">
                    Bank Branch
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="bankBranch"
                    id="bankBranch"
                    placeholder="Enter bank branch"
                    required
                    value={formData.bankBranch}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="bankingRelationship">
                    Banking Relationship (Years)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="bankingRelationship"
                    id="bankingRelationship"
                    placeholder="Enter years"
                    min="0"
                    required
                    value={formData.bankingRelationship}
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

            <div className="row mt-3">
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="workingCapitalCycle">
                    Working Capital Cycle (Days)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="workingCapitalCycle"
                    id="workingCapitalCycle"
                    placeholder="Enter number of days"
                    min="0"
                    required
                    value={formData.workingCapitalCycle}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="existingCreditFacilities">
                    Existing Credit Facilities
                  </label>
                  <select
                    className="form-select"
                    name="existingCreditFacilities"
                    id="existingCreditFacilities"
                    required
                    value={formData.existingCreditFacilities}
                    onChange={handleInputChange}
                  >
                    <option value="">Select</option>
                    <option value="None">None</option>
                    <option value="Cash Credit">Cash Credit</option>
                    <option value="Overdraft">Overdraft</option>
                    <option value="Term Loan">Term Loan</option>
                    <option value="Multiple Facilities">Multiple Facilities</option>
                  </select>
                </div>
              </div>
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

            <div className="input-single mt-3">
              <label className="label" htmlFor="itrLastThreeYears">
                Have you filed ITR for the last 3 years?
              </label>
              <select
                className="form-select"
                name="itrLastThreeYears"
                id="itrLastThreeYears"
                required
                value={formData.itrLastThreeYears}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Partial">Partially (Not all 3 years)</option>
              </select>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="calculate__form-part">
            <h4 className="mb-4">Security Details</h4>
            <div className="input-single">
              <label className="label" htmlFor="securityType">
                Security Type
              </label>
              <select
                className="form-select"
                name="securityType"
                id="securityType"
                required
                value={formData.securityType}
                onChange={handleInputChange}
              >
                <option value="">Select Security Type</option>
                <option value="Property">Property</option>
                <option value="Fixed Deposit">Fixed Deposit</option>
                <option value="Inventory">Inventory</option>
                <option value="Book Debts">Book Debts</option>
                <option value="Multiple Securities">Multiple Securities</option>
              </select>
            </div>

            {formData.securityType === "Property" && (
              <div className="mt-3">
                <div className="input-single">
                  <label className="label" htmlFor="propertyAddress">
                    Property Address
                  </label>
                  <textarea
                    className="form-control"
                    name="propertyAddress"
                    id="propertyAddress"
                    placeholder="Enter property address"
                    required
                    rows={3}
                    value={formData.propertyAddress}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <div className="row mt-3">
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
                  <div className="col-md-6">
                    <div className="input-single">
                      <label className="label" htmlFor="propertyOwnership">
                        Property Ownership
                      </label>
                      <select
                        className="form-select"
                        name="propertyOwnership"
                        id="propertyOwnership"
                        required
                        value={formData.propertyOwnership}
                        onChange={handleInputChange}
                      >
                        <option value="">Select</option>
                        <option value="Self">Self</option>
                        <option value="Spouse">Spouse</option>
                        <option value="Parents">Parents</option>
                        <option value="Joint">Joint</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {formData.securityType === "Fixed Deposit" && (
              <div className="row mt-3">
                <div className="col-md-6">
                  <div className="input-single">
                    <label className="label" htmlFor="fixedDepositAmount">
                      Fixed Deposit Amount (₹)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="fixedDepositAmount"
                      id="fixedDepositAmount"
                      placeholder="Enter FD amount"
                      min="0"
                      required
                      value={formData.fixedDepositAmount}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-single">
                    <label className="label" htmlFor="fixedDepositMaturity">
                      Maturity Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      name="fixedDepositMaturity"
                      id="fixedDepositMaturity"
                      required
                      value={formData.fixedDepositMaturity}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            )}

            {(formData.securityType === "Inventory" ||
              formData.securityType === "Multiple Securities") && (
              <div className="input-single mt-3">
                <label className="label" htmlFor="inventoryValue">
                  Inventory Value (₹)
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="inventoryValue"
                  id="inventoryValue"
                  placeholder="Enter inventory value"
                  min="0"
                  required
                  value={formData.inventoryValue}
                  onChange={handleInputChange}
                />
              </div>
            )}

            {(formData.securityType === "Book Debts" ||
              formData.securityType === "Multiple Securities") && (
              <div className="input-single mt-3">
                <label className="label" htmlFor="debtorsValue">
                  Debtors Value (₹)
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="debtorsValue"
                  id="debtorsValue"
                  placeholder="Enter debtors value"
                  min="0"
                  required
                  value={formData.debtorsValue}
                  onChange={handleInputChange}
                />
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
                  I hereby consent to the bank collecting, using, and storing my
                  personal information for the purpose of processing this
                  application and for future communications related to my account. I
                  confirm that all information provided is accurate and complete.
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
          style={{ width: `${progress}%` }}
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
      </div>
    );
  };

  return (
    <section
      className="calculator section overflow-y-hidden"
      id="cash-credit-od"
    >
      <div className="container">
        <div className="row gy-5 gy-xl-0 justify-content-between align-items-center">
          <div className="col-12 col-lg-6 col-xxl-6 mx-auto mx-lg-0">
            <div className="calculator-input">
              {/* Form card */}
              <div className="card card--custom loan-form">
                <FadeLeft>
                  <h3 className="text-start">Cash Credit/Overdraft Application</h3>
                </FadeLeft>

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
                      id="frmCashCreditOD"
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
                              aria-label="Previous step"
                            >
                              <PrimaryButton text="Previous" />
                            </button>

                            {formData.currentStep < steps.length ? (
                              <button
                                type="button"
                                className="bg-transparent"
                                onClick={handleNext}
                                aria-label="Next step"
                              >
                                <PrimaryButton text="Next" />
                              </button>
                            ) : (
                              <button
                                type="submit"
                                className="bg-transparent"
                                disabled={formData.loading}
                                aria-label="Submit application"
                              >
                                <PrimaryButton
                                  text={
                                    formData.loading
                                      ? "Processing..."
                                      : "Submit Application"
                                  }
                                />
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
                    Your {formData.facilityType} Application Has Been Submitted
                  </h4>
                  <p className="mt-3">
                    Thank you for choosing our services. Our team will review your
                    application and get back to you within 24-48 hours.
                  </p>
                  <p className="mt-3">
                    Your application reference number:{" "}
                    <strong>CC-{Math.floor(Math.random() * 1000000)}</strong>
                  </p>

                  <div className="loan-summary mt-4">
                    <h4>Facility Summary</h4>
                    <div className="summary-item">
                      <span>Facility Type:</span>
                      <strong>{formData.facilityType || "N/A"}</strong>
                    </div>
                    <div className="summary-item">
                      <span>Facility Amount:</span>
                      <strong>{formatCurrency(formData.facilityAmount)}</strong>
                    </div>
                    <div className="summary-item">
                      <span>Facility Tenure:</span>
                      <strong>{formData.facilityTenure} months</strong>
                    </div>
                    <div className="summary-item">
                      <span>Interest Rate:</span>
                      <strong>10.50% p.a.</strong>
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
                        className="bg-transparent"
                        aria-label="Back to home"
                      >
                        <PrimaryButton text="Back to Home" />
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
              <FadeDown>
                <span className="section__content-sub-title headingFour ">
                  <Image src={title} alt="vector" /> Cash Credit/Overdraft
                </span>
              </FadeDown>
              <FadeTop>
                <h2 className="section__content-title">
                  Fuel Your Business Growth
                </h2>
              </FadeTop>
              <FadeDown>
                <p className="section__content-text">
                  Our Cash Credit and Overdraft facilities are designed to support
                  your business’s working capital needs with flexible access to funds,
                  competitive interest rates, and a streamlined application process.
                  Empower your business today.
                </p>

                <ul className="section__content-list">
                  <li className="headingFive">Competitive Interest Rates</li>
                  <li className="headingFive">Flexible Fund Access</li>
                  <li className="headingFive">Multiple Security Options</li>
                  <li className="headingFive">Quick Processing & Approval</li>
                  <li className="headingFive">Minimal Documentation</li>
                </ul>

                <Link href="/loan_cash_credit" className="mt_40">
                  <PrimaryButton
                    text="Learn About Cash Credit/OD"
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

export default CashCreditODApplication;
