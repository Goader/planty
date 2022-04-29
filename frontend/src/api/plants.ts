import {AxiosRequestConfig} from "axios";
import {AddPlantRequestBody} from "../model/plants";

export function createPlantsRequestConfig(data: AddPlantRequestBody): AxiosRequestConfig {
    return {
        method: 'post',
        url: 'http://localhost:3001/dashboard/plants/',
        data: data
    };
}