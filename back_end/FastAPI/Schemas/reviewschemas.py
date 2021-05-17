from typing import Optional, List

from pydantic import BaseModel, Field 

class Review(BaseModel):
    shop_id : str  = Field(...)
    rating: float = Field(..., gt=0, lte=5)
    review_description : str = Field(...)
    photo_path : List[str]
    createdBy : str  = Field(...)
    
class ReviewUpdate(BaseModel):
    rating: float = Field(..., gt=0, lte=5)
    review_description: str = Field(...)
    photo_path : List[str]
