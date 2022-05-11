import {Plant} from "./plants";

type BasePlantEvent = {
    date: Date
    action: Action
    priority: number
    message: string
}

export type PlantEvent = BasePlantEvent & {
    plant: string
}

export type PlantEventDetails = BasePlantEvent & {
    plant: Plant
}

export type PlantEventResponse = {
    date: string
    plant: string
    action: Action
    priority: number
    message: string
}

export type Action = 'water' | 'insolation' | 'fertilize' | 'custom'