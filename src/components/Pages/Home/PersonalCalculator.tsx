"use client";
import React, { SyntheticEvent, useState } from "react";
import title from "@/../public/images/title_vector.png";
import Image from "next/image";
import Link from "next/link";
import FadeLeft from "@/components/motionEffect/FadeLeft";
import FadeDown from "@/components/motionEffect/FadeDown";
import FadeTop from "@/components/motionEffect/FadeTop";
import PrimaryButton from "@/components/UI/PrimaryButton";

const PersonalCalculator = () => {
  // States for loan comparison calculator
  const [amount, setAmount] = useState<number>(0);
  const [interest, setInterest] = useState<number>(0);
  const [year, setYear] = useState<number>(0);
  const [monthlyCost, setMonthlyCost] = useState<number | string>(0);
  const [totalValue, setTotalValue] = useState<number | string>(0);

  const [amount2, setAmount2] = useState<number>(0);
  const [interest2, setInterest2] = useState<number>(0);
  const [year2, setYear2] = useState<number>(0);
  const [monthlyCost2, setMonthlyCost2] = useState<number | string>(0);
  const [totalValue2, setTotalValue2] = useState<number | string>(0);

  // States for personal loan calculator
  const [personalLoanAmount, setPersonalLoanAmount] = useState<number>(0);
  const [personalLoanInterest, setPersonalLoanInterest] = useState<number>(0);
  const [personalLoanTerm, setPersonalLoanTerm] = useState<number>(0);
  const [personalLoanType, setPersonalLoanType] = useState<string>("fixed");
  const [personalLoanMonthly, setPersonalLoanMonthly] = useState<number | string>(0);
  const [personalLoanTotal, setPersonalLoanTotal] = useState<number | string>(0);
  const [personalLoanInterestTotal, setPersonalLoanInterestTotal] = useState<number | string>(0);

  // State to control which calculator is visible
  const [activeCalculator, setActiveCalculator] = useState<string>("comparison");

  const calculateLoan = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    
    if (activeCalculator === "comparison") {
      let total = (amount / 100) * interest + amount;
      setTotalValue(total.toFixed(2));
      setMonthlyCost((total / (year * 12)).toFixed(2));
  
      // Loan2
      let total2 = (amount2 / 100) * interest2 + amount2;
      setTotalValue2(total2.toFixed(2));
      setMonthlyCost2((total2 / (year2 * 12)).toFixed(2));
    } else if (activeCalculator === "personal") {
      // Calculate personal loan
      const monthlyInterestRate = personalLoanInterest / 100 / 12;
      const totalPayments = personalLoanTerm * 12;
      
      if (personalLoanType === "fixed") {
        // Fixed rate calculation (PMT formula)
        const monthlyPayment = personalLoanAmount * 
          (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments)) / 
          (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
        
        const totalCost = monthlyPayment * totalPayments;
        const totalInterest = totalCost - personalLoanAmount;
        
        setPersonalLoanMonthly(monthlyPayment.toFixed(2));
        setPersonalLoanTotal(totalCost.toFixed(2));
        setPersonalLoanInterestTotal(totalInterest.toFixed(2));
      } else {
        // Simple interest calculation
        const totalInterest = personalLoanAmount * (personalLoanInterest / 100) * personalLoanTerm;
        const totalCost = personalLoanAmount + totalInterest;
        const monthlyPayment = totalCost / totalPayments;
        
        setPersonalLoanMonthly(monthlyPayment.toFixed(2));
        setPersonalLoanTotal(totalCost.toFixed(2));
        setPersonalLoanInterestTotal(totalInterest.toFixed(2));
      }
    }

    handleCalcSubmit();
  };

  const handleCalcSubmit = () => {
    const calcElements = document.querySelectorAll(".calc");
    const resultElements = document.querySelectorAll(".calculator-result");

    calcElements.forEach((element) => {
      element.classList.add("calc_hide");
    });

    resultElements.forEach((element) => {
      element.classList.add("calc_show");
    });
  };
  
  const handleBack = () => {
    const calcElements = document.querySelectorAll(".calc");
    const resultElements = document.querySelectorAll(".calculator-result");

    calcElements.forEach((element) => {
      element.classList.remove("calc_hide");
    });

    resultElements.forEach((element) => {
      element.classList.remove("calc_show");
    });
  };

  const renderCalculator = () => {
    if (activeCalculator === "comparison") {
      return (
        <>
          <div className="card card--custom calc">
            <FadeLeft>
              <h3 className="text-start">Loan Comparison Calculator</h3>
            </FadeLeft>
            <div className="card--custom__loan">
              <div className="card--custom__form">
                <form
                  method="POST"
                  id="frmCalculate"
                  className="calculate__form"
                  onSubmit={calculateLoan}
                >
                  <div className="row gy-5 gy-md-0 mb_40">
                    <div className="col-12 col-md-6">
                      <h5 className="calculator__title">Loan 01</h5>
                      <div className="calculate__form-part">
                        <div className="input-single">
                          <label className="label" htmlFor="amount">
                            Loan Amount <span>(required)</span>
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            name="amount"
                            id="amount"
                            placeholder="$0"
                            required
                            onChange={(e) =>
                              setAmount(parseInt(e.target.value, 10) || 0)
                            }
                          />
                        </div>
                        <div className="input-single">
                          <label className="label" htmlFor="year">
                            Loan Term <span>(years)</span>
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            name="year"
                            id="year"
                            placeholder="0 years"
                            onChange={(e) =>
                              setYear(parseInt(e.target.value, 10) || 0)
                            }
                          />
                        </div>
                        <div className="input-single">
                          <label className="label" htmlFor="interest">
                            Interest Rate (%) <span>(required)</span>
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            name="interest"
                            id="interest"
                            placeholder="0.00%"
                            onChange={(e) =>
                              setInterest(parseFloat(e.target.value) || 0)
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <h5 className="calculator__title">Loan 02</h5>
                      <div className="calculate__form-part">
                        <div className="input-single">
                          <label className="label" htmlFor="amount2">
                            Loan Amount <span>(required)</span>
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            name="amount2"
                            id="amount2"
                            placeholder="$0"
                            required
                            onChange={(e) =>
                              setAmount2(parseInt(e.target.value, 10) || 0)
                            }
                          />
                        </div>
                        <div className="input-single">
                          <label className="label" htmlFor="year2">
                            Loan Term <span>(years)</span>
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            name="year2"
                            id="year2"
                            placeholder="0 years"
                            onChange={(e) =>
                              setYear2(parseInt(e.target.value, 10) || 0)
                            }
                          />
                        </div>
                        <div className="input-single">
                          <label className="label" htmlFor="interest2">
                            Interest Rate (%) <span>(required)</span>
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            name="interest2"
                            id="interest2"
                            placeholder="0.00%"
                            onChange={(e) =>
                              setInterest2(parseFloat(e.target.value) || 0)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <span id="CalcMsg"></span>
                  <button
                    id="calc_submit"
                    type="submit"
                    className="bg-transparent"
                  >
                    <PrimaryButton text="Calculate" />
                  </button>
                </form>
              </div>
            </div>
          </div>
          
          {/* Comparison Result part */}
          <div className="card card--custom calculator-result">
            <h3>Result</h3>
            <div className="card--custom__loan">
              <div className="card--custom__form">
                <div className="calculate__form">
                  <div className="row gy-5 gy-md-0">
                    <div className="col-12 col-md-6">
                      <h5 className="calculator__title">Loan 01</h5>
                      <div className="calculate__form-part">
                        <div className="input-single">
                          <label className="label">Monthly cost </label>
                          <p className="headingFour" id="monthly_cost">
                            ${monthlyCost}
                          </p>
                        </div>
                        <div className="input-single">
                          <label className="label">Total cost</label>
                          <p className="headingFour" id="total_value">
                            ${totalValue}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <h5 className="calculator__title">Loan 02</h5>
                      <div className="calculate__form-part">
                        <div className="input-single">
                          <label className="label">Monthly cost </label>
                          <p className="headingFour" id="monthly_cost2">
                            ${monthlyCost2}
                          </p>
                        </div>
                        <div className="input-single">
                          <label className="label">Total cost</label>
                          <p className="headingFour" id="total_value2">
                            ${totalValue2}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 mt_32">
                      <p className="note mb_40">
                        <span>MORE:</span> Learn about the pros and cons of
                        a shorter-term mortgage or how to get preapproved
                        for a mortgage.
                      </p>
                      <button
                        onClick={handleBack}
                        className="bg-transparent"
                      >
                        <PrimaryButton text="Back" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else if (activeCalculator === "personal") {
      return (
        <>
          <div className="card card--custom calc">
            <FadeLeft>
              <h3 className="text-start">Personal Loan Calculator</h3>
            </FadeLeft>
            <div className="card--custom__loan">
              <div className="card--custom__form">
                <form
                  method="POST"
                  id="frmPersonalLoan"
                  className="calculate__form"
                  onSubmit={calculateLoan}
                >
                  <div className="row gy-5 gy-md-0 mb_40">
                    <div className="col-12">
                      <div className="calculate__form-part">
                        <div className="input-single">
                          <label className="label" htmlFor="personalLoanAmount">
                            Loan Amount <span>(required)</span>
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            name="personalLoanAmount"
                            id="personalLoanAmount"
                            placeholder="$0"
                            required
                            onChange={(e) =>
                              setPersonalLoanAmount(parseInt(e.target.value, 10) || 0)
                            }
                          />
                        </div>
                        <div className="input-single">
                          <label className="label" htmlFor="personalLoanTerm">
                            Loan Term <span>(years)</span>
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            name="personalLoanTerm"
                            id="personalLoanTerm"
                            placeholder="0 years"
                            onChange={(e) =>
                              setPersonalLoanTerm(parseInt(e.target.value, 10) || 0)
                            }
                          />
                        </div>
                        <div className="input-single">
                          <label className="label" htmlFor="personalLoanInterest">
                            Interest Rate (%) <span>(required)</span>
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            name="personalLoanInterest"
                            id="personalLoanInterest"
                            placeholder="0.00%"
                            step="0.01"
                            onChange={(e) =>
                              setPersonalLoanInterest(parseFloat(e.target.value) || 0)
                            }
                          />
                        </div>
                        <div className="input-single">
                          <label className="label" htmlFor="personalLoanType">
                            Loan Type
                          </label>
                          <select
                            className="form-control"
                            name="personalLoanType"
                            id="personalLoanType"
                            onChange={(e) => setPersonalLoanType(e.target.value)}
                            value={personalLoanType}
                          >
                            <option value="fixed">Fixed Rate</option>
                            <option value="simple">Simple Interest</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span id="PersonalLoanCalcMsg"></span>
                  <button
                    id="personal_loan_calc_submit"
                    type="submit"
                    className="bg-transparent"
                  >
                    <PrimaryButton text="Calculate" />
                  </button>
                </form>
              </div>
            </div>
          </div>
          
          {/* Personal Loan Result part */}
          <div className="card card--custom calculator-result">
            <h3>Personal Loan Result</h3>
            <div className="card--custom__loan">
              <div className="card--custom__form">
                <div className="calculate__form">
                  <div className="row gy-5 gy-md-0">
                    <div className="col-12">
                      <div className="calculate__form-part">
                        <div className="input-single">
                          <label className="label">Monthly Payment</label>
                          <p className="headingFour" id="personal_monthly_cost">
                            ${personalLoanMonthly}
                          </p>
                        </div>
                        <div className="input-single">
                          <label className="label">Total Payment</label>
                          <p className="headingFour" id="personal_total_value">
                            ${personalLoanTotal}
                          </p>
                        </div>
                        <div className="input-single">
                          <label className="label">Total Interest</label>
                          <p className="headingFour" id="personal_interest_total">
                            ${personalLoanInterestTotal}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 mt_32">
                      <p className="note mb_40">
                        <span>MORE:</span> Learn about how to qualify for a personal loan
                        or how to improve your credit score for better rates.
                      </p>
                      <button
                        onClick={handleBack}
                        className="bg-transparent"
                      >
                        <PrimaryButton text="Back" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <section className="calculator section overflow-y-hidden" id="calculator">
      <div className="container">
        <div className="row gy-5 gy-xl-0 justify-content-between align-items-center">
          <div className="col-12 col-lg-6 col-xxl-5 mx-auto mx-lg-0">
            <div className="calculator-tabs mb_24">
              <button 
                className={`calculator-tab ${activeCalculator === "comparison" ? "active" : ""}`} 
                onClick={() => setActiveCalculator("comparison")}
              >
                Loan Comparison
              </button>
              <button 
                className={`calculator-tab ${activeCalculator === "personal" ? "active" : ""}`}
                onClick={() => setActiveCalculator("personal")}
              >
                Personal Loan
              </button>
            </div>
            <div className="calculator-input">
              {renderCalculator()}
            </div>
          </div>
          {/* Right side part  */}
          <div className="col-12 col-lg-6">
            <div className="section__content ms-lg-4 ms-xxl-0">
              <FadeDown>
                <span className="section__content-sub-title headingFour ">
                  <Image src={title} alt="vector" /> Loan Calculators
                </span>
              </FadeDown>
              <FadeTop>
                <h2 className="section__content-title">
                  Empower Yourself with Accurate Loan Estimates
                </h2>
              </FadeTop>
              <FadeDown>
                <p className="section__content-text">
                  Our loan calculators are powerful tools designed to assist you
                  in making informed financial decisions. Whether you're
                  planning a major purchase, estimating monthly payments, or comparing
                  different loan options, our calculators provide the clarity you need.
                </p>

                <ul className="section__content-list">
                  <li className="headingFive">Loan Payment Calculator</li>
                  <li className="headingFive">Personal Loan Calculator</li>
                  <li className="headingFive">Amortization Calculator</li>
                  <li className="headingFive">Affordability Calculator</li>
                  <li className="headingFive">Interest Calculator</li>
                </ul>

                <Link href="/loan_reviews" className="mt_40">
                  <PrimaryButton
                    text="Browse Loan Review"
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

export default PersonalCalculator;