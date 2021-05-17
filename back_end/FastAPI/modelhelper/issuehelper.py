from datetime import datetime

from bson.objectid import ObjectId


def helperIssue(issue):
    return {
        "shop_id" : ObjectId(issue["shop_id"]),
        "issue_description" : issue["issue_description"],
        "photo_path": issue["photo_path"],
        "helpful": [],
        "unhelpful": [],
        "isupdated": False,
        "createdBy": issue["createdBy"],
        "createdAt" : datetime.now(),
    }

def helperIssueDisplay(issue):
    return {
        "id" : str(issue["_id"]),
        "shop_id" : str(issue["shop_id"]),
        "issue_description" : issue["issue_description"],
        "photo_path": issue["photo_path"],
        "helpful": issue["helpful"],
        "unhelpful": issue["unhelpful"],
        "replies" : (issue["replies"] if "replies" in issue else []),
        "isupdated": issue["isupdated"],
        "createdBy": issue["createdBy"],
        "createdAt" : issue["createdAt"]
    }