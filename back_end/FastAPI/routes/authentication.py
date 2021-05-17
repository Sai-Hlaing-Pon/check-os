from datetime import timedelta
from .. import hashing, connection, settings
from fastapi import APIRouter, Depends, status, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from ..Schemas import userschemas
from ..modelhelper import userhelper
from ..controllers import tokencontroller

router = APIRouter(tags=['Authentication'])


def helperUserDisplay(Data):
    return {
        "id" : str(Data["_id"]),
        "displayName" : Data["displayName"],
        "email": Data["email"],
        # "password": Data["password"],
        "emailVerified": False,
        "phoneNumber": Data["phoneNumber"],
        "photoURL": "", 
        "createdAt": str(Data["createdAt"]),
    }


@router.post('/login')
async def login(request:OAuth2PasswordRequestForm = Depends()):
# def login(request: OAuth2PasswordRequestForm = Depends()):
    user = await connection.user_collection.find_one({"email":request.username})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with email:{request.email} not exist.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if not hashing.Hash.verify(user["password"], request.password):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Incorrect password",
            headers={"WWW-Authenticate": "Bearer"})
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = tokencontroller.create_access_token(
        data=userhelper.helperUserDisplay(user), expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}
    # return {"message", "password match"}

    # access_token = token.create_access_token(data={"sub": user.email})
    # return {"access_token": access_token, "token_type": "bearer"}

@router.get("/users/me/")
async def read_users_me(current_user = Depends(tokencontroller.get_current_active_user)):
    return current_user
