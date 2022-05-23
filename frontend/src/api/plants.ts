import {AxiosRequestConfig} from "axios";
import {AddPlantRequestBody, Plant, PlantResponse} from "../model/plants";

export function createPlantsPostRequestConfig(data: AddPlantRequestBody): AxiosRequestConfig {
    return {
        method: 'post',
        url: 'http://localhost:3001/dashboard/plants/',
        data: data
    };
}

export function createPlantsGetRequestConfig(): AxiosRequestConfig {
    return {
        method: 'get',
        url: 'http://localhost:3001/dashboard/plants/'
    };
}

export function createSinglePlantsGetRequest(plantId: string): AxiosRequestConfig {
    return {
        method: 'get',
        url: 'http://localhost:3001/dashboard/plants/' + plantId
    };
}

export function mapResponseToPlant(response: PlantResponse): Plant {
    return {
        id: response.id,
        name: response.name,
        species: response.species,
        watering: response.watering,
        insolation: response.insolation,
        fertilizing: response.fertilizing,
        otherInfo: response.other_info
    };
}