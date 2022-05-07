import {Plant} from "./plants";

export type PlantEvent = {
    date: Date
    plant: string
    action: Action
    priority: number
    message: string
}

export type PlantEventResponse = {
    date: string
    plant: string
    action: Action
    priority: number
    message: string
}

export type PlantEventDetails = PlantEvent & {
    plantDetails: Plant
}

export type Action = 'water' | 'insolation' | 'fertilize' | 'custom'