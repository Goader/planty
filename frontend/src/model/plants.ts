export type AddPlantRequestBody = {
    name: string
    species: string
    watering?: number
    insolation?: string
    fertilizing?: number
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