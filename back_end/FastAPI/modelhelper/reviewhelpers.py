from datetime import datetime
from bson.objectid import ObjectId


def helperReview(review):
    return {
        "shop_id" : ObjectId(review["shop_id"]),
        "rating": review["rating"],
        "review_description" : review["review_description"],
        "photo_path": review["photo_path"],
        "helpful": [],
        "unhelpful": [],
        "isupdated": False,
        "createdBy": review["createdBy"],
        "createdAt" : datetime.now(),
    }

def helperReviewDisplay(review):
    return {
        "id" : str(review["_id"]),
        "shop_id" : str(review["shop_id"]),
        "rating": review["rating"],
        "review_description" : review["review_description"],        
        "photo_path": review["photo_path"],
        "helpful": review["helpful"],
        "unhelpful": review["unhelpful"],
        "replies" : (review["replies"] if "replies" in review else []),
        "isupdated": review["isupdated"],
        "createdBy": review["createdBy"],
        "createdAt" : review["createdAt"],
    }