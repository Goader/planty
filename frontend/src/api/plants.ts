import {useCallback} from "react";
import {useAuth} from "./auth/AuthContext";
import {Plant, PlantFormData, PlantResponse} from "../model/plants";

const plantsUrl = process.env.REACT_APP_API_URL + '/dashboard/plants/';

function convertResponse(response: PlantResponse): Plant {
    return {
        id: response.id,
        name: response.name,
        species: response.species,
        watering: response.watering,
        insolation: response.insolation,
        fertilizing: response.fertilizing,
        otherInfo: response.other_info,
        photoUrl: response.photo_url ? 'http://localhost:3001' + response.photo_url : null
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

    const savePlant = useCallback((plant: PlantFormData) => {
        return request<PlantResponse>({
            method: 'post',
            url: plantsUrl,
            data: plant
        }).then(response => convertResponse(response));
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

    const getPlant = useCallback((plantId: string) => {
        return request<PlantResponse>({
            method: 'get',
            url: plantsUrl + plantId
        }).then(response => convertResponse(response));
    }, [request]);

    return {getPlant, getPlants, savePlant, deletePlant};
}