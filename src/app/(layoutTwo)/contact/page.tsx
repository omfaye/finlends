"use client";
import banner from "@/../public/images/contact_banner.png";
import FadeDown from "@/components/motionEffect/FadeDown";
import FadeLeft from "@/components/motionEffect/FadeLeft";
import FadeRight from "@/components/motionEffect/FadeRight";
import FadeTop from "@/components/motionEffect/FadeTop";
import Banner from "@/components/shared/Banner";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrimaryButton from "@/components/UI/PrimaryButton";
import Select from "react-select";
import { State, City } from "country-state-city";
import ReCAPTCHA from "react-google-recaptcha";
import { StylesConfig } from "react-select";

function Contact() {
  const notify = () => toast("Message sent successfully");
  const form = useRef<HTMLFormElement | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isVerified, setIsVerified] = useState(false);

  const [selectedState, setSelectedState] = useState<any>(null);
  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [selectedLoanType, setSelectedLoanType] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    loanType: "",
    state: "",
    city: "",
    message: "",
  });

  const loanOptions = [
    { value: "Home Loan", label: "Home Loan" },
    { value: "Home Loan BT Top Up", label: "Home Loan BT Top Up" },
    { value: "Loan Against Properties", label: "Loan Against Properties" },
    { value: "Loan Against Properties BT Top Up", label: "Loan Against Properties BT Top Up" },
    { value: "Education Loan", label: "Education Loan" },
    { value: "Personal Loan", label: "Personal Loan" },
    { value: "Medical Loan", label: "Medical Loan" },
    { value: "Car Loan", label: "Car Loan" },
    { value: "Business Loan", label: "Business Loan" },
    { value: "Cash Credit Over Draft", label: "Cash Credit Over Draft" },
    { value: "School Funding", label: "School Funding" },
    { value: "Builder Project Finance", label: "Builder Project Finance" },
    { value: "Shop Purchase Loan", label: "Shop Purchase Loan" },
  ];

  const inputStyle = {
    minHeight: "50px",
    borderRadius: "8px",
    border: "1px solid #e1e1e1",
    backgroundColor: "#f9f9f9",
    padding: "0 15px",
    transition: "all 0.3s ease",
    color: "#333",
    fontSize: "15px",
    width: "100%",
  };

  const customSelectStyles: StylesConfig = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "50px",
      borderRadius: "8px",
      border: state.isFocused ? "1px solid #007bff" : "1px solid #e1e1e1",
      backgroundColor: "#ffffff",
      boxShadow: state.isFocused ? "0 0 0 2px rgba(0, 123, 255, 0.25)" : "none",
      "&:hover": {
        borderColor: "#007bff",
      },
      padding: "0 5px",
      transition: "all 0.3s ease",
      fontSize: "15px",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#999",
      fontSize: "15px",
    }),
    option: (provided, state) => ({
      ...provided,
      padding: "10px 15px",
      backgroundColor: state.isSelected
        ? "#007bff"
        : state.isFocused
        ? "rgba(0, 123, 255, 0.1)"
        : "white",
      color: state.isSelected ? "white" : "#333",
      cursor: "pointer",
      fontSize: "15px",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "8px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      zIndex: 999,
      overflow: "hidden",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#000000",
      fontSize: "15px",
      fontWeight: "500",
      lineHeight: "50px",
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "2px 8px",
      color: "#000000",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#007bff",
      "&:hover": {
        color: "#0056b3",
      },
    }),
    input: (provided) => ({
      ...provided,
      color: "#000000",
      fontSize: "15px",
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      backgroundColor: "#e1e1e1",
    }),
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRecaptchaChange = (token: string | null) => {
    setIsVerified(token !== null);
  };

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isVerified) {
      toast.error("Please verify you're not a robot");
      return;
    }

    try {
      const token = await recaptchaRef.current?.executeAsync();

      if (!token) {
        toast.error("Captcha verification failed");
        return;
      }

      await emailjs.send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          loanType: selectedLoanType?.value || "",
          state: selectedState?.label || "",
          city: selectedCity?.label || "",
          message: formData.message,
          "g-recaptcha-response": token,
        },
        "YOUR_PUBLIC_KEY"
      );

      notify();
      form.current?.reset();
      setSelectedLoanType(null);
      setSelectedState(null);
      setSelectedCity(null);
      setFormData({
        name: "",
        email: "",
        phone: "",
        loanType: "",
        state: "",
        city: "",
        message: "",
      });
      recaptchaRef.current?.reset();
      setIsVerified(false);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Error sending email:", error);
    }
  };

  return (
    <div className="overflow-x-hidden">
      <Banner heading={"Contact Us"} items={["Home", "Contact Us"]} banner_img={banner} />
      <section className="sign-up contact section">
        <div className="container">
          <div className="row gy-5 gy-xl-0 justify-content-center justify-content-lg-between">
            <div className="col-12 col-lg-7 col-xxl-8">
              <form
                ref={form}
                onSubmit={sendEmail}
                method="POST"
                autoComplete="off"
                id="frmContactus"
                className="sign-up__form"
              >
                <FadeLeft>
                  <h3 className="contact__title">Get in touch with us.</h3>
                </FadeLeft>
                <div className="sign-up__form-part">
                  <FadeDown>
                    <div className="input-group">
                      <div className="input-single">
                        <label className="label" htmlFor="name">
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          id="name"
                          placeholder="Enter Your Name..."
                          required
                          style={inputStyle}
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="input-single">
                        <label className="label" htmlFor="phone">
                          Phone
                        </label>
                        <input
                          type="tel"
                          className="form-control"
                          name="phone"
                          id="phone"
                          placeholder="Enter Your Number..."
                          required
                          style={inputStyle}
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </FadeDown>

                  <FadeTop>
                    <div className="input-group">
                      <div className="input-single">
                        <label className="label">State</label>
                        <Select
                          options={State.getStatesOfCountry("IN").map((state) => ({
                            label: state.name,
                            value: state.isoCode,
                          }))}
                          value={selectedState}
                          onChange={(state) => {
                            setSelectedState(state);
                            setSelectedCity(null); // Reset city when state changes
                            setFormData((prev) => ({
                              ...prev,
                              state: state?.label || "",
                              city: "",
                            }));
                          }}
                          name="state"
                          placeholder="Select State..."
                          styles={customSelectStyles}
                          className="react-select-container"
                          classNamePrefix="react-select"
                          inputId="state"
                          isClearable
                        />
                      </div>
                      <div className="input-single">
                        <label className="label">City</label>
                        <Select
                          options={
                            selectedState
                              ? City.getCitiesOfState("IN", selectedState.value).map((city) => ({
                                  label: city.name,
                                  value: city.name,
                                }))
                              : []
                          }
                          value={selectedCity}
                          onChange={(city) => {
                            setSelectedCity(city);
                            setFormData((prev) => ({
                              ...prev,
                              city: city?.label || "",
                            }));
                          }}
                          name="city"
                          placeholder="Select City..."
                          styles={customSelectStyles}
                          className="react-select-container"
                          classNamePrefix="react-select"
                          inputId="city"
                          isDisabled={!selectedState}
                          isClearable
                        />
                      </div>
                    </div>
                  </FadeTop>

                  <FadeDown>
                    <div className="input-single">
                      <label className="label">Loan Type</label>
                      <Select
                        options={loanOptions}
                        value={selectedLoanType}
                        onChange={(option) => {
                          setSelectedLoanType(option);
                          setFormData((prev) => ({
                            ...prev,
                            loanType: option?.value || "",
                          }));
                        }}
                        name="loanType"
                        placeholder="Select Loan Type..."
                        styles={customSelectStyles}
                        className="react-select-container"
                        classNamePrefix="react-select"
                        inputId="loanType"
                      />
                    </div>
                  </FadeDown>

                  <FadeDown>
                    <div className="input-single">
                      <label className="label" htmlFor="message">
                        Message
                      </label>
                      <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        rows={8}
                        placeholder="Enter Your Message..."
                        required
                        style={{
                          ...inputStyle,
                          padding: "8px",
                          backgroundColor: "#ffffff",
                        }}
                        value={formData.message}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                  </FadeDown>

                  <FadeTop>
                    <div className="mt-3">
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey="YOUR_RECAPTCHA_SITE_KEY"
                        onChange={handleRecaptchaChange}
                        size="normal"
                        hl="en"
                      />
                    </div>
                  </FadeTop>
                </div>
                <FadeTop>
                  <div className="mt_40 cursor-pointer" id="submit">
                    <PrimaryButton
                      text="Send Message"
                      icon={<i className="bi bi-arrow-up-right"></i>}
                      type="submit"
                    />
                  </div>
                </FadeTop>
              </form>
            </div>

            <div className="col-12 col-lg-5 col-xxl-4">
              <div className="more-help">
                <FadeRight>
                  <h3 className="contact__title">Need more help?</h3>
                </FadeRight>
                <div className="more-help__content">
                  <FadeDown>
                    <div className="card card--small">
                      <div className="card--small-icon">
                        <i className="bi bi-telephone"></i>
                      </div>
                      <div className="card--small-content">
                        <h5 className="card--small-title">Call Now</h5>
                        <Link href="tel:+91 8858859911" className="card--small-call">
                          +91 8858859911
                        </Link>
                        <Link href="tel:+91 9373239166" className="card--small-call">
                          +91 9373239166
                        </Link>
                      </div>
                    </div>
                  </FadeDown>

                  <FadeTop>
                    <div className="card card--small">
                      <div className="card--small-icon">
                        <i className="bi bi-envelope-open"></i>
                      </div>
                      <div className="card--small-content">
                        <h5 className="card--small-title">Email Address</h5>
                        <Link href="mailto:loans@finlends.com" className="card--small-call">
                          loans@finlends.com
                        </Link>
                      </div>
                    </div>
                  </FadeTop>

                  <FadeDown>
                    <div className="card card--small">
                      <div className="card--small-icon">
                        <i className="bi bi-geo-alt"></i>
                      </div>
                      <div className="card--small-content">
                        <h5 className="card--small-title">Location</h5>
                        <p>Plot no 7,N B Tower 1st floor,Above Bank of Baroda,Manish Nagar Nagpur.</p>
                      </div>
                    </div>
                  </FadeDown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;