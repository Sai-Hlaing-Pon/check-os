from typing import Optional

from fastapi import FastAPI, APIRouter, Body, status, Response, HTTPException, Depends

from fastapi.encoders import jsonable_encoder

from pydantic import BaseModel

from datetime import datetime

from .Schemas import shopschemas, reviewschemas, issueschemas, replyschemas, userschemas

from .modelhelper import shophelpers

from .controllers import (
    shopcontroller, 
    reviewcontroller, 
    issuecontroller, 
    replycontroller, 
    usercontroller, 
    tokencontroller)

from .routes import authentication

import json
from . import connection
from bson.objectid import ObjectId
from schematics.models import Model 
from schematics.types import StringType, EmailType, IntType, FloatType, BooleanType




def email_exixts(email):
    user_exist = True

    if connection.user_collection.find(
        {'email' : email}
    ).count() == 0:
        user_exist = False
        return user_exist

def check_login_creds(email,password):
    if not email_exixts(email):
        activeuser = connection.user_collection.find(
            {'email' : email}
        )
        for user in activeuser:
            user = dict(user)

def ResponseModel(data, message):
    return {
        "data": [data],
        "code": 200,
        "message": message,
    }


def ErrorResponseModel(error, code, message):
    return {"error": error, "code": code, "message": message}


app = FastAPI()
# router = APIRouter()

app.include_router(authentication.router)


# -------------------------- user Start -------------------------------
@app.post("/user/", tags=["User"], response_description="User data added into the database", status_code=status.HTTP_200_OK)
async def create_user(
    req: userschemas.User = Body(...), 
    current_user = Depends(tokencontroller.get_current_active_user)):
    user = jsonable_encoder(req)
    check_email = await usercontroller.email_exixts(user['email'])
    if check_email:
        status_code = status.HTTP_403_FORBIDDEN
        return ErrorResponseModel("Forbidden!", 
                HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED), 
                    f"Register failed, user with email:{user['email']} already exist..")
    else:
        user_data = await usercontroller.add_user(user)
        if user_data:
            return ResponseModel(user_data, "User data register successfully.")
    return ErrorResponseModel("An error occured", 404, "Register failed.")


@app.get("/user/{user_id}", tags=["User"], status_code=status.HTTP_200_OK)
async def get_user(user_id, 
    current_user = Depends(tokencontroller.get_current_active_user)):
    user = await usercontroller.get_user(user_id, 
    current_user = Depends(tokencontroller.get_current_active_user))   
    if user:
        return ResponseModel(user, "User data retrived successfully.")
    return ErrorResponseModel(f"An error occured", 404, "Data not found for userId:{user_id}.")


@app.delete("/user/{user_id}", tags=["User"], status_code=status.HTTP_200_OK)
async def delete_user(user_id, 
    current_user = Depends(tokencontroller.get_current_active_user)):
    user = await usercontroller.delete_user(user_id)       
    if user:
        return ResponseModel("Deleted!", "reply data deleted successfully.")
    return ErrorResponseModel(f"An error occured", 404, "Data already not found for shopid:{user_id}.")


@app.put("/user/{user_id}", tags=["User"], status_code=status.HTTP_200_OK)
async def update_user(user_id, req: userschemas.User = Body(...), 
    current_user = Depends(tokencontroller.get_current_active_user)):
    user = jsonable_encoder(req)
    user_new = await usercontroller.update_user(user_id, user)
    if user_new:
        return ResponseModel(user_new, "User data update successfully.")
    return ErrorResponseModel("An error occured", 404, "Data update failed.")

# ----------------------- user End ---------------------------


# -------------------------- Shop Start -------------------------------
@app.post("/shop", tags=["Shop"], response_description="Shop data added into the database", status_code=status.HTTP_201_CREATED)
async def create_shop(req: shopschemas.Shop = Body(...), 
    current_user = Depends(tokencontroller.get_current_active_user)):
    shop = jsonable_encoder(req)
    shop_data = await shopcontroller.add_shop(shop)
    if shop_data:
        return ResponseModel(shop_data, "shop data register successfully.")
    return ErrorResponseModel("An error occured", 404, "Register failed.")


