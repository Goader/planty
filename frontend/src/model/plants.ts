export type AddPlantRequestBody = {
    name: string,
    species: string,
    watering?: number,
    insolation?: string,
    fertilizing?: number
}

export type Plant = {
    id: string,
    name: string,
    species: string,
    watering?: number,
    insolation?: string,
    fertilizing?: number,
    otherInfo?: string
}

export type PlantResponse = {
    id: string,
    name: string,
    species: string,
    watering?: number,
    insolation?: string,
    fertilizing?: number,
    other_info?: string
}