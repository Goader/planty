from pydantic import BaseModel, Field
from uuid import UUID


class ScheduleNotificationRequest(BaseModel):
    target: str = Field(max_length=256)
    subject: str = Field(max_length=256)
    contents: list[str]
    
    scheduled_datetime: str = Field(regex=r'\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}')
    category: str = Field(regex=r'watering')
    
    user_uuid: UUID
    plant_uuid: UUID


class ScheduleNotificationResponse(BaseModel):
    message: str