@app.get("/shop/{shop_id}", tags=["Shop"], status_code=status.HTTP_200_OK)
async def get_shop(shop_id, response: Response, 
    current_user = Depends(tokencontroller.get_current_active_user)):
    shop = await shopcontroller.get_shop(shop_id)    
    if shop:
        return ResponseModel(shop, "shop data retrived successfully.")
    return ErrorResponseModel(f"An error occured", 404, "Data not found for shopid:{id}.")


@app.get("/shop", tags=["Shop"], status_code=status.HTTP_200_OK)
async def get_shops(response: Response, 
    current_user = Depends(tokencontroller.get_current_active_user)):
    shop = await shopcontroller.get_shops()
    return shop


@app.put("/shop/{shop_id}", tags=["Shop"], status_code=status.HTTP_200_OK)
async def update_shop(shop_id, req: shopschemas.ShopUpdate = Body(...), 
    current_user = Depends(tokencontroller.get_current_active_user)):
    shop = jsonable_encoder(req)
    shop_new = await shopcontroller.update_shop(shop_id, shop)
    if shop_new:
        return ResponseModel(shop_new, "shop data update successfully.")
    return ErrorResponseModel("An error occured", 404, "Data update failed.")

# ----------------------- Shop End ---------------------------



# -------------------------- review Start -------------------------------
@app.post("/shop/{shop_id}/review", tags=["Review"], response_description="review data added into the database", status_code=status.HTTP_201_CREATED)
async def create_review(req: reviewschemas.Review = Body(...), 
    current_user = Depends(tokencontroller.get_current_active_user)):
    review = jsonable_encoder(req)
    review_data = await reviewcontroller.add_review(review)
    if review_data:
        return ResponseModel(review_data, "review data register successfully.")
    return ErrorResponseModel("An error occured", 404, "Register failed.")


@app.get("/shop/{shop_id}/review/{review_id}", tags=["Review"], status_code=status.HTTP_200_OK)
async def get_review(review_id, 
    current_user = Depends(tokencontroller.get_current_active_user)):
    review = await reviewcontroller.get_review(review_id)   
    if review:
        return ResponseModel(review, "review data retrived successfully.")
    return ErrorResponseModel(f"An error occured", 404, "Data not found for reviewid:{review_id}.")


@app.delete("/shop/{shop_id}/review/{review_id}", tags=["Review"], status_code=status.HTTP_200_OK)
async def delete_review(review_id, 
    current_user = Depends(tokencontroller.get_current_active_user)):
    review = await reviewcontroller.delete_review(review_id)       
    if review:
        return ResponseModel("Deleted!", "review data deleted successfully.")
    return ErrorResponseModel(f"An error occured", 404, "Data already not found for reviewid:{review_id}.")


@app.put("/shop/{shop_id}/review/{review_id}", tags=["Review"], status_code=status.HTTP_200_OK)
async def update_shop(review_id, req: reviewschemas.ReviewUpdate = Body(...), 
    current_user = Depends(tokencontroller.get_current_active_user)):
    review = jsonable_encoder(req)
    review_new = await reviewcontroller.update_review(review_id, review)
    if review_new:
        return ResponseModel(review_new, "review data update successfully.")
    return ErrorResponseModel("An error occured", 404, "Data update failed.")

# ----------------------- review End ---------------------------



# -------------------------- issue Start -------------------------------
@app.post("/shop/{shop_id}/issue", tags=["Issue"], response_description="issue data added into the database", status_code=status.HTTP_201_CREATED)
async def create_issue(req: issueschemas.Issue = Body(...), 
    current_user = Depends(tokencontroller.get_current_active_user)):
    issue = jsonable_encoder(req)
    issue_data = await issuecontroller.add_issue(issue)
    if issue_data:
        return ResponseModel(issue_data, "issue data register successfully.")
    return ErrorResponseModel("An error occured", 404, "Register failed.")


