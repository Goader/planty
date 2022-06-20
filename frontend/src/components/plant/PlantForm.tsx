import {Button, Form} from "react-bootstrap";
import {Formik, FormikHelpers} from "formik";
import {BaseInstruction} from "../../model/instructions";
import * as Yup from "yup";
import {SchemaOf} from "yup";
import {PlantFormData} from "../../model/plants";

const schema: SchemaOf<PlantFormData> = Yup.object().shape({
    name: Yup.string().defined().required('Name is required'),
    species: Yup.string(),
    photo: Yup.string(),
    instruction: Yup.string()
}).required();

const toBase64 = (file: any): Promise<any> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

type PlantFormProps = {
    onSubmit: (data: BaseInstruction, helpers: FormikHelpers<BaseInstruction>) => void,
    initialValues: BaseInstruction,
    allowPhoto: boolean
}

export default function PlantForm(props: PlantFormProps) {
    return (
        <Formik
            validationSchema={schema}
            onSubmit={props.onSubmit}
            initialValues={{
                name: '',
                species: '',
                watering: 1,
                insolation: '',
                fertilizing: 1
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
                  isSubmitting,
                  setFieldValue
              }) => (
                <Form onSubmit={handleSubmit} noValidate>
                    <Form.Group className={'auth-group'}>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            name={'name'}
                            type={'text'}
                            placeholder={'Name'}
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.name && !!errors.name}
                        />
                        <Form.Control.Feedback type={'invalid'}>{errors.name}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className={'auth-group'}>
                        <Form.Label>Species</Form.Label>
                        <Form.Control
                            name={'species'}
                            type={'text'}
                            placeholder={'Species'}
                            value={values.species}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.species && !!errors.species}
                        />
                        <Form.Control.Feedback type={'invalid'}>{errors.species}</Form.Control.Feedback></Form.Group>
                    {props.allowPhoto && <Form.Group className={'auth-group'}>
                        <Form.Label>Photo</Form.Label>
                        <Form.Control
                            name={'photo'}
                            type={'file'}
                            onChange={(event) => {
                                let target = event.currentTarget as HTMLInputElement;
                                if (target.files === null) {
                                    setFieldValue('photo', null);
                                } else {
                                    toBase64(target.files[0])
                                        .then(value => {
                                            setFieldValue('photo', value);
                                        });

                                }
                            }}
                        />
                    </Form.Group>}
                    <Button type={'submit'} className={'mt-3'}
                            disabled={!isValid || isSubmitting}>Add</Button>
                </Form>
            )}
        </Formik>
    );
}