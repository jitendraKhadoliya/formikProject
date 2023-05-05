import React, { useState } from "react";
import Step1 from "../step1/Step1";
import Step2 from "../step2/Step2";
import Step3 from "../step3/Step3";
import Step4 from "../step4/Step4";

const CardForm = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    dob: "",
    bornInWeek: "",
    isBornInWeek: false,
    childWeight: "",
    weightUnit: "",
    childHeight: "",
    heightUnit: "",
    countryCode: "",
    phoneNumber: "",
  });

  const [currentStep, setCurrentStep] = useState(1);

  const makeRequest = (formData) => {
    console.log("Form submitted ", formData);
  };

  const handleNextStep = (newData, final = false) => {
    setData((prev) => ({ ...prev, ...newData }));

    if (final) {
      makeRequest(newData);
    }
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 onNext={handleNextStep} data={data} />;
      case 2:
        return (
          <Step2 onNext={handleNextStep} prev={handlePrevStep} data={data} />
        );
      case 3:
        return (
          <Step3 onNext={handleNextStep} prev={handlePrevStep} data={data} />
        );
      case 4:
        return (
          <Step4 onNext={handleNextStep} prev={handlePrevStep} data={data} />
        );
      default:
        return null;
    }
  };
  console.log("data", data);

  return (
    <div className="card-form">
      {/* <div className="progress-bar">
        <div className={`step ${step === 1 ? "active" : ""}`}>
          <span>1</span>
        </div>
        <div className={`step ${step === 2 ? "active" : ""}`}>
          <span>2</span>
        </div>
        <div className={`step ${step === 3 ? "active" : ""}`}>
          <span>3</span>
        </div>
        <div className={`step ${step === 4 ? "active" : ""}`}>
          <span>4</span>
        </div>
      </div> */}
      {renderStep()}
    </div>
  );
};

export default CardForm;
