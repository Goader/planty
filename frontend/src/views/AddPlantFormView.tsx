import {useNavigate} from "react-router-dom";
import {Formik, FormikHelpers} from "formik";
import {InvalidDataError} from "../api/auth/util";
import {Button, Card, Container, Form} from "react-bootstrap";
import * as Yup from "yup";
import {SchemaOf} from "yup";
import {usePlantService} from "../api/plants";
import {AddPlantData} from "../model/plants";

const schema: SchemaOf<AddPlantData> = Yup.object().shape({
    name: Yup.string().defined().required('Name is required'),
    species: Yup.string(),
    watering: Yup.number(),
    insolation: Yup.string(),
    fertilizing: Yup.number()
}).required();

const toBase64 = (file: any): Promise<any> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

function AddPlantFormView() {
    const navigate = useNavigate();
    const {savePlant} = usePlantService();
    const submit = (values: AddPlantData, helpers: FormikHelpers<any>): void => {
        helpers.setSubmitting(true);
        savePlant(values)
            .then(() => navigate('/plants'))
            .catch(err => {
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

    return (
        <Container>
            <Card className={'form-card p-5 mx-auto'}>
                <div className={'center-header'}>
                    <h2>Add a plant</h2>
                </div>
                <Formik
                    validationSchema={schema}
                    onSubmit={submit}
                    initialValues={{
                        name: '',
                        species: '',
                        watering: 1,
                        insolation: '',
                        fertilizing: 1
                    }}
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
                      setFieldValue}) => (
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
                                <Form.Control.Feedback type={'invalid'}>{errors.species}</Form.Control.Feedback></Form.Group>
                                <Form.Group className={'auth-group'}>
                                    <Form.Label>Photo</Form.Label>
                                    <Form.Control
                                        name={'photo'}
                                        type={'file'}
                                        onChange={(event) => {
                                            let target = event.currentTarget as HTMLInputElement;
                                            if (target.files === null) {
                                                setFieldValue('photo', null);
                                            } else {
                                                toBase64(target.files[0])
                                                    .then(value => {
                                                        setFieldValue('photo', value);
                                                    });

                                            }
                                        }}
                                    />
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
                                />
                                <Form.Control.Feedback
                                    type={'invalid'}>{errors.watering}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className={'auth-group'}>
                                <Form.Label>Isolation</Form.Label>
                                <Form.Control
                                    name={'insolation'}
                                    type={'text'}
                                    placeholder={'Insolation'}
                                    value={values.insolation}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.insolation && !!errors.insolation}
                                />
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
                                />
                                <Form.Control.Feedback
                                    type={'invalid'}>{errors.fertilizing}</Form.Control.Feedback>
                            </Form.Group>
                            <Button type={'submit'} className={'mt-3'}
                                    disabled={!isValid || isSubmitting}>Add</Button>
                        </Form>
                    )}
                </Formik>
            </Card>
        </Container>
    );
}

export default AddPlantFormView;