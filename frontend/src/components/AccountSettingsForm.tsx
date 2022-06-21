import {useNavigate} from "react-router-dom";
import {Button, Form, Spinner} from "react-bootstrap";
import {Formik, FormikHelpers} from "formik";
import React, {useEffect, useState} from "react";
import {useSettingsService} from "../api/settings";
import {AccountSettings} from "../model/settings";

function AccountSettingsForm() {
    const navigate = useNavigate();
    const {getSettings, saveSettings} = useSettingsService();
    const [initialValues, setInitialValues] = useState<AccountSettings | null>(null);

    const submitHandler = (values: any, helpers: FormikHelpers<any>): void => {
        saveSettings(values).then(() => {
            helpers.setSubmitting(false);
        });
    };

    useEffect(() => {
        getSettings().then((settings) => {
            setInitialValues(settings);
        });
    }, [getSettings]);

    return (initialValues === null ? <Spinner animation={'grow'} variant={'success'}/> : <Formik
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

                            <div className={'d-flex'}>
                                <Button type={'submit'} className={'me-3'}
                                        disabled={!isValid || isSubmitting}>Save</Button>
                                <Button onClick={() => navigate(-1)}>Back</Button>
                            </div>
                        </Form>
        )}
    </Formik>);
}

export default AccountSettingsForm;