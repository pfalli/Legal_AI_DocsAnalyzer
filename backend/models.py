from typing import Optional
from pydantic import BaseModel
from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from .database import Base


class MsgPayload(BaseModel):
    msg_id: Optional[int]
    msg_name: str


class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, index=True)
    content_text = Column(Text, nullable=True)  # store extracted text
    document_type = Column(String, nullable=True)  # e.g., NDA, Employment Contract
    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())

