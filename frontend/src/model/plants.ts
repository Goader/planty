export type AddPlantRequestBody = {
    name: string,
    species: string,
    watering?: number,
    insolation?: string,
    fertilizing?: number
}