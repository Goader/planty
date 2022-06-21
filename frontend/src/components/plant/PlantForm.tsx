import {Button, Col, Form, Row} from "react-bootstrap";
import {Formik, FormikHelpers} from "formik";
import {Instruction} from "../../model/instructions";
import * as Yup from "yup";
import {SchemaOf} from "yup";
import {PlantFormData} from "../../model/plants";
import React, {useState} from "react";
import InstructionSelect from "./InstructionSelect";
import InstructionPreview from "./InstructionPreview";

const schema: SchemaOf<PlantFormData> = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    species: Yup.string().required('Species is required'),
    photo: Yup.string().nullable(),
    instruction: Yup.string().required('Instruction is required').nullable()
}).required();

const toBase64 = (file: any): Promise<any> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

type PlantFormProps = {
    onSubmit: (data: PlantFormData, helpers: FormikHelpers<PlantFormData>) => void,
    initialValues: PlantFormData,
    allowPhoto: boolean
}

export default function PlantForm(props: PlantFormProps) {
    const [selectedInstruction, setSelectedInstruction] = useState<Instruction | null>(null);
    const [showInstructionList, setShowInstructionList] = useState<boolean>(false);

    return (
        <Formik
            validationSchema={schema}
            onSubmit={props.onSubmit}
            initialValues={props.initialValues}
            validateOnBlur={false}
        >
            {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  touched,
                  errors,
                  isSubmitting,
                  setFieldValue
              }) => (showInstructionList ? <InstructionSelect onSelect={instruction => {
                        setFieldValue('instruction', instruction.id);
                        setSelectedInstruction(instruction);
                        setShowInstructionList(false);
                        if (!values.species) {
                            setFieldValue('species', instruction.species);
                        }
                    }} initialSpecies={values.species}/> :
                    <Form onSubmit={handleSubmit}>
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
                            <Form.Control.Feedback type={'invalid'}>{errors.species}</Form.Control.Feedback>
                        </Form.Group>
                        {props.allowPhoto && <Form.Group className={'auth-group'}>
                            <Form.Label>Photo</Form.Label>
                            <Form.Control
                                name={'photo'}
                                type={'file'}
                                onChange={(event) => {
                                    let target = event.currentTarget as HTMLInputElement;
                                    if (target.files === null) {
                                        setFieldValue('photo', undefined);
                                    } else {
                                        toBase64(target.files[0])
                                            .then(value => {
                                                setFieldValue('photo', value);
                                            });

                                    }
                                }}
                            />
                        </Form.Group>}
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={6}>
                                <Form.Group className={'auth-group'}>
                                    <Form.Label>Instruction</Form.Label>
                                    <div className={'d-flex'}>
                                        <div className={'flex-grow-1 pe-3'}><Form.Control readOnly
                                                                                          defaultValue={selectedInstruction === null ? 'None' : selectedInstruction.name}/>
                                        </div>
                                        <div><Button onClick={() => setShowInstructionList(true)}>Select
                                            instruction</Button></div>
                                    </div>
                                    <Form.Control.Feedback type={'invalid'}
                                                           className={errors.instruction && touched.instruction ? 'd-block' : 'd-none'}>{errors.instruction}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={6}>
                                {selectedInstruction !== null &&
                                    <InstructionPreview instruction={selectedInstruction}/>}
                            </Col>
                        </Row>
                        <Button type={'submit'} className={'mt-3'}
                                disabled={isSubmitting}>Add</Button>
                    </Form>
            )}
        </Formik>
    );
}