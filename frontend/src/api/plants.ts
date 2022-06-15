import {useCallback} from "react";
import {useAuth} from "./auth/AuthContext";
import {AddPlantData, Plant, PlantResponse} from "../model/plants";
import {urls} from "./const";

const plantsUrl = urls.apiUrl + '/dashboard/plants/';

function convertResponse(response: PlantResponse): Plant {
    return {
        id: response.id,
        name: response.name,
        species: response.species,
        watering: response.watering,
        insolation: response.insolation,
        fertilizing: response.fertilizing,
        otherInfo: response.other_info,
        photoUrl: urls.apiUrl + response.photo_url
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

    const deletePlant = useCallback((id) => {
        return request({
            method: 'delete',
            url: plantsUrl,
            data: {
                id: id
            }
        }).then(response => {
            console.log(response);
        });
    }, [request]);

    return {getPlants, savePlant, deletePlant};
}