import {Button, Card, Container, Form} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './FormView.scss';
import * as Yup from 'yup';
import {Formik, FormikHelpers} from "formik";
import {useAuth} from "../api/auth/AuthContext";
import {Navigate, useNavigate} from "react-router-dom";
import {RegisterInputError} from "../api/auth/util";

const schema = Yup.object().shape({
    username: Yup.string().required('Name is required'),
    password: Yup.string().required('Password is required'),
    repeatPassword: Yup.string().required('You must confirm the password').oneOf([Yup.ref('password')], 'Passwords must match')
});

export default function RegisterView() {
    const {user, register} = useAuth();
    const navigate = useNavigate();
    const submit = (values: any, helpers: FormikHelpers<any>): void => {
        helpers.setSubmitting(true);
        register(values.username, values.password)
            .then(() => navigate('/', {replace: true}))
            .catch(err => {
                if (err instanceof RegisterInputError) {
                    for (const field in err.errors) {
                        helpers.setFieldError(field, err.errors[field][0]);
                    }
                } else {
                    alert('failed to register: ' + err);
                }
            })
            .finally(() => helpers.setSubmitting(false));
    };
    return (
        <Container>
            {user != null ? <Navigate to={'/'}/>
                : <Card className={'form-card p-5 mx-auto'}>
                    <div className={'center-header'}>
                        <h2>Create an account</h2>
                    </div>
                    <Formik
                        validationSchema={schema}
                        onSubmit={submit}
                        initialValues={{
                            username: '',
                            password: '',
                            repeatPassword: ''
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
                                        name={'username'}
                                        type={'text'}
                                        placeholder={'Name'}
                                        value={values.username}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.username && !!errors.username}
                                    />
                                    <Form.Control.Feedback type={'invalid'}>{errors.username}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className={'auth-group'}>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        name={'password'}
                                        type={'password'}
                                        placeholder={'Password'}
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.password && !!errors.password}
                                    />
                                    <Form.Control.Feedback type={'invalid'}>{errors.password}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className={'auth-group'}>
                                    <Form.Label>Repeat password</Form.Label>
                                    <Form.Control
                                        name={'repeatPassword'}
                                        type={'password'}
                                        placeholder={'Repeat password'}
                                        value={values.repeatPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.repeatPassword && !!errors.repeatPassword}
                                    />
                                    <Form.Control.Feedback
                                        type={'invalid'}>{errors.repeatPassword}</Form.Control.Feedback>
                                </Form.Group>
                                <Button type={'submit'} className={'mt-3'}
                                        disabled={!isValid || isSubmitting}>Next</Button>
                            </Form>
                        )}
                    </Formik>
                </Card>}
        </Container>
    );
}