from pydantic import BaseModel, Field


class SendMailRequest(BaseModel):
    target: str = Field(max_length=256)
    subject: str = Field(max_length=256)
    content: str


class SendMailResponse(BaseModel):
    message: str
