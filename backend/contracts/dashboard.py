from pydantic import BaseModel, Field
from uuid import UUID


# GET /dashboard/plants auth
class PlantsRequest(BaseModel):
    pass


class Instruction(BaseModel):
    watering: int
    insolation: str  # 6 different values
    fertilizing: int


class Plant(BaseModel):
    id: UUID
    name: str
    species: str
    image: bytes  # maybe link to an image?
    instruction: Instruction
    other_info: str

# GET /dashboard/plants auth
class PlantsResponse(BaseModel):
    plants: list[Plant]