@app.get("/shop/{shop_id}/issue/{issue_id}", tags=["Issue"], status_code=status.HTTP_200_OK)
async def get_issue(issue_id, 
    current_user = Depends(tokencontroller.get_current_active_user)):
    issue = await issuecontroller.get_issue(issue_id)   
    if issue:
        return ResponseModel(issue, "issue data retrived successfully.")
    return ErrorResponseModel(f"An error occured", 404, "Data not found for issueid:{issue_id}.")


@app.delete("/shop/{shop_id}/issue/{issue_id}", tags=["Issue"], status_code=status.HTTP_200_OK)
async def delete_issue(issue_id, 
    current_user = Depends(tokencontroller.get_current_active_user)):
    issue = await issuecontroller.delete_issue(issue_id)       
    if issue:
        return ResponseModel("Deleted!", "shop data deleted successfully.")
    return ErrorResponseModel(f"An error occured", 404, "Data already not found for Issueid:{issue_id}.")


@app.put("/shop/{shop_id}/issue/{issue_id}", tags=["Issue"], status_code=status.HTTP_200_OK)
async def update_issue(issue_id, req: issueschemas.IssueUpdate = Body(...), 
    current_user = Depends(tokencontroller.get_current_active_user)):
    issue = jsonable_encoder(req)
    issue_new = await issuecontroller.update_issue(issue_id, issue)
    if issue_new:
        return ResponseModel(issue_new, "issue data update successfully.")
    return ErrorResponseModel("An error occured", 404, "Data update failed.")

# ----------------------- issue End ---------------------------



# -------------------------- reply Start -------------------------------
@app.post("/shop/{shop_id}/{parent_id}/", tags=["Reply"], response_description="issue data added into the database", status_code=status.HTTP_201_CREATED)
async def create_reply(req: replyschemas.Reply = Body(...), 
    current_user = Depends(tokencontroller.get_current_active_user)):
    reply = jsonable_encoder(req)
    reply_data = await replycontroller.add_reply(reply)
    if reply_data:
        return ResponseModel(reply_data, "reply data register successfully.")
    return ErrorResponseModel("An error occured", 404, "Register failed.")


@app.get("/shop/{shop_id}/{parent_id}/{reply_id}", tags=["Reply"], status_code=status.HTTP_200_OK)
async def get_reply(reply_id, 
    current_user = Depends(tokencontroller.get_current_active_user)):
    reply = await replycontroller.get_reply(reply_id)   
    if reply:
        return ResponseModel(reply, "reply data retrived successfully.")
    return ErrorResponseModel(f"An error occured", 404, "Data not found for replyId:{reply_id}.")


@app.delete("/shop/{shop_id}/{parent_id}/{reply_id}", tags=["Reply"], status_code=status.HTTP_200_OK)
async def delete_reply(reply_id, 
    current_user = Depends(tokencontroller.get_current_active_user)):
    issue = await replycontroller.delete_reply(reply_id)       
    if issue:
        return ResponseModel("Deleted!", "reply data deleted successfully.")
    return ErrorResponseModel(f"An error occured", 404, "Data already not found for shopid:{reply_id}.")


@app.put("/shop/{shop_id}/{parent_id}/{reply_id}", tags=["Reply"], status_code=status.HTTP_200_OK)
async def update_reply(reply_id, req: replyschemas.ReplyUpdate = Body(...), 
    current_user = Depends(tokencontroller.get_current_active_user)):
    issue = jsonable_encoder(req)
    issue_new = await replycontroller.update_reply(reply_id, issue)
    if issue_new:
        return ResponseModel(issue_new, "reply data update successfully.")
    return ErrorResponseModel("An error occured", 404, "Data update failed.")

# ----------------------- issue End ---------------------------