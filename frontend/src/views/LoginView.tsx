import {Button, Card, Container, Form} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginRegisterView.css';
import {Formik, FormikHelpers} from "formik";
import * as Yup from "yup";
import {useAuth} from "../components/AuthContext";
import {Link, Navigate, useNavigate} from "react-router-dom";

const schema = Yup.object().shape({
    username: Yup.string().required('Name is required'),
    password: Yup.string().required('Password is required')
});

export default function LoginView() {
    const {user, login} = useAuth();
    const navigate = useNavigate();
    const submit = (values: any, helpers: FormikHelpers<any>): void => {
        helpers.setSubmitting(true);
        login(values.username, values.password)
            .then(() => navigate('/', {replace: true}))
            .catch(err => {
                console.log('error during login', err);
                helpers.setFieldError('username', 'Invalid credentials');
            })
            .finally(() => helpers.setSubmitting(false));
    };

    return (
        <Container>
            {user != null ? <Navigate to={'/'}/> :
                <Card className={'register-card p-5 mx-auto'}>
                    <div className={'center-header'}>
                        <h2>Sign in</h2>
                    </div>
                    <Formik
                        validationSchema={schema}
                        onSubmit={submit}
                        initialValues={{
                            username: '',
                            password: ''
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
                                <Button type={'submit'} className={'mt-3'}
                                        disabled={!isValid || isSubmitting}>Next</Button>
                            </Form>
                        )}
                    </Formik>
                    <div>
                        <p>Don't have an account? <Link to={'/register'}>Sign up</Link></p>
                    </div>
                </Card>}
        </Container>
    );
}
