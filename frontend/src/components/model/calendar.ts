export type CalendarEvent = {
    date: Date
    plant: string
    action: Action
    priority: number
    message: string
}

export type Action = 'water' | 'move' | 'fertilize'