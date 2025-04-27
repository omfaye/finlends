"use client";
import React, { SyntheticEvent, useState } from "react";
import title from "@/../public/images/title_vector.png";
import Image from "next/image";
import Link from "next/link";
import FadeLeft from "@/components/motionEffect/FadeLeft";
import FadeDown from "@/components/motionEffect/FadeDown";
import FadeTop from "@/components/motionEffect/FadeTop";
import PrimaryButton from "@/components/UI/PrimaryButton";

const Calculetor = () => {
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

  const calculateLoan = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    e.currentTarget.reset();
    let total = (amount / 100) * interest + amount;
    setTotalValue(total.toFixed(2));
    setMonthlyCost((total / (year * 12)).toFixed(2));

    // Loan2
    let total2 = (amount2 / 100) * interest2 + amount2;
    setTotalValue2(total2.toFixed(2));
    setMonthlyCost2((total2 / (year2 * 12)).toFixed(2));
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
    <section className="calculator section overflow-y-hidden" id="calculator">
      <div className="container">
        <div className="row gy-5 gy-xl-0 justify-content-between align-items-center">
          <div className="col-12 col-lg-6 col-xxl-5 mx-auto mx-lg-0">
            <div className="calculator-input">
              <div className="card card--custom calc">
                <FadeLeft>
                  <h3 className="text-start">Calculator</h3>
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
                                  setAmount(parseInt(e.target.value, 10))
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
                                  setYear(parseInt(e.target.value, 10))
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
                                  setInterest(parseInt(e.target.value, 10))
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
                                  setAmount2(parseInt(e.target.value, 10))
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
                                  setYear2(parseInt(e.target.value, 10))
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
                                  setInterest2(parseInt(e.target.value, 10))
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <span id="CalcMsg"></span>
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
                          <h5 className="calculator__title">Loan 01</h5>
                          <div className="calculate__form-part">
                            <div className="input-single">
                              <label className="label">Monthly cost </label>
                              <p className="headingFour" id="monthly_cost">
                                {monthlyCost}
                              </p>
                            </div>
                            <div className="input-single">
                              <label className="label">Total cost</label>
                              <p className="headingFour" id="total_value">
                                {totalValue}
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
                                {monthlyCost2}
                              </p>
                            </div>
                            <div className="input-single">
                              <label className="label">Total cost</label>
                              <p className="headingFour" id="total_value2">
                                {totalValue2}
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
                  planning a major purchase, estimating monthly payments
                </p>

                <ul className="section__content-list">
                  <li className="headingFive">Loan Payment Calculator</li>
                  <li className="headingFive">Amortization Calculator</li>
                  <li className="headingFive">Affordability Calculator</li>
                  <li className="headingFive">Interest Calculator</li>
                </ul>

                <Link href="/loan_reviews" className=" mt_40 ">
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

export default Calculetor;
