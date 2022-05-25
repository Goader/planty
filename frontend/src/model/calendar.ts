import {Plant} from "./plants";

type BasePlantEvent = {
    date: Date
    action: Action
    daysLate: number
    priority: number | null
    customInfo: CustomEventInfo | null
}

export type PlantEvent = BasePlantEvent & {
    plant: string
}

export type PlantEventDetails = BasePlantEvent & {
    plant: Plant
}

export type CustomEventInfo = {
    name: string
    description: string
}

export type PlantEventResponse = {
    date: string
    plant: string
    action: Action
    days_late: number | null
    priority: number | null
    custom_info: CustomEventInfo | null
}

export type Action = 'water' | 'insolation' | 'fertilize' | 'custom'