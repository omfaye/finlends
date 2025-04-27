import { comparisons } from "../../../../public/data/loanComparisionData";
import Banner from "@/components/shared/Banner";
import banner from "@/../public/images/loan_comparison_banner.png";
import CreditScoreCalculator from "@/components/Pages/Home/CreditScoreChecker";

const LoanComparision = () => {
  return (
    <div>
      <Banner
        heading={"Credit Score Calculator"}
        items={["Home", "Loan Comparison"]}
        banner_img={banner}
      ></Banner>
      {/* <section className="loan-comparison section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="loan-comparison__table">
                <h4 className="sloan-comparison__title">Loan Comparison</h4>
                <table>
                  <thead>
                    <tr>
                      <th>Loan Features</th>
                      <th>Bank A</th>
                      <th>Credit Union B</th>
                      <th>Online Lender C</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisons.map((data) => (
                      <tr key={data.id}>
                        <td className="fontBold">{data.features}</td>
                        <td>{data.bank}</td>
                        <td>{data.union}</td>
                        <td>{data.lender}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <CreditScoreCalculator/>
    </div>
  );
};

export default LoanComparision;
