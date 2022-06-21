import {useAuth} from "./auth/AuthContext";
import {useCallback} from "react";
import {BaseInstruction, Instruction} from "../model/instructions";

const instructionsUrl = process.env.REACT_APP_API_URL + '/dashboard/instructions/';
const singleInstructionUrl = (id: string) => instructionsUrl + id + '/';

const popularInstructionsUrl = instructionsUrl + 'popular/';

export function useInstructionsService() {
    const {request} = useAuth();

    const getInstructions = useCallback(() => {
        return request<Instruction[]>({
            method: 'get',
            url: instructionsUrl,
        });
    }, [request]);

    const getPopularInstructions = useCallback((species: string) => {
        return request<Instruction[]>({
            method: 'get',
            url: popularInstructionsUrl,
            params: {
                species: species
            }
        });
    }, [request]);

    const saveInstruction = useCallback((instruction: BaseInstruction) => {
        return request<Instruction>({
            method: 'post',
            url: instructionsUrl,
            data: instruction
        });
    }, [request]);

    const updateInstruction = useCallback((instruction: Instruction) => {
        let baseInstruction: any = Object.assign({}, instruction);
        delete baseInstruction.id;

        return request<Instruction>({
            method: 'put',
            url: singleInstructionUrl(instruction.id),
            data: baseInstruction
        });
    }, [request]);

    return {getInstructions, saveInstruction, updateInstruction, getPopularInstructions};
}