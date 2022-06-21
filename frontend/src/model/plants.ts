export type PlantFormData = {
    name: string
    species: string
    instruction: string | null
    photo?: string | null
}

export type Plant = {
    id: string
    name: string
    species: string
    watering?: number
    insolation?: string
    fertilizing?: number
    otherInfo?: string
    photoUrl?: string | null
}

export type PlantResponse = {
    id: string
    name: string
    species: string
    watering?: number
    insolation?: string
    fertilizing?: number
    other_info?: string
    photo_url?: string | null
}