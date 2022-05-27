import {Link} from "react-router-dom";
import {Button, Card, Container, Form} from "react-bootstrap";
import {Formik, FormikHelpers} from "formik";
import {useEffect, useState} from "react";
import {useSettingsService} from "../api/settings";
import {AccountSettings} from "../model/settings";

function AccountSettingsForm() {

    const {getSettings, saveSettings} = useSettingsService();
    const [initialValues, setInitialValues] = useState<AccountSettings | null>(null);

    const submitHandler = (values: any, helpers: FormikHelpers<any>): void => {
        console.log("elo");
        saveSettings(values).then(() => {
            helpers.setSubmitting(false);
        });
    };

    useEffect(() => {
        getSettings().then((settings) => {
            setInitialValues(settings);
        });
    }, [getSettings]);

    return (
        <Container>
            {initialValues !== null && <Card className={'form-card p-5 mx-auto'}>
                <div className={'center-header'}>
                    <h3>Your options:</h3>
                </div>
                <Formik
                    onSubmit={submitHandler}
                    initialValues={initialValues}
                    validateOnBlur={false}
                >
                    {({
                          handleSubmit,
                          handleChange,
                          values,
                          isValid,
                          isSubmitting
                      }) => (
                        <Form onSubmit={handleSubmit} noValidate>
                            <Form.Group className={'auth-group'}>
                                <Form.Check
                                    name="accountNotifications"
                                    type="switch"
                                    id="custom-switch"
                                    label="Account notifications"
                                    defaultValue={'on'}
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
                                    defaultValue={'on'}
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
                                    disabled={!isValid || isSubmitting}>Save</Button>

                            <Link to={'#'}><Button type={'submit'} className={'mt-3'}
                                                   disabled={!isValid || isSubmitting}>My instructions</Button></Link>
                            <Link to={'#'}><Button type={'submit'} className={'mt-3'}
                                                   disabled={!isValid || isSubmitting}>Back to garden</Button></Link>
                            <Link to={'#'}><Button type={'submit'} className={'mt-3'}
                                                   disabled={!isValid || isSubmitting}>Sing out</Button></Link>

                        </Form>
                    )}
                </Formik>
            </Card>}
        </Container>
    );
}

export default AccountSettingsForm;