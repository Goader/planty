import {useNavigate} from "react-router-dom";
import {FormikHelpers} from "formik";
import {InvalidDataError} from "../api/auth/util";
import {Card, Container} from "react-bootstrap";
import * as Yup from "yup";
import {SchemaOf} from "yup";
import {usePlantService} from "../api/plants";
import {PlantFormData} from "../model/plants";

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

function AddPlantFormView() {
    const navigate = useNavigate();
    const {savePlant} = usePlantService();
    const submit = (values: PlantFormData, helpers: FormikHelpers<any>): void => {
        helpers.setSubmitting(true);
        savePlant(values)
            .then(() => navigate('/plants'))
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
        <Container>
            <Card className={'form-card p-5 mx-auto'}>
                <div className={'center-header'}>
                    <h2>Add a plant</h2>
                </div>

            </Card>
        </Container>
    );
}

export default AddPlantFormView;