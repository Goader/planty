import { Button, Form } from "react-bootstrap";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { SchemaOf } from "yup";
import { PlantFormData } from "../../model/plants";
import { CustomEventFormInfo } from "../../model/calendar";
import { useEventService } from "../../api/calendar";
import { InvalidDataError } from "../../api/auth/util";
import { useState, useEffect } from "react";
import { usePlantService } from "../../api/plants";
import { UnauthorizedError } from "../../api/auth/util";
import { Plant } from "../../model/plants";
import { Spinner } from "react-bootstrap";

// import DatePicker from "react-bootstrap-date-picker";

const schema: SchemaOf<PlantFormData> = Yup.object()
  .shape({
    // New Code below
    name: Yup.string().defined().required("Name is required"),
    type: Yup.string().required("Provide valid type of event"),
    date: Yup.date().required(),
    description: Yup.string(),
  })
  .required();

type CustomEventFormProps = {
  onAdd: (data: CustomEventFormInfo) => void;
};

export default function CustomEventForm(props: CustomEventFormProps) {
  const [plants, setPlants] = useState<Array<Plant>>([]);
  const { getPlants, deletePlant } = usePlantService();
  const [fetching, setFetching] = useState(true);

  const { saveCustomEvent } = useEventService();

  const submit = (
    data: CustomEventFormInfo,
    helpers: FormikHelpers<CustomEventFormInfo>
  ) => {
    helpers.setSubmitting(true);
    saveCustomEvent(data)
      .then(() => props.onAdd(data))
      .catch((err) => {
        if (err instanceof InvalidDataError) {
          for (const field in err.data) {
            helpers.setFieldError(field, err.data[field][0]);
          }
        } else {
          throw err;
        }
      })
      .finally(() => helpers.setSubmitting(false));
  };

  useEffect(() => {
    getPlants()
      .then((plants) => setPlants(plants))
      .catch((err) => {
        if (err instanceof UnauthorizedError) {
          console.error("GardenView: Unauthorized");
        } else {
          alert("Unexpected error");
          console.error("Unexpected error", err);
        }
      })
      .finally(() => setFetching(false));
  }, [getPlants]);

  return fetching ? (
    <Spinner animation={"grow"} variant={"success"} />
  ) : (
    <Formik
      validationSchema={schema}
      onSubmit={props.onAdd}
      initialValues={{ name: "", plant: "", description: "", date: new Date() }} // TODO: new Date()
      validateOnBlur={false}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
        isSubmitting,
      }) => (
        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group className={"auth-group"}>
            <Form.Label>Plant</Form.Label>
            <Form.Select
              name={"plant"}
              value={values.plant}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.plant && !!errors.plant}
            >
              {plants.map((plant) => (
                <option value={plant.name} key={plant.name}>
                  {plant.name}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type={"invalid"}>
              {errors.plant}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className={"auth-group"}>
            <Form.Label>Type of event</Form.Label>
            <Form.Control
              name={"name"}
              type={"text"}
              placeholder={"Provide custom event type"}
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.name && !!errors.name}
            />
            <Form.Control.Feedback type={"invalid"}>
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className={"auth-group"}>
            <Form.Label>Date</Form.Label>
            <Form.Control
              name={"date"}
              type={"date"}
              placeholder={"Provide date"}
              value={values.date.toString()}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.date && !!errors.date}
              min={1}
            />
            <Form.Control.Feedback type={"invalid"}>
              {errors.date}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className={"auth-group"}>
            <Form.Label>Description</Form.Label>
            <Form.Control
              name={"description"}
              type={"text"}
              placeholder={"Description (optional)"}
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.description && !!errors.description}
            />
            <Form.Control.Feedback type={"invalid"}>
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            type={"submit"}
            className={"mt-3"}
            disabled={!isValid || isSubmitting}
          >
            Save event
          </Button>
        </Form>
      )}
    </Formik>
  );
}
