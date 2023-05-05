import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { allCountryOptions } from "../allCountryOptions";
import { BsArrowLeft } from "react-icons/bs";
import "./step1.scss";

console.log("this is my list for all the countries");

const weightUnits = ["-- Select Weight Unit --", "kg", "lbs"];
const heightUnits = ["centimeters (cm)", "feet (ft) + inches (in)"];

const step1ValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters long")
    .max(20, "Name must be at most 20 characters long")
    .matches(/^[^\s]+(\s+[^\s]+)*$/, "Name cannot contain only spaces")
    .required("Name is required"),
  dob: Yup.date()
    .max(new Date(), "DOB cannot be a future date")
    .required("DOB is required"),
  bornInWeek: Yup.number()
    .min(20, "Must be greater than or equal to 20")
    .max(36, "Must be less than or equal to 36")
    .when("isBorn", {
      is: true,
      then: Yup.number().required("Required"),
    }),
  isBorn: Yup.boolean(),
  childWeight: Yup.number().notRequired(),
  weightUnit: Yup.string().oneOf(weightUnits).notRequired(),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number is not valid")
    .required("Phone number is required"),
});

const Step1 = ({ data, onNext }) => {
  // * here I will create submit button
  const handleSubmit = (values) => {
    onNext(values);
  };

  console.log("step1 data:", data);

  return (
    <div className="outer-container">
      <div className="inner-container">
        <div className="sub-container">
          <Formik
            initialValues={data}
            validationSchema={step1ValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form>
                <div className="back-btn-container">
                  <span className="back-btn-arrow">
                    {<BsArrowLeft size={18} />}
                  </span>
                  <span className="back-btn-name">Back</span>
                </div>
                {/* */}
                <div className="current-section-status">
                  <p className="item"></p>
                  <p className="item"></p>
                  <p className="item"></p>
                  <p className="item"></p>
                </div>

                <div className="text-desc">
                  <h4>
                    Get Your Questions answered by our consultants from the
                    comfort of your home
                  </h4>
                </div>

                <div className="name-container">
                  <span className="name-label">
                    <label htmlFor="name">Child's name</label>
                  </span>
                  <Field
                    className="name-field"
                    placeholder=" Alice"
                    type="text"
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage name="name" component="div" className="error" />
                </div>
                {/* DOB CONTAINER */}
                <div className="dob-container">
                  <span className="dob-label">
                    <label htmlFor="dob">Child's date of birth</label>
                  </span>
                  <Field
                    className="dob-field"
                    placeholder="may 5 2023"
                    type="date"
                    id="dob"
                    name="dob"
                    value={values.dob}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage name="dob" component="div" className="error" />
                </div>
                {/* CODE FOR RADIO CONDITION */}

                <div className="radio-container">
                  <span className="radio-name">
                    Born at less then 37 weeks?
                  </span>
                  <label className="radio-field">
                    <Field
                      type="checkbox"
                      className="radio-field"
                      name="isBornInWeek"
                    />
                  </label>
                  {errors.isBornInWeek && touched.isBornInWeek && (
                    <div>{errors.isBornInWeek}</div>
                  )}
                </div>
                {values.isBornInWeek && (
                  <div className="born-container">
                    <div className="born-label">Born in weeks:</div>
                    <div className="born-field">
                      <Field
                        type="number"
                        // style="width:100%"
                        name="bornInWeek"
                        placeholder="25"
                      />
                    </div>
                    <ErrorMessage
                      name="bornInWeek"
                      component="div"
                      className="error"
                    />
                    {/* {errors.bornInWeek && touched.bornInWeek && (
                      <div>{errors.bornInWeek}</div>
                    )} */}
                  </div>
                )}

                {/*  CHILD AND ITS WEIGHT CATEGORY */}

                <div className="child-container">
                  <div className="child-weight-sub-class">
                    <div className="weight-headline">
                      <label htmlFor="childWeight">Child Weight :</label>
                    </div>
                    <div className="weight-input">
                      <Field
                        id="childWeight"
                        name="childWeight"
                        type="number"
                      />
                      <ErrorMessage name="childWeight" />
                    </div>
                  </div>

                  <div className="child-weight-sub-class">
                    <div className="weight-headline">
                      <label htmlFor="weightUnit">Weight Unit</label>
                    </div>
                    <div className="weight-input">
                      <Field as="select" id="weightUnit" name="weightUnit">
                        <option value="">-- Select Weight Unit --</option>
                        <div weight-unit-input>
                          {weightUnits.map((unit) => (
                            <option key={unit} value={unit}>
                              {unit}
                            </option>
                          ))}
                        </div>
                      </Field>
                      <ErrorMessage name="weightUnit fill correctly" />
                    </div>
                  </div>
                </div>

                {/* here I will create Child Height */}
                <label htmlFor="childWeight">Child Height</label>
                <div>
                  <Field id="childHeight" name="childHeight" type="number" />
                  <ErrorMessage name="childWeight" />
                </div>

                <label htmlFor="heightUnit">Height Unit</label>
                <div>
                  <Field as="select" id="heightUnit" name="heightUnit">
                    <option value="">-- Select Height Unit --</option>
                    {heightUnits.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="heightUnit" />
                </div>

                {/* EMAIL SECTION  */}
                <div>
                  <label htmlFor="email">Email</label>
                  <Field type="email" name="email" />
                  <ErrorMessage name="email" />
                </div>

                {/* PHONE NUMBER SECTION */}

                <div>
                  <label htmlFor="countryCode">Country Code</label>
                  <Field name="countryCode" as="select">
                    <option value="">---Select country code---</option>
                    {allCountryOptions.map((country) => {
                      return (
                        <option value={country.label} key={country.value}>
                          {`${country.label} ( ${country.value} ) `}
                        </option>
                      );
                    })}
                  </Field>
                  <ErrorMessage name="countryCode" />
                </div>
                <div>
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <Field type="tel" name="phoneNumber" />
                  <ErrorMessage name="phoneNumber" />
                </div>

                <button type="submit">Next</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Step1;
