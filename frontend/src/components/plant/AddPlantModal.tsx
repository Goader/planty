import {Plant, PlantFormData} from "../../model/plants";
import PlantFormModal from "./PlantFormModal";
import {FormikHelpers} from "formik";
import {usePlantService} from "../../api/plants";
import {InvalidDataError} from "../../api/auth/util";

export type AddPlantProps = {
    onHide: () => void,
    onAdd: (plant: Plant) => void,
    show: boolean
}

const initialValues: PlantFormData = {
    name: '',
    species: '',
    photo: null,
    instruction: null
};

export default function AddPlantModal(props: AddPlantProps) {
    const {savePlant} = usePlantService();
    const submit = (plantData: PlantFormData, helpers: FormikHelpers<PlantFormData>) => {
        console.log(plantData);
        savePlant(plantData)
            .then(plant => props.onAdd(plant))
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
    return <PlantFormModal onHide={props.onHide}
                           onSubmit={submit}
                           initialValues={initialValues}
                           show={props.show}
                           title={'Add Plant'}
                           allowPhoto/>;
}