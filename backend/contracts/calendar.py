from uuid import UUID


# GET /dashboard/events auth
class EventsRequest:
    start_date: str  # format YYYY-MM-DD
    end_date: str  # format YYYY-MM-DD
    

class Event:
    date: str
    plant: UUID
    action: str  # one out of a few values
    priority: str
    happened: bool
    message: str

# GET /dashboard/events auth
class EventsResponse:
    events: list[Event]


# POST /dashboard/events auth
class EventsRequest:
    datetime: str  # format YYYY-MM-DD HH:MM:SS
    plant: UUID
    action: str  # one out of a few values

# POST /dashboard/events auth
class EventsResponse:
    pass
