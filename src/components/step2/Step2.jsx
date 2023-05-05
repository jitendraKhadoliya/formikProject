import React from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";

const Step2 = ({ onNext, data, prev }) => {
  // * here I will create submit button
  const handleSubmit = (values) => {
    onNext(values, true);
  };

  console.log("step2 data:", data);

  return (
    <div>
      <Formik
        initialValues={data}
        // validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form>
            <div>
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                id="name"
                name="email"
                // value={values.name}
                // onChange={handleChange}
                // onBlur={handleBlur}
              />
              <ErrorMessage name="name" component="div" className="error" />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                id="password"
                name="password"
                // value={values.dob}
                // onChange={handleChange}
                // onBlur={handleBlur}
              />
              <ErrorMessage name="dob" component="div" className="error" />
            </div>

            <button type="button" onClick={() => prev(values)}>
              Back
            </button>
            <button type="submit">Next</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Step2;
