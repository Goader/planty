from pydantic import BaseModel, Field
from uuid import UUID


# GET /dashboard/plants auth
class PlantsRequest(BaseModel):
    pass



class Plant(BaseModel):
    id: UUID
    name: str
    image: bytes  # maybe link to an image?
    species: str

    watering: int
    insolation: str  # 6 different values
    fertilizing: int

    other_info: str

# GET /dashboard/plants auth
class PlantsResponse(BaseModel):
    plants: list[Plant]
