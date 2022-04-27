import {Button, Card, Container, Form} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginRegisterView.css';
import {useState} from "react";
import * as yup from 'yup';
import {Formik, FormikValues} from "formik";
import {register} from "../api/auth";

const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
    repeatPassword: yup.string().required()
});

export default function RegisterView() {

    const [activeButton, setActiveButton] = useState(0)
    const button_Data = [
        {
            "name": "Next",
            "value": "name"
        }
    ]

    const submit = (values: FormikValues): void => {
        register(values.username, values.password)
            .then(user => alert('registered ' + user))
            .catch(err => alert('failed to register: ' + err));
    }

    return (
        <Container>
            <Card className={'register-card p-5 mx-auto'}>
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
                >
                    {({
                          handleSubmit,
                          handleChange,
                          handleBlur,
                          values,
                          touched,
                          isValid,
                          errors,
                      }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className={'mb-3'}>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    name={'username'}
                                    type={'text'}
                                    placeholder={'Name'}
                                    value={values.username}
                                    onChange={handleChange}/>
                            </Form.Group>
                            <Form.Group className={'mb-3'}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    name={'password'}
                                    type={'password'}
                                    placeholder={'Password'}
                                    value={values.password}
                                    onChange={handleChange}/>
                            </Form.Group>
                            <Form.Group className={'mb-4'}>
                                <Form.Label>Repeat password</Form.Label>
                                <Form.Control
                                    name={'repeatPassword'}
                                    type={'password'}
                                    placeholder={'Repeat password'}
                                    value={values.repeatPassword}
                                    onChange={handleChange}/>
                            </Form.Group>
                            <Button type={'submit'}>Next</Button>
                        </Form>
                        )}
                </Formik>
            </Card>
        </Container>
    );
}