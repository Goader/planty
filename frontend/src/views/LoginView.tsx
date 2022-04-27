import {Button, Card, Container, Form} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginRegisterView.css';
import {useState} from "react";

export default function LoginView() {

    const [activeButton, setActiveButton] = useState(0);
    const button_Data = [
        {
            "name": "Next",
            "value": "name"
        }
    ];

    return (
        <Container>
            <Card className={'register-card p-5 mx-auto'}>
                <div className={'center-header'}>
                    <h2>Sign in</h2>
                </div>
                <Form>
                    <Form.Group className={'mb-3 margin-top'}>
                        <Form.Label className={'labels'}>Email</Form.Label>
                        <Form.Control type={'email'} placeholder={'Email'}/>
                    </Form.Group>
                    <Form.Group className={'mb-3 margin-top'}>
                        <Form.Label className={'labels'}>Password</Form.Label>
                        <Form.Control type={'password'} placeholder={'Password'}/>
                    </Form.Group>
                </Form>
                    {button_Data.map((item, index) => (
                        <Button
                            className={`btn ${activeButton === index ? 'btn-success' : null}`}
                            value={item.value}
                            onClick={ () => setActiveButton(index) }
                        >
                            {item.name}
                        </Button>
                    ))}
                <div>
                    <p>Don't have an account? <a href={'#'}>Sign up</a></p>
                </div>
            </Card>
        </Container>
    );
}
