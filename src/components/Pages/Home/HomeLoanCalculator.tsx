"use client";
import React, { SyntheticEvent, useState } from "react";
import title from "@/../public/images/title_vector.png";
import Image from "next/image";
import Link from "next/link";
import FadeLeft from "@/components/motionEffect/FadeLeft";
import FadeDown from "@/components/motionEffect/FadeDown";
import FadeTop from "@/components/motionEffect/FadeTop";
import PrimaryButton from "@/components/UI/PrimaryButton";

const HomeLoanCalculator = () => {
  const [propertyValue, setPropertyValue] = useState<number>(0);
  const [downPayment, setDownPayment] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0);
  const [loanTerm, setLoanTerm] = useState<number>(0);
  const [monthlyPayment, setMonthlyPayment] = useState<number | string>(0);
  const [totalInterest, setTotalInterest] = useState<number | string>(0);
  const [totalCost, setTotalCost] = useState<number | string>(0);

  const [propertyValue2, setPropertyValue2] = useState<number>(0);
  const [downPayment2, setDownPayment2] = useState<number>(0);
  const [interestRate2, setInterestRate2] = useState<number>(0);
  const [loanTerm2, setLoanTerm2] = useState<number>(0);
  const [monthlyPayment2, setMonthlyPayment2] = useState<number | string>(0);
  const [totalInterest2, setTotalInterest2] = useState<number | string>(0);
  const [totalCost2, setTotalCost2] = useState<number | string>(0);

  const calculateHomeLoan = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    e.currentTarget.reset();
    
    // Calculate loan principal (property value - down payment)
    const principal = propertyValue - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    // Calculate monthly payment using mortgage formula
    const monthlyPaymentValue = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                            (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalPayment = monthlyPaymentValue * numberOfPayments;
    const totalInterestValue = totalPayment - principal;

    setMonthlyPayment(monthlyPaymentValue.toFixed(2));
    setTotalInterest(totalInterestValue.toFixed(2));
    setTotalCost(totalPayment.toFixed(2));

    // Loan 2
    const principal2 = propertyValue2 - downPayment2;
    const monthlyRate2 = interestRate2 / 100 / 12;
    const numberOfPayments2 = loanTerm2 * 12;

    const monthlyPaymentValue2 = principal2 * (monthlyRate2 * Math.pow(1 + monthlyRate2, numberOfPayments2)) / 
                              (Math.pow(1 + monthlyRate2, numberOfPayments2) - 1);

    const totalPayment2 = monthlyPaymentValue2 * numberOfPayments2;
    const totalInterestValue2 = totalPayment2 - principal2;

    setMonthlyPayment2(monthlyPaymentValue2.toFixed(2));
    setTotalInterest2(totalInterestValue2.toFixed(2));
    setTotalCost2(totalPayment2.toFixed(2));
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
  
  return (
    <section className="calculator section overflow-y-hidden" id="home-calculator">
      <div className="container">
        <div className="row gy-5 gy-xl-0 justify-content-between align-items-center">
          <div className="col-12 col-lg-6 col-xxl-5 mx-auto mx-lg-0">
            <div className="calculator-input">
              <div className="card card--custom calc">
                <FadeLeft>
                  <h3 className="text-start">Home Loan Calculator</h3>
                </FadeLeft>
                <div className="card--custom__loan">
                  <div className="card--custom__form">
                    <form
                      method="POST"
                      id="frmCalculateHomeLoan"
                      className="calculate__form"
                      onSubmit={calculateHomeLoan}
                    >
                      <div className="row gy-5 gy-md-0 mb_40">
                        <div className="col-12 col-md-6">
                          <h5 className="calculator__title">Home Loan 01</h5>
                          <div className="calculate__form-part">
                            <div className="input-single">
                              <label className="label" htmlFor="propertyValue">
                                Property Value <span>(required)</span>
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="propertyValue"
                                id="propertyValue"
                                placeholder="$0"
                                required
                                onChange={(e) =>
                                  setPropertyValue(parseInt(e.target.value, 10))
                                }
                              />
                            </div>
                            <div className="input-single">
                              <label className="label" htmlFor="downPayment">
                                Down Payment <span>(required)</span>
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="downPayment"
                                id="downPayment"
                                placeholder="$0"
                                required
                                onChange={(e) =>
                                  setDownPayment(parseInt(e.target.value, 10))
                                }
                              />
                            </div>
                            <div className="input-single">
                              <label className="label" htmlFor="interestRate">
                                Interest Rate (%) <span>(required)</span>
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="interestRate"
                                id="interestRate"
                                placeholder="0.00%"
                                step="0.01"
                                required
                                onChange={(e) =>
                                  setInterestRate(parseFloat(e.target.value))
                                }
                              />
                            </div>
                            <div className="input-single">
                              <label className="label" htmlFor="loanTerm">
                                Loan Term <span>(years)</span>
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="loanTerm"
                                id="loanTerm"
                                placeholder="30 years"
                                required
                                onChange={(e) =>
                                  setLoanTerm(parseInt(e.target.value, 10))
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <h5 className="calculator__title">Home Loan 02</h5>
                          <div className="calculate__form-part">
                            <div className="input-single">
                              <label className="label" htmlFor="propertyValue2">
                                Property Value <span>(required)</span>
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="propertyValue2"
                                id="propertyValue2"
                                placeholder="$0"
                                required
                                onChange={(e) =>
                                  setPropertyValue2(parseInt(e.target.value, 10))
                                }
                              />
                            </div>
                            <div className="input-single">
                              <label className="label" htmlFor="downPayment2">
                                Down Payment <span>(required)</span>
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="downPayment2"
                                id="downPayment2"
                                placeholder="$0"
                                required
                                onChange={(e) =>
                                  setDownPayment2(parseInt(e.target.value, 10))
                                }
                              />
                            </div>
                            <div className="input-single">
                              <label className="label" htmlFor="interestRate2">
                                Interest Rate (%) <span>(required)</span>
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="interestRate2"
                                id="interestRate2"
                                placeholder="0.00%"
                                step="0.01"
                                required
                                onChange={(e) =>
                                  setInterestRate2(parseFloat(e.target.value))
                                }
                              />
                            </div>
                            <div className="input-single">
                              <label className="label" htmlFor="loanTerm2">
                                Loan Term <span>(years)</span>
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="loanTerm2"
                                id="loanTerm2"
                                placeholder="30 years"
                                required
                                onChange={(e) =>
                                  setLoanTerm2(parseInt(e.target.value, 10))
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <span id="HomeCalcMsg"></span>
                      <button
                        id="calc_submit"
                        onClick={handleCalcSubmit}
                        className="bg-transparent"
                      >
                        <PrimaryButton text="Calculate" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              {/* Result part  */}
              <div className="card card--custom calculator-result">
                <h3>Result</h3>
                <div className="card--custom__loan">
                  <div className="card--custom__form">
                    <div className="calculate__form">
                      <div className="row gy-5 gy-md-0">
                        <div className="col-12 col-md-6">
                          <h5 className="calculator__title">Home Loan 01</h5>
                          <div className="calculate__form-part">
                            <div className="input-single">
                              <label className="label">Monthly Payment </label>
                              <p className="headingFour" id="monthly_payment">
                                ${monthlyPayment}
                              </p>
                            </div>
                            <div className="input-single">
                              <label className="label">Total Interest</label>
                              <p className="headingFour" id="total_interest">
                                ${totalInterest}
                              </p>
                            </div>
                            <div className="input-single">
                              <label className="label">Total Cost</label>
                              <p className="headingFour" id="total_cost">
                                ${totalCost}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <h5 className="calculator__title">Home Loan 02</h5>
                          <div className="calculate__form-part">
                            <div className="input-single">
                              <label className="label">Monthly Payment </label>
                              <p className="headingFour" id="monthly_payment2">
                                ${monthlyPayment2}
                              </p>
                            </div>
                            <div className="input-single">
                              <label className="label">Total Interest</label>
                              <p className="headingFour" id="total_interest2">
                                ${totalInterest2}
                              </p>
                            </div>
                            <div className="input-single">
                              <label className="label">Total Cost</label>
                              <p className="headingFour" id="total_cost2">
                                ${totalCost2}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 mt_32">
                          <p className="note mb_40">
                            <span>MORE:</span> Understand how down payments affect your monthly 
                            mortgage payments and learn about current mortgage rates in your area.
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
            </div>
          </div>
          {/* Right side part  */}
          <div className="col-12 col-lg-6">
            <div className="section__content ms-lg-4 ms-xxl-0">
              <FadeDown>
                <span className="section__content-sub-title headingFour ">
                  <Image src={title} alt="vector" /> Home Loan Calculators
                </span>
              </FadeDown>
              <FadeTop>
                <h2 className="section__content-title">
                  Plan Your Dream Home Purchase with Confidence
                </h2>
              </FadeTop>
              <FadeDown>
                <p className="section__content-text">
                  Our home loan calculators help you understand exactly what you can afford.
                  Compare different loan scenarios, down payment options, and term lengths 
                  to make the best financial decision for your future home.
                </p>

                <ul className="section__content-list">
                  <li className="headingFive">Mortgage Payment Calculator</li>
                  <li className="headingFive">Down Payment Impact Calculator</li>
                  <li className="headingFive">Home Affordability Calculator</li>
                  <li className="headingFive">Refinance Savings Calculator</li>
                </ul>

                <Link href="/mortgage_resources" className=" mt_40 ">
                  <PrimaryButton
                    text="Explore Mortgage Resources"
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

export default HomeLoanCalculator;