import {Button, Card, Container, Form} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginRegisterView.css';
import { Formik } from "formik";

export default function LoginView() {

    return (
        <Container>
            <Card className={'register-card p-5 mx-auto'}>
                <div className={'center-header'}>
                    <h2>Sign in</h2>
                </div>
                <Form>
                    <Form.Group className={'mb-3'}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type={'email'} placeholder={'Email'}/>
                    </Form.Group>
                    <Form.Group className={'mb-3'}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type={'password'} placeholder={'Password'}/>
                    </Form.Group>
                        <Button variant="primary" type="submit" className={'login-view-button'}>
                            Next
                        </Button>
                    </Form>
                <div>
                    <p>Don't have an account? <a href={'#'}>Sign up</a></p>
                </div>
            </Card>
        </Container>
    );
}