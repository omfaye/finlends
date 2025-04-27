"use client";
import React, { SyntheticEvent, useState, useEffect } from "react";
import title from "@/../public/images/title_vector.png";
import Image from "next/image";
import Link from "next/link";
import FadeLeft from "@/components/motionEffect/FadeLeft";
import FadeDown from "@/components/motionEffect/FadeDown";
import FadeTop from "@/components/motionEffect/FadeTop";
import PrimaryButton from "@/components/UI/PrimaryButton";

const HomeLoanBTTopupCalculator = () => {
  // Loan 1 states
  const [existingLoanAmount, setExistingLoanAmount] = useState<number>(0);
  const [existingInterestRate, setExistingInterestRate] = useState<number>(0);
  const [remainingTenure, setRemainingTenure] = useState<number>(0);
  const [newInterestRate, setNewInterestRate] = useState<number>(0);
  const [topupAmount, setTopupAmount] = useState<number>(0);
  const [topupInterestRate, setTopupInterestRate] = useState<number>(0);
  const [topupTenure, setTopupTenure] = useState<number>(0);
  const [processingFee, setProcessingFee] = useState<number>(0);
  
  // Loan 2 states
  const [existingLoanAmount2, setExistingLoanAmount2] = useState<number>(0);
  const [existingInterestRate2, setExistingInterestRate2] = useState<number>(0);
  const [remainingTenure2, setRemainingTenure2] = useState<number>(0);
  const [newInterestRate2, setNewInterestRate2] = useState<number>(0);
  const [topupAmount2, setTopupAmount2] = useState<number>(0);
  const [topupInterestRate2, setTopupInterestRate2] = useState<number>(0);
  const [topupTenure2, setTopupTenure2] = useState<number>(0);
  const [processingFee2, setProcessingFee2] = useState<number>(0);
  
  // Results for Loan 1
  const [currentEMI, setCurrentEMI] = useState<number | string>(0);
  const [newBTEMI, setNewBTEMI] = useState<number | string>(0);
  const [topupEMI, setTopupEMI] = useState<number | string>(0);
  const [totalNewEMI, setTotalNewEMI] = useState<number | string>(0);
  const [monthlySavings, setMonthlySavings] = useState<number | string>(0);
  const [lifetimeSavings, setLifetimeSavings] = useState<number | string>(0);
  const [breakEvenMonths, setBreakEvenMonths] = useState<number | string>(0);
  
  // Results for Loan 2
  const [currentEMI2, setCurrentEMI2] = useState<number | string>(0);
  const [newBTEMI2, setNewBTEMI2] = useState<number | string>(0);
  const [topupEMI2, setTopupEMI2] = useState<number | string>(0);
  const [totalNewEMI2, setTotalNewEMI2] = useState<number | string>(0);
  const [monthlySavings2, setMonthlySavings2] = useState<number | string>(0);
  const [lifetimeSavings2, setLifetimeSavings2] = useState<number | string>(0);
  const [breakEvenMonths2, setBreakEvenMonths2] = useState<number | string>(0);

  // Calculate EMI function
  const calculateEMI = (principal: number, rate: number, tenure: number): number => {
    if (principal <= 0 || rate <= 0 || tenure <= 0) return 0;
    
    const monthlyRate = rate / 100 / 12;
    const numberOfPayments = tenure * 12;
    
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) / 
                (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    return emi;
  };

  const calculateBTTopupLoan = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    
    // Calculate results for Loan 1
    const oldEMI = calculateEMI(existingLoanAmount, existingInterestRate, remainingTenure);
    const newEMI = calculateEMI(existingLoanAmount, newInterestRate, remainingTenure);
    const additionalEMI = calculateEMI(topupAmount, topupInterestRate, topupTenure);
    const combinedEMI = newEMI + additionalEMI;
    const savings = oldEMI - newEMI;
    const totalSavings = savings * remainingTenure * 12;
    const breakEven = processingFee > 0 ? Math.ceil(processingFee / savings) : 0;
    
    setCurrentEMI(oldEMI.toFixed(2));
    setNewBTEMI(newEMI.toFixed(2));
    setTopupEMI(additionalEMI.toFixed(2));
    setTotalNewEMI(combinedEMI.toFixed(2));
    setMonthlySavings(savings.toFixed(2));
    setLifetimeSavings(totalSavings.toFixed(2));
    setBreakEvenMonths(breakEven);
    
    // Calculate results for Loan 2
    const oldEMI2 = calculateEMI(existingLoanAmount2, existingInterestRate2, remainingTenure2);
    const newEMI2 = calculateEMI(existingLoanAmount2, newInterestRate2, remainingTenure2);
    const additionalEMI2 = calculateEMI(topupAmount2, topupInterestRate2, topupTenure2);
    const combinedEMI2 = newEMI2 + additionalEMI2;
    const savings2 = oldEMI2 - newEMI2;
    const totalSavings2 = savings2 * remainingTenure2 * 12;
    const breakEven2 = processingFee2 > 0 ? Math.ceil(processingFee2 / savings2) : 0;
    
    setCurrentEMI2(oldEMI2.toFixed(2));
    setNewBTEMI2(newEMI2.toFixed(2));
    setTopupEMI2(additionalEMI2.toFixed(2));
    setTotalNewEMI2(combinedEMI2.toFixed(2));
    setMonthlySavings2(savings2.toFixed(2));
    setLifetimeSavings2(totalSavings2.toFixed(2));
    setBreakEvenMonths2(breakEven2);
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
    <section className="calculator section overflow-y-hidden" id="bt-topup-calculator">
      <div className="container">
        <div className="row gy-5 gy-xl-0 justify-content-between align-items-center">
          <div className="col-12 col-lg-6 col-xxl-5 mx-auto mx-lg-0">
            <div className="calculator-input">
              <div className="card card--custom calc">
                <FadeLeft>
                  <h3 className="text-start">Home Loan Balance Transfer & Top-up Calculator</h3>
                </FadeLeft>
                <div className="card--custom__loan">
                  <div className="card--custom__form">
                    <form
                      method="POST"
                      id="frmCalculateBTTopup"
                      className="calculate__form"
                      onSubmit={calculateBTTopupLoan}
                    >
                      <div className="row gy-5 gy-md-0 mb_40">
                        <div className="col-12 col-md-6">
                          <h5 className="calculator__title">Loan Scenario 01</h5>
                          <div className="calculate__form-part">
                            <div className="input-single">
                              <label className="label" htmlFor="existingLoanAmount">
                                Existing Loan Balance <span>(required)</span>
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="existingLoanAmount"
                                id="existingLoanAmount"
                                placeholder="$0"
                                required
                                onChange={(e) =>
                                  setExistingLoanAmount(parseInt(e.target.value, 10) || 0)
                                }
                              />
                            </div>
                            <div className="input-single">
                              <label className="label" htmlFor="existingInterestRate">
                                Current Interest Rate (%) <span>(required)</span>
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="existingInterestRate"
                                id="existingInterestRate"
                                placeholder="0.00%"
                                step="0.01"
                                required
                                onChange={(e) =>
                                  setExistingInterestRate(parseFloat(e.target.value) || 0)
                                }
                              />
                            </div>
                            <div className="input-single">
                              <label className="label" htmlFor="remainingTenure">
                                Remaining Tenure <span>(years)</span>
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="remainingTenure"
                                id="remainingTenure"
                                placeholder="0 years"
                                required
                                onChange={(e) =>
                                  setRemainingTenure(parseInt(e.target.value, 10) || 0)
                                }
                              />
                            </div>
                            <div className="input-single">
                              <label className="label" htmlFor="newInterestRate">
                                New Interest Rate (%) <span>(required)</span>
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="newInterestRate"
                                id="newInterestRate"
                                placeholder="0.00%"
                                step="0.01"
                                required
                                onChange={(e) =>
                                  setNewInterestRate(parseFloat(e.target.value) || 0)
                                }
                              />
                            </div>
                            <div className="input-single">
                              <label className="label" htmlFor="topupAmount">
                                Top-up Amount <span>(optional)</span>
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="topupAmount"
                                id="topupAmount"
                                placeholder="$0"
                                onChange={(e) =>
                                  setTopupAmount(parseInt(e.target.value, 10) || 0)
                                }
                              />
                            </div>
                            <div className="input-single">
                              <label className="label" htmlFor="topupInterestRate">
                                Top-up Interest Rate (%)
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="topupInterestRate"
                                id="topupInterestRate"
                                placeholder="0.00%"
                                step="0.01"
                                onChange={(e) =>
                                  setTopupInterestRate(parseFloat(e.target.value) || 0)
                                }
                              />
                            </div>
                            <div className="input-single">
                              <label className="label" htmlFor="topupTenure">
                                Top-up Tenure <span>(years)</span>
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="topupTenure"
                                id="topupTenure"
                                placeholder="0 years"
                                onChange={(e) =>
                                  setTopupTenure(parseInt(e.target.value, 10) || 0)
                                }
                              />
                            </div>
                            <div className="input-single">
                              <label className="label" htmlFor="processingFee">
                                Processing Fee
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="processingFee"
                                id="processingFee"
                                placeholder="$0"
                                onChange={(e) =>
                                  setProcessingFee(parseInt(e.target.value, 10) || 0)
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <h5 className="calculator__title">Loan Scenario 02</h5>
                          <div className="calculate__form-part">
                            <div className="input-single">
                              <label className="label" htmlFor="existingLoanAmount2">
                                Existing Loan Balance <span>(required)</span>
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="existingLoanAmount2"
                                id="existingLoanAmount2"
                                placeholder="$0"
                                required
                                onChange={(e) =>
                                  setExistingLoanAmount2(parseInt(e.target.value, 10) || 0)
                                }
                              />
                            </div>
                            <div className="input-single">
                              <label className="label" htmlFor="existingInterestRate2">
                                Current Interest Rate (%) <span>(required)</span>
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="existingInterestRate2"
                                id="existingInterestRate2"
                                placeholder="0.00%"
                                step="0.01"
                                required
                                onChange={(e) =>
                                  setExistingInterestRate2(parseFloat(e.target.value) || 0)
                                }
                              />
                            </div>
                            <div className="input-single">
                              <label className="label" htmlFor="remainingTenure2">
                                Remaining Tenure <span>(years)</span>
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="remainingTenure2"
                                id="remainingTenure2"
                                placeholder="0 years"
                                required
                                onChange={(e) =>
                                  setRemainingTenure2(parseInt(e.target.value, 10) || 0)
                                }
                              />
                            </div>
                            <div className="input-single">
                              <label className="label" htmlFor="newInterestRate2">
                                New Interest Rate (%) <span>(required)</span>
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="newInterestRate2"
                                id="newInterestRate2"
                                placeholder="0.00%"
                                step="0.01"
                                required
                                onChange={(e) =>
                                  setNewInterestRate2(parseFloat(e.target.value) || 0)
                                }
                              />
                            </div>
                            <div className="input-single">
                              <label className="label" htmlFor="topupAmount2">
                                Top-up Amount <span>(optional)</span>
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="topupAmount2"
                                id="topupAmount2"
                                placeholder="$0"
                                onChange={(e) =>
                                  setTopupAmount2(parseInt(e.target.value, 10) || 0)
                                }
                              />
                            </div>
                            <div className="input-single">
                              <label className="label" htmlFor="topupInterestRate2">
                                Top-up Interest Rate (%)
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="topupInterestRate2"
                                id="topupInterestRate2"
                                placeholder="0.00%"
                                step="0.01"
                                onChange={(e) =>
                                  setTopupInterestRate2(parseFloat(e.target.value) || 0)
                                }
                              />
                            </div>
                            <div className="input-single">
                              <label className="label" htmlFor="topupTenure2">
                                Top-up Tenure <span>(years)</span>
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="topupTenure2"
                                id="topupTenure2"
                                placeholder="0 years"
                                onChange={(e) =>
                                  setTopupTenure2(parseInt(e.target.value, 10) || 0)
                                }
                              />
                            </div>
                            <div className="input-single">
                              <label className="label" htmlFor="processingFee2">
                                Processing Fee
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="processingFee2"
                                id="processingFee2"
                                placeholder="$0"
                                onChange={(e) =>
                                  setProcessingFee2(parseInt(e.target.value, 10) || 0)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <span id="BTTopupCalcMsg"></span>
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
                          <h5 className="calculator__title">Loan Scenario 01</h5>
                          <div className="calculate__form-part">
                            <div className="input-single">
                              <label className="label">Current EMI </label>
                              <p className="headingFour" id="current_emi">
                                ${currentEMI}
                              </p>
                            </div>
                            <div className="input-single">
                              <label className="label">New BT EMI</label>
                              <p className="headingFour" id="new_bt_emi">
                                ${newBTEMI}
                              </p>
                            </div>
                            <div className="input-single">
                              <label className="label">Top-up EMI</label>
                              <p className="headingFour" id="topup_emi">
                                ${topupEMI}
                              </p>
                            </div>
                            <div className="input-single">
                              <label className="label">Total New EMI</label>
                              <p className="headingFour" id="total_new_emi">
                                ${totalNewEMI}
                              </p>
                            </div>
                            <div className="input-single">
                              <label className="label">Monthly Savings</label>
                              <p className="headingFour" id="monthly_savings">
                                ${monthlySavings}
                              </p>
                            </div>
                            <div className="input-single">
                              <label className="label">Lifetime Savings</label>
                              <p className="headingFour" id="lifetime_savings">
                                ${lifetimeSavings}
                              </p>
                            </div>
                            <div className="input-single">
                              <label className="label">Break-even in</label>
                              <p className="headingFour" id="breakeven_months">
                                {breakEvenMonths} months
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <h5 className="calculator__title">Loan Scenario 02</h5>
                          <div className="calculate__form-part">
                            <div className="input-single">
                              <label className="label">Current EMI </label>
                              <p className="headingFour" id="current_emi2">
                                ${currentEMI2}
                              </p>
                            </div>
                            <div className="input-single">
                              <label className="label">New BT EMI</label>
                              <p className="headingFour" id="new_bt_emi2">
                                ${newBTEMI2}
                              </p>
                            </div>
                            <div className="input-single">
                              <label className="label">Top-up EMI</label>
                              <p className="headingFour" id="topup_emi2">
                                ${topupEMI2}
                              </p>
                            </div>
                            <div className="input-single">
                              <label className="label">Total New EMI</label>
                              <p className="headingFour" id="total_new_emi2">
                                ${totalNewEMI2}
                              </p>
                            </div>
                            <div className="input-single">
                              <label className="label">Monthly Savings</label>
                              <p className="headingFour" id="monthly_savings2">
                                ${monthlySavings2}
                              </p>
                            </div>
                            <div className="input-single">
                              <label className="label">Lifetime Savings</label>
                              <p className="headingFour" id="lifetime_savings2">
                                ${lifetimeSavings2}
                              </p>
                            </div>
                            <div className="input-single">
                              <label className="label">Break-even in</label>
                              <p className="headingFour" id="breakeven_months2">
                                {breakEvenMonths2} months
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 mt_32">
                          <p className="note mb_40">
                            <span>MORE:</span> Learn how balance transfers can reduce your interest burden 
                            and how to use top-ups for home renovation or other major expenses.
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
                  <Image src={title} alt="vector" /> Balance Transfer & Top-up
                </span>
              </FadeDown>
              <FadeTop>
                <h2 className="section__content-title">
                  Save on Your Existing Home Loan & Get Additional Funds
                </h2>
              </FadeTop>
              <FadeDown>
                <p className="section__content-text">
                  Our home loan balance transfer calculator helps you determine if switching lenders
                  makes financial sense. Compare your current loan with offers from other lenders and
                  see how much you could save. Additionally, calculate how a top-up loan can provide
                  extra funds for renovations, education, or other expenses.
                </p>

                <ul className="section__content-list">
                  <li className="headingFive">Balance Transfer Savings</li>
                  <li className="headingFive">Top-up Loan Analysis</li>
                  <li className="headingFive">Combined EMI Calculation</li>
                  <li className="headingFive">Break-even Point Analysis</li>
                </ul>

                <Link href="/loan_refinance" className="mt_40">
                  <PrimaryButton
                    text="Explore Refinance Options"
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

export default HomeLoanBTTopupCalculator;