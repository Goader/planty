import {BaseInstruction, Instruction} from "../../model/instructions";
import {FormikHelpers} from "formik";
import {useInstructionsService} from "../../api/instructions";
import {InvalidDataError} from "../../api/auth/util";
import InstructionModal from "./InstructionModal";

export type AddInstructionProps = {
    onHide: () => void,
    onAdd: (instruction: Instruction) => void,
    show: boolean
}

const initialValues: BaseInstruction = {
    name: '',
    species: '',
    watering: 0,
    insolation: 'None',
    fertilizing: 0
};

export default function AddInstructionModal(props: AddInstructionProps) {
    const {saveInstruction} = useInstructionsService();

    const submit = (data: BaseInstruction, helpers: FormikHelpers<BaseInstruction>) => {
        helpers.setSubmitting(true);
        saveInstruction(data)
            .then(instruction => props.onAdd(instruction))
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

    return <InstructionModal onHide={props.onHide}
                             onSubmit={submit}
                             initialValues={initialValues}
                             show={props.show}
                             title={'Add instruction'}/>;
}