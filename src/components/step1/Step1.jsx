import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// ! this is old one
// const step1ValidationSchema = Yup.object().shape({
//   first_name: Yup.string()
//     .min(3, "Name must be at least 3 characters")
//     .max(20, "Name must be at most 20 characters")
//     .matches(/^[a-zA-Z ]*$/, "Only letters and spaces are allowed")
//     .required("Name is required"),
//   dob: Yup.date()
//     .max(new Date(), "DOB cannot be a future date")
//     .required("DOB is required"),
//   // bornInWeek: Yup.number().when("isBornPrematurely", {
//   //   is: true,
//   //   then: Yup.number()
//   //     .required("Born in week is required")
//   //     .min(20, "Born in week must be at least 20 weeks")
//   //     .max(36, "Born in week must be at most 36 weeks"),
//   //   otherwise: Yup.number(),
//   // }),
// });

const step1ValidationSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(3, "Name must be at least 3 characters long")
    .max(20, "Name must be at most 20 characters long")
    .matches(/^[^\s]+(\s+[^\s]+)*$/, "Name cannot contain only spaces")
    .required("Name is required"),
  dob: Yup.date()
    .max(new Date(), "DOB cannot be a future date")
    .required("DOB is required"),
  bornInWeek: Yup.number().when("isBornInWeek", {
    is: true,
    then: Yup.number()
      .required("Born in week is required")
      .min(20, "Born in week must be at least 20")
      .max(36, "Born in week must be at most 36"),
  }),
  isBornInWeek: Yup.boolean(),
  childWeight: Yup.number().optional(),
  childHeight: Yup.number().optional(),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^\+?\d{10,12}$/, "Invalid phone number")
    .required("Phone is required"),
});

const Step1 = ({ data, onNext }) => {
  // const [isBornPrematurely, setIsBornPrematurely] = useState(false);

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
        {() => (
          <Form>
            <div>
              <label htmlFor="name">Name</label>
              <Field
                type="text"
                id="first_name"
                name="first_name"
                // value={values.name}
                // onChange={handleChange}
                // onBlur={handleBlur}
              />
              <ErrorMessage
                name="first_name"
                component="div"
                className="error"
              />
            </div>

            <div>
              <label htmlFor="dob">DOB</label>
              <Field
                type="date"
                id="dob"
                name="dob"
                // value={values.dob}
                // onChange={handleChange}
                // onBlur={handleBlur}
              />
              <ErrorMessage name="dob" component="div" className="error" />
            </div>

            <button type="submit">Next</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Step1;
