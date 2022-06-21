import {Button, Form} from "react-bootstrap";
import {Formik, FormikHelpers} from "formik";
import * as Yup from "yup";
import {SchemaOf} from "yup";
import {PlantFormData} from "../../model/plants";
import {BaseInstruction} from "../../model/instructions";

const schema: SchemaOf<PlantFormData> = Yup.object().shape({
    name: Yup.string().defined().required('Name is required'),
    species: Yup.string().required(),
    watering: Yup.number().required(),
    insolation: Yup.string().required(),
    fertilizing: Yup.number().required()
}).required();

type InstructionFormProps = {
    onSubmit: (data: BaseInstruction, helpers: FormikHelpers<BaseInstruction>) => void,
    initialValues: BaseInstruction
}

const selectableInsolation = [
    'None',
    'Low',
    'High',
    'Very high',
];

export default function InstructionForm(props: InstructionFormProps) {
    return (<Formik
        validationSchema={schema}
        onSubmit={props.onSubmit}
        initialValues={props.initialValues}
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
              isSubmitting
          }) => (
            <Form onSubmit={handleSubmit} noValidate>
                <Form.Group className={'auth-group'}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        name={'name'}
                        type={'text'}
                        placeholder={'Name'}
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.name && !!errors.name}
                    />
                    <Form.Control.Feedback type={'invalid'}>{errors.name}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className={'auth-group'}>
                    <Form.Label>Species</Form.Label>
                    <Form.Control
                        name={'species'}
                        type={'text'}
                        placeholder={'Species'}
                        value={values.species}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.species && !!errors.species}
                    />
                    <Form.Control.Feedback type={'invalid'}>{errors.species}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className={'auth-group'}>
                    <Form.Label>Watering</Form.Label>
                    <Form.Control
                        name={'watering'}
                        type={'number'}
                        placeholder={'Watering'}
                        value={values.watering}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.watering && !!errors.watering}
                        min={1}
                    />
                    <Form.Control.Feedback
                        type={'invalid'}>{errors.watering}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className={'auth-group'}>
                    <Form.Label>Isolation</Form.Label>
                    <Form.Select
                        name={'insolation'}
                        value={values.insolation}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.insolation && !!errors.insolation}>
                        {selectableInsolation.map(value => (
                            <option value={value} key={value}>{value}</option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type={'invalid'}>{errors.insolation}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className={'auth-group'}>
                    <Form.Label>Fertilizing</Form.Label>
                    <Form.Control
                        name={'fertilizing'}
                        type={'number'}
                        placeholder={'Fertilizing'}
                        value={values.fertilizing}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.fertilizing && !!errors.fertilizing}
                        min={1}
                    />
                    <Form.Control.Feedback
                        type={'invalid'}>{errors.fertilizing}</Form.Control.Feedback>
                </Form.Group>
                <Button type={'submit'} className={'mt-3'}
                        disabled={!isValid || isSubmitting}>Submit</Button>
            </Form>
        )}
    </Formik>);
}