import {useAuth} from "../components/AuthContext";
import {Navigate, useNavigate} from "react-router-dom";
import {Formik, FormikHelpers} from "formik";
import {handleUnauthorized} from "../api/auth";
import {Button, Card, Container, Form} from "react-bootstrap";
import * as Yup from "yup";
import {createPlantsPostRequestConfig} from "../api/plants";
import {AxiosError} from "axios";

const schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    species: Yup.string(),
    watering: Yup.number(),
    insolation: Yup.string(),
    fertilizing: Yup.number()
});

function AddPlantFormView() {
    const {user, request} = useAuth();
    const navigate = useNavigate();
    const submit = (values: any, helpers: FormikHelpers<any>): void => {
        helpers.setSubmitting(true);
        request(createPlantsPostRequestConfig(values))
            .then(() => navigate('/'))
            .catch(err => handleUnauthorized(err, () => navigate('/login')))
            .catch(err => {
                if (err instanceof AxiosError && err.response?.status === 400) {
                    for (const field in err.response.data) {
                        helpers.setFieldError(field, err.response.data[field][0]);
                    }
                } else {
                    alert('Unexpected error');
                    console.log(err);
                }
            })
            .finally(() => helpers.setSubmitting(false));
    };
    return (
        <Container>
            {user === null ? <Navigate to={'/login'}/>
                : <Card className={'form-card p-5 mx-auto'}>
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
                                    <Form.Label>Watering</Form.Label>
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
                </Card>}
        </Container>
    );
}

export default AddPlantFormView;