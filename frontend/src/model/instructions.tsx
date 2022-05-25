export type Instruction = {
    id: string
    name: string
    species: string
    watering: number
    insolation: string
    fertilizing: number
}

export type PublicInstruction = Instruction & {
    numSelected: number
}

export type PublicInstructionResponse = Instruction & {
    num_selected: number
}