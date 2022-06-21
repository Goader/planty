export type AddPlantData = {
    name: string
    species: string
    watering: number
    insolation: string
    fertilizing: number
    photo?: string
}

export type Plant = {
    id: string
    name: string
    species: string
    watering?: number
    insolation?: string
    fertilizing?: number
    otherInfo?: string
    photoUrl?: string
}

export type PlantExtraInfo = {
    id: string
    name: string
    species: string
    watering?: number
    insolation?: string
    fertilizing?: number
    otherInfo?: string
    photoUrl?: string
    events: []
    last_fertilized: string
    last_watered: string
}

export type MyEvent = {
    id: string
    date: string
    action: string
    custom_info: string
    days_late: string
    happened: string
    interval: string
}

export type PlantResponse = {
    id: string
    name: string
    species: string
    watering?: number
    insolation?: string
    fertilizing?: number
    other_info?: string
    photo_url?: string
}

export type PlantResponseExtraInfo = {
    id: string
    name: string
    species: string
    watering?: number
    insolation?: string
    fertilizing?: number
    other_info?: string
    photo_url?: string
    events: []
    last_fertilized: string
    last_watered: string
}