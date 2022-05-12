import {useNavigate} from "react-router-dom";
import {Button, Card, Container, Form} from "react-bootstrap";
import {Formik, FormikHelpers} from "formik";
import {handleUnauthorized} from "../api/auth";
import {AxiosError} from "axios";
import {useEffect, useState} from "react";
import {useSettingsService} from "../api/settings";
import {AccountSettings} from "../model/settings";

function AccountSettingsForm() {
    const navigate = useNavigate();

    const [settings, setSettings] = useState<AccountSettings | null>(null);
    const {getSettings} = useSettingsService();

    const handleChanges = (values: any, helpers: FormikHelpers<any>): void => {
        helpers.setSubmitting(true);
        getSettings()
            .then(() => {
            })
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
            });
    };

    useEffect(() => {
        getSettings().then((settings) => {
            setSettings(settings);
        });
    }, []);

    return (
        <Container>
            <Card className={'form-card p-5 mx-auto'}>
                <div className={'center-header'}>
                    <h3>Your options:</h3>
                </div>
                <Formik
                    onChange={handleChanges}
                    onSubmit={() => {
                    }}
                    initialValues={{
                        accountNotifications: settings ? settings.accountNotifications : true,
                        waterNotifications: settings ? settings.waterNotifications : true,
                        forumNotifications: settings ? settings.forumNotifications : true
                    }}
                    validateOnBlur={false}
                >
                    {({
                          handleChange,
                          values,
                          isValid,
                          isSubmitting
                      }) => (
                        <Form onSubmit={() => {
                        }} noValidate>
                            <Form.Group className={'auth-group'}>
                                <Form.Check
                                    name="accountNotifications"
                                    type="switch"
                                    id="custom-switch"
                                    label="Account notifications"
                                    checked={values.accountNotifications}
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type={'invalid'}>Error</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className={'auth-group'}>
                                <Form.Check
                                    name="waterNotifications"
                                    type="switch"
                                    id="custom-switch"
                                    label="Water notifications"
                                    checked={values.waterNotifications}
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type={'invalid'}>Error</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className={'auth-group'}>
                                <Form.Check
                                    name="forumNotifications"
                                    type="switch"
                                    id="custom-switch"
                                    label="Forum notifications"
                                    checked={values.forumNotifications}
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type={'invalid'}>Error</Form.Control.Feedback>
                            </Form.Group>
                            <Button type={'submit'} className={'mt-3'}
                                    disabled={!isValid || isSubmitting}>My instructions</Button>
                            <Button type={'submit'} className={'mt-3'}
                                    disabled={!isValid || isSubmitting}>Back to garden</Button>
                            <Button type={'submit'} className={'mt-3'}
                                    disabled={!isValid || isSubmitting}>Sing out</Button>
                        </Form>
                    )}
                </Formik>
            </Card>
        </Container>
    );
}

export default AccountSettingsForm;