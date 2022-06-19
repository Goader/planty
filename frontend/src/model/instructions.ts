export type BaseInstruction = {
    name: string
    species: string
    watering: number
    insolation: string
    fertilizing: number
}

export type Instruction = BaseInstruction & {
    id: string
}

export type PublicInstruction = Instruction & {
    numSelected: number
}

export type PublicInstructionResponse = Instruction & {
    num_selected: number
}