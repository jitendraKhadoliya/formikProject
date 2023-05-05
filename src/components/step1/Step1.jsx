import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const weightUnits = ["kg", "lbs"];
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
  // isBorn: Yup.boolean(),
  // childWeight: Yup.number().notRequired(),
  // weightUnit: Yup.string().oneOf(weightUnits).notRequired(),
});

const Step1 = ({ data, onNext }) => {
  const [fieldValue, setFieldValue] = useState("");

  // * here I will create submit button
  const handleSubmit = (values) => {
    onNext(values);
  };

  console.log("step1 data:", data);

  return (
    <div>
      <Formik
        initialValues={data}
        validationSchema={step1ValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched }) => (
          <Form>
            <div>
              <label htmlFor="name">Name</label>
              <Field
                type="text"
                id="name"
                name="name"
                // value={values.name}
                // onChange={handleChange}
                // onBlur={handleBlur}
              />
              <ErrorMessage name="name" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="dob">DOB</label>
              <Field
                type="date"
                id="dob"
                name="dob"
                // value={values.dob}

                // onBlur={handleBlur}
              />
              <ErrorMessage name="dob" component="div" className="error" />
            </div>
            {/* CODE FOR RADIO CONDITION */}

            <div>
              <label>
                <Field type="checkbox" name="isBornInWeek" />
                Born in week?
              </label>
              {errors.isBornInWeek && touched.isBornInWeek && (
                <div>{errors.isBornInWeek}</div>
              )}
            </div>
            {values.isBornInWeek && (
              <div>
                <label>
                  Born in week:
                  <Field type="number" name="bornInWeek" />
                </label>
                {errors.bornInWeek && touched.bornInWeek && (
                  <div>{errors.bornInWeek}</div>
                )}
              </div>
            )}

            {/*  CHILD AND ITS WEIGHT CATEGORY */}
            <label htmlFor="childWeight">Child Weight</label>
            <div>
              <Field id="childWeight" name="childWeight" type="number" />
              <ErrorMessage name="childWeight" />
            </div>
            <label htmlFor="weightUnit">Weight Unit</label>
            <div>
              <Field as="select" id="weightUnit" name="weightUnit">
                <option value="">-- Select Weight Unit --</option>
                {weightUnits.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="weightUnit fill correctly" />
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

            <button type="submit">Next</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Step1;
