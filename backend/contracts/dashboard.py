from pydantic import BaseModel, Field
from uuid import UUID


# GET /dashboard/plants auth
class PlantsRequest(BaseModel):
    pass



class Plant(BaseModel):
    id: UUID
    name: str
    image: str  # maybe link to an image?
    species: str

    watering: int
    insolation: str  # 6 different values
    fertilizing: int

    other_info: str

# GET /dashboard/plants auth
class PlantsResponse(BaseModel):
    plants: list[Plant]


# POST /dashboard/plants auth
class PlantsRequest(BaseModel):
    name: str
    image: bytes  # base64 encoding
    species: str

    used_instruction: UUID  # can be blank if the user has entered his own instruction, then a new one will be created
    watering: int  # can be blank if the used_instruction contains the id
    insolation: str  # can be blank if the used_instruction contains the id
    fertilizing: int  # can be blank if the used_instruction contains the id

    other_info: str

# POST /dashboard/plants auth
class PlantsResponse(BaseModel):
    pass


# PUT /dashboard/plants auth
class PlantsRequest(BaseModel):
    id: UUID
    name: str
    species: str

    used_instruction: UUID  # can be blank if the user has entered his own instruction, then a new one will be created
    watering: int  # can be blank if the used_instruction contains the id
    insolation: str  # can be blank if the used_instruction contains the id
    fertilizing: int  # can be blank if the used_instruction contains the id

    other_info: str

# POST /dashboard/plants auth
class PlantsResponse(BaseModel):
    pass


# DELETE /dashboard/plants auth
class PlantsRequest(BaseModel):
    id: UUID

# DELETE /dashboard/plants auth
class PlantsResponse(BaseModel):
    pass
