from uuid import UUID


# GET /dashboard/plants auth
class PlantsRequest:
    pass


class Plant:
    id: UUID
    name: str
    image: str  # maybe link to an image?
    species: str

    watering: int
    insolation: str  # 6 different values
    fertilizing: int

    other_info: str

# GET /dashboard/plants auth
class PlantsResponse:
    plants: list[Plant]


# POST /dashboard/plants auth
class PlantsRequest:
    name: str
    image: bytes  # base64 encoding
    species: str

    used_instruction: UUID  # can be blank if the user has entered his own instruction, then a new one will be created
    watering: int  # can be blank if the used_instruction contains the id
    insolation: str  # can be blank if the used_instruction contains the id
    fertilizing: int  # can be blank if the used_instruction contains the id

    other_info: str

# POST /dashboard/plants auth
class PlantsResponse:
    pass


# PUT /dashboard/plants auth
class PlantsRequest:
    id: UUID
    name: str
    species: str

    used_instruction: UUID  # can be blank if the user has entered his own instruction, then a new one will be created
    watering: int  # can be blank if the used_instruction contains the id
    insolation: str  # can be blank if the used_instruction contains the id
    fertilizing: int  # can be blank if the used_instruction contains the id

    other_info: str

# PUT /dashboard/plants auth
class PlantsResponse:
    pass


# DELETE /dashboard/plants auth
class PlantsRequest:
    id: UUID

# DELETE /dashboard/plants auth
class PlantsResponse:
    pass
