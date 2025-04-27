"use client";
import React, { SyntheticEvent, useState } from "react";
import title from "@/../public/images/title_vector.png";
import Image from "next/image";
import Link from "next/link";
import FadeLeft from "@/components/motionEffect/FadeLeft";
import FadeDown from "@/components/motionEffect/FadeDown";
import FadeTop from "@/components/motionEffect/FadeTop";
import PrimaryButton from "@/components/UI/PrimaryButton";

const EducationLoanApplication = () => {
  // Define the steps for the education loan application
  const steps = [
    "Loan Amount",
    "Education Details",
    "Student Information",
    "Co-applicant Details",
    "Income Details",
    "Bank Details",
  ];

  // Form state
  const [formData, setFormData] = useState({
    // Step 1: Loan Amount
    loanAmount: 1000000,
    loanTenure: 60,

    // Step 2: Education Details
    courseName: "",
    universityName: "",
    countryOfStudy: "",
    courseType: "",
    courseDuration: "",
    admissionStatus: "",
    totalCourseFee: "",

    // Step 3: Student Information
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    panNumber: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    highestQualification: "",

    // Step 4: Co-applicant Details
    coApplicantName: "",
    coApplicantRelation: "",
    coApplicantDOB: "",
    coApplicantPAN: "",
    coApplicantEmail: "",
    coApplicantPhone: "",
    coApplicantAddress: "",

    // Step 5: Income Details
    incomeSource: "",
    // For Employed
    employerName: "",
    designation: "",
    workExperience: "",
    monthlyIncome: "",
    // For Self-Employed
    businessName: "",
    businessType: "",
    businessExperience: "",
    annualIncome: "",
    // For Others
    otherIncomeSource: "",
    otherIncomeAmount: "",

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
          "You must provide consent to proceed with your education loan application",
      }));
      return;
    }

    try {
      setFormData((prev) => ({ ...prev, loading: true, error: "" }));

      // Replace with your actual API endpoint
      const response = await fetch("/api/education-loan-application", {
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

  // Calculate EMI
  const calculateEMI = () => {
    const principal = formData.loanAmount;
    const interestRate = 8.5 / 100 / 12; // 8.5% annual interest rate converted to monthly
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
            <h4 className="mb-4">Select your desired education loan amount</h4>
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
                step="100000"
                value={formData.loanAmount}
                onChange={handleInputChange}
              />
              <div className="d-flex justify-content-between">
                <small>₹1 Lakh</small>
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
                max="180"
                step="12"
                value={formData.loanTenure}
                onChange={handleInputChange}
              />
              <div className="d-flex justify-content-between">
                <small>1 year</small>
                <small>15 years</small>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="calculate__form-part">
            <h4 className="mb-4">Education Details</h4>
            <div className="row gy-3">
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="courseName">
                    Course Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="courseName"
                    id="courseName"
                    placeholder="Enter course name"
                    required
                    value={formData.courseName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="universityName">
                    University/College Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="universityName"
                    id="universityName"
                    placeholder="Enter university/college name"
                    required
                    value={formData.universityName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="countryOfStudy">
                    Country of Study
                  </label>
                  <select
                    className="form-select"
                    name="countryOfStudy"
                    id="countryOfStudy"
                    required
                    value={formData.countryOfStudy}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Country</option>
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="courseType">
                    Course Type
                  </label>
                  <select
                    className="form-select"
                    name="courseType"
                    id="courseType"
                    required
                    value={formData.courseType}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Course Type</option>
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Post Graduate">Post Graduate</option>
                    <option value="Diploma">Diploma</option>
                    <option value="PhD">PhD</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="courseDuration">
                    Course Duration (in years)
                  </label>
                  <select
                    className="form-select"
                    name="courseDuration"
                    id="courseDuration"
                    required
                    value={formData.courseDuration}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Duration</option>
                    <option value="1">1 Year</option>
                    <option value="2">2 Years</option>
                    <option value="3">3 Years</option>
                    <option value="4">4 Years</option>
                    <option value="5">5 Years</option>
                    <option value="6+">6+ Years</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="admissionStatus">
                    Admission Status
                  </label>
                  <select
                    className="form-select"
                    name="admissionStatus"
                    id="admissionStatus"
                    required
                    value={formData.admissionStatus}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Status</option>
                    <option value="Applied">Applied</option>
                    <option value="Admission Offered">Admission Offered</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Not Applied Yet">Not Applied Yet</option>
                  </select>
                </div>
              </div>
              <div className="col-md-12">
                <div className="input-single">
                  <label className="label" htmlFor="totalCourseFee">
                    Total Course Fee (₹)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="totalCourseFee"
                    id="totalCourseFee"
                    placeholder="Enter total course fee"
                    min="0"
                    required
                    value={formData.totalCourseFee}
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
            <h4 className="mb-4">Student Information</h4>
            <div className="input-single">
              <label className="label" htmlFor="fullName">
                Full Name <span>(as per ID Proof)</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="fullName"
                id="fullName"
                placeholder="Enter student's full name"
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
                    placeholder="Enter email"
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
                    placeholder="Enter PAN number"
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
                placeholder="Enter current address"
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

            <div className="input-single">
              <label className="label" htmlFor="highestQualification">
                Highest Qualification
              </label>
              <select
                className="form-select"
                name="highestQualification"
                id="highestQualification"
                required
                value={formData.highestQualification}
                onChange={handleInputChange}
              >
                <option value="">Select Qualification</option>
                <option value="10th Standard">10th Standard</option>
                <option value="12th Standard">12th Standard</option>
                <option value="Diploma">Diploma</option>
                <option value="Graduate">Graduate</option>
                <option value="Post Graduate">Post Graduate</option>
                <option value="PhD">PhD</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="calculate__form-part">
            <h4 className="mb-4">Co-applicant Details (Parent/Guardian)</h4>
            <div className="input-single">
              <label className="label" htmlFor="coApplicantName">
                Co-applicant Name
              </label>
              <input
                type="text"
                className="form-control"
                name="coApplicantName"
                id="coApplicantName"
                placeholder="Enter co-applicant's name"
                required
                value={formData.coApplicantName}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-single">
              <label className="label" htmlFor="coApplicantRelation">
                Relationship with Student
              </label>
              <select
                className="form-select"
                name="coApplicantRelation"
                id="coApplicantRelation"
                required
                value={formData.coApplicantRelation}
                onChange={handleInputChange}
              >
                <option value="">Select Relationship</option>
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Guardian">Guardian</option>
                <option value="Spouse">Spouse</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="coApplicantDOB">
                    Co-applicant Date of Birth
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="coApplicantDOB"
                    id="coApplicantDOB"
                    required
                    value={formData.coApplicantDOB}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="coApplicantPAN">
                    Co-applicant PAN Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="coApplicantPAN"
                    id="coApplicantPAN"
                    placeholder="Enter co-applicant's PAN"
                    required
                    value={formData.coApplicantPAN}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="coApplicantEmail">
                    Co-applicant Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="coApplicantEmail"
                    id="coApplicantEmail"
                    placeholder="Enter co-applicant's email"
                    required
                    value={formData.coApplicantEmail}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-single">
                  <label className="label" htmlFor="coApplicantPhone">
                    Co-applicant Phone
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    name="coApplicantPhone"
                    id="coApplicantPhone"
                    placeholder="Enter co-applicant's phone"
                    required
                    value={formData.coApplicantPhone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="input-single">
              <label className="label" htmlFor="coApplicantAddress">
                Co-applicant Address
              </label>
              <textarea
                className="form-control"
                name="coApplicantAddress"
                id="coApplicantAddress"
                placeholder="Enter co-applicant's address"
                required
                rows={3}
                value={formData.coApplicantAddress}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="calculate__form-part">
            <h4 className="mb-4">Co-applicant Income Details</h4>
            <div className="input-single">
              <label className="label" htmlFor="incomeSource">
                Source of Income
              </label>
              <select
                className="form-select"
                name="incomeSource"
                id="incomeSource"
                required
                value={formData.incomeSource}
                onChange={handleInputChange}
              >
                <option value="">Select Income Source</option>
                <option value="Employed">Employed</option>
                <option value="Self-Employed">Self-Employed</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {formData.incomeSource === "Employed" ? (
              <div className="row gy-3">
                <div className="col-md-6">
                  <div className="input-single">
                    <label className="label" htmlFor="employerName">
                      Employer Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="employerName"
                      id="employerName"
                      placeholder="Enter employer name"
                      required
                      value={formData.employerName}
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
                      placeholder="Enter designation"
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
            ) : formData.incomeSource === "Self-Employed" ? (
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
            ) : formData.incomeSource === "Other" ? (
              <div className="row gy-3">
                <div className="col-md-6">
                  <div className="input-single">
                    <label className="label" htmlFor="otherIncomeSource">
                      Specify Income Source
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="otherIncomeSource"
                      id="otherIncomeSource"
                      placeholder="Specify income source"
                      required
                      value={formData.otherIncomeSource}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-single">
                    <label className="label" htmlFor="otherIncomeAmount">
                      Annual Income (₹)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="otherIncomeAmount"
                      id="otherIncomeAmount"
                      placeholder="Enter annual income"
                      min="0"
                      required
                      value={formData.otherIncomeAmount}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="alert alert-info">
                Please select an income source above
              </div>
            )}
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
                <option value="Salary">Salary</option>
                <option value="Other">Other</option>
              </select>
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
                  I hereby declare that the information provided is true and
                  correct. I authorize the bank to verify the details provided.
                </label>
              </div>
            </div>

            {formData.error && (
              <div className="alert alert-danger mt-3">{formData.error}</div>
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
    <section className="calculator section overflow-y-hidden" id="education-loan">
      <div className="container">
        <div className="row gy-5 gy-xl-0 justify-content-between align-items-center">
          <div className="col-12 col-lg-6 col-xxl-6 mx-auto mx-lg-0">
            <div className="calculator-input">
              {/* Form card */}
              <div className="card card--custom loan-form">
                <FadeLeft>
                  <h3 className="text-start">Education Loan Application</h3>
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
                      id="frmEducationLoan"
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

          
            </div>
          </div>

          {/* Right side part */}
          <div className="col-12 col-lg-6">
            <div className="section__content ms-lg-4 ms-xxl-0">
              <FadeDown>
                <span className="section__content-sub-title headingFour ">
                  <Image src={title} alt="vector" /> Education Loan
                </span>
              </FadeDown>
              <FadeTop>
                <h2 className="section__content-title">
                  Fund Your Education with Ease
                </h2>
              </FadeTop>
              <FadeDown>
                <p className="section__content-text">
                  Our education loans are designed to support your academic aspirations
                  with competitive interest rates, flexible repayment options, and a
                  streamlined application process. Take the first step towards achieving
                  your educational goals today.
                </p>

                <ul className="section__content-list">
                  <li className="headingFive">Competitive Interest Rates</li>
                  <li className="headingFive">Up to 100% Course Fee Coverage</li>
                  <li className="headingFive">Flexible Repayment Tenure</li>
                  <li className="headingFive">Quick Processing & Approval</li>
                  <li className="headingFive">Minimal Documentation</li>
                </ul>

                <Link href="/loan_education" className="mt_40">
                  <PrimaryButton
                    text="Learn About Education Loans"
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

export default EducationLoanApplication;