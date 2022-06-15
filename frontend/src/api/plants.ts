import {useCallback} from "react";
import {useAuth} from "./auth/AuthContext";
import {AddPlantData, Plant, PlantExtraInfo, PlantResponse, PlantResponseExtraInfo} from "../model/plants";

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
        photoUrl: 'http://localhost:3001' + response.photo_url
    };
}

function convertResponseExtraInfo(response: PlantResponseExtraInfo): PlantExtraInfo {
    return {
        id: response.id,
        name: response.name,
        species: response.species,
        watering: response.watering,
        insolation: response.insolation,
        fertilizing: response.fertilizing,
        otherInfo: response.other_info,
        photoUrl: 'http://localhost:3001' + response.photo_url,
        events: response.events,
        last_fertilized: response.last_fertilized,
        last_watered: response.last_watered,
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

    const getPlant = useCallback((plantId: string) => {
        return request<PlantResponseExtraInfo>({
            method: 'get',
            url: plantsUrl + plantId
        }).then(response => {console.log(response); return convertResponseExtraInfo(response);});
    }, [request]);

    return {getPlant, getPlants, savePlant, deletePlant};
}