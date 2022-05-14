import {AddPlantData, Plant, PlantResponse} from "../model/plants";
import {useCallback} from "react";
import {useAuth} from "./auth/AuthContext";

const plantsUrl = process.env.REACT_APP_API_URL + '/dashboard/plants/';

function convertResponse(response: PlantResponse): Plant {
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

export function usePlantService() {
    const {request} = useAuth();
    const getPlants = useCallback(() => {
        return request<Array<PlantResponse>>({
            method: 'get',
            url: plantsUrl
        }).then(response => response.map(plant => convertResponse(plant)));
    }, [request]);

    const savePlant = useCallback((plant: AddPlantData) => {
        return request({
            method: 'post',
            url: plantsUrl,
            data: plant
        });
    }, [request]);

    return {getPlants, savePlant};
}