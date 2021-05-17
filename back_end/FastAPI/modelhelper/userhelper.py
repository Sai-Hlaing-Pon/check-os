from datetime import datetime


def helperUser(Data):
    return {
        "displayName" : Data["displayName"],
        "email": Data["email"],
        "password": Data["password"],
        "emailVerified": False,
        "phoneNumber": (Data["phoneNumber"]if "phoneNumber" in Data else ""), 
        "photoURL": (Data["photoURL"]if "photURL" in Data else ""), 
        "createdAt": datetime.now(),
    }

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