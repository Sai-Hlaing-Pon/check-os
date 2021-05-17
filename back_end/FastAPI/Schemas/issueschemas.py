from typing import List

from pydantic import BaseModel, Field 


class Issue(BaseModel):
    shop_id : str  = Field(...)
    issue_description : str = Field(None)
    photo_path : List[str]
    createdBy : str  = Field(...)
    
class IssueUpdate(BaseModel):
    issue_description: str = Field(...)
    photo_path : List[str]
