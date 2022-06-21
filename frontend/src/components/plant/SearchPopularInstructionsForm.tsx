import {Instruction} from "../../model/instructions";
import {useInstructionsService} from "../../api/instructions";
import React from "react";
import {Button, Form} from "react-bootstrap";
import {Formik, FormikHelpers} from "formik";
import * as Yup from "yup";
import {SchemaOf} from "yup";
import {InvalidDataError} from "../../api/auth/util";

type SearchInstructionsProps = {
    onSearch: (foundInstructions: Instruction[]) => void;
    initialSpecies: string
}

type SearchInstructionsData = {
    species: string
}

const schema: SchemaOf<SearchInstructionsData> = Yup.object().shape({
    species: Yup.string().required('Species is required'),
}).required();

export default function SearchPopularInstructionsForm(props: SearchInstructionsProps) {
    const {getPopularInstructions} = useInstructionsService();

    const submit = (data: SearchInstructionsData, helpers: FormikHelpers<SearchInstructionsData>) => {
        getPopularInstructions(data.species)
            .then(instructions => props.onSearch(instructions))
            .catch(err => {
                if (err instanceof InvalidDataError) {
                    for (const field in err.data) {
                        helpers.setFieldError(field, err.data[field][0]);
                    }
                } else {
                    throw err;
                }
            })
            .finally(() => helpers.setSubmitting(false));
    };

    return (
        <Formik
            validationSchema={schema}
            onSubmit={submit}
            initialValues={{
                species: props.initialSpecies
            }}
            validateOnBlur={false}
        >
            {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  errors,
                  isSubmitting,
                  touched
              }) => (
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <div className={'d-flex align-items-start'}>
                            <div className={'flex-grow-1 me-3'}>
                                <Form.Control
                                    name={'species'}
                                    type={'text'}
                                    placeholder={'Search by species'}
                                    value={values.species}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched && !!errors.species}
                                />
                                <Form.Control.Feedback type={'invalid'}>{errors.species}</Form.Control.Feedback>
                            </div>
                            <Button type={'submit'} disabled={isSubmitting}>Search</Button>
                        </div>
                    </Form.Group>
                </Form>
            )}
        </Formik>
    );
}