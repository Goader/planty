from uuid import UUID


# GET /calendar/events auth
class EventsRequest:
    start_date: str
    end_date: str
    

class Event:
    date: str
    plant: UUID
    action: str
    priority: str
    message: str

# GET /calendar/events auth
class EventsResponse:
    events: list[Event]
