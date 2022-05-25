from pydantic import BaseModel, Field
from typing import List
from uuid import UUID


class ScheduleNotificationRequest(BaseModel):
    target: str = Field(max_length=256)
    subject: str = Field(max_length=256)
    contents: List[str]
    
    scheduled_datetime: str = Field(regex=r'\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}')
    category: str = Field(regex=r'water|insolation|fertilize|custom')
    
    user_uuid: int
    plant_uuid: UUID


class ScheduleNotificationResponse(BaseModel):
    message: str