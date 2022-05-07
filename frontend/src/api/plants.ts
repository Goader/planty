import {AxiosRequestConfig} from "axios";
import {AddPlantRequestBody, Plant, PlantResponse} from "../model/plants";

const plantsUrl = process.env.REACT_APP_API_URL + '/dashboard/plants/';

export function createPlantsPostRequestConfig(data: AddPlantRequestBody): AxiosRequestConfig {
    return {
        method: 'post',
        url: plantsUrl,
        data: data
    };
}

export function createPlantsGetRequestConfig(): AxiosRequestConfig {
    return {
        method: 'get',
        url: plantsUrl
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
        otherInfo: response.other_info,
        photoUrl: 'http://localhost:3001' + response.photo_url
    };
}