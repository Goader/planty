import {Button, Card, Container, Form} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginRegisterView.css';

export default function RegisterView() {
    return (
        <Container>
            <Card className={'register-card p-5 mx-auto'}>
                <div className={'center-header'}>
                    <h2>Create an account</h2>
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
                    <Form.Group className={'mb-4'}>
                        <Form.Label>Repeat password</Form.Label>
                        <Form.Control type={'password'} placeholder={'Repeat password'}/>
                    </Form.Group>
                </Form>
                <Button variant={'primary'} type={'submit'}>Next</Button>
            </Card>
        </Container>
    );
}