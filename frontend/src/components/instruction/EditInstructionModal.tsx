import {BaseInstruction, Instruction} from "../../model/instructions";
import {useInstructionsService} from "../../api/instructions";
import {FormikHelpers} from "formik";
import {InvalidDataError} from "../../api/auth/util";
import InstructionFormModal from "./InstructionFormModal";

export type EditInstructionProps = {
    onHide: () => void,
    onEdit: (instruction: Instruction) => void,
    instruction: Instruction | null
}

const defaultInitialValues: BaseInstruction = {
    name: '',
    species: '',
    watering: 1,
    insolation: 'None',
    fertilizing: 1
};

export default function EditInstructionModal(props: EditInstructionProps) {
    const {updateInstruction} = useInstructionsService();

    const submit = (data: BaseInstruction, helpers: FormikHelpers<BaseInstruction>) => {
        helpers.setSubmitting(true);
        if (props.instruction !== null) {
            updateInstruction({
                id: props.instruction.id,
                ...data
            })
                .then(instruction => props.onEdit(instruction))
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
        }
    };

    return <InstructionFormModal onHide={props.onHide}
                                 onSubmit={submit}
                                 initialValues={props.instruction !== null ? props.instruction : defaultInitialValues}
                                 show={props.instruction !== null}
                                 title={'Edit instruction'}/>;
}