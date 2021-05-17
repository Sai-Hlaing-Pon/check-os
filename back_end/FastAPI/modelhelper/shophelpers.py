from datetime import datetime


def helperShop(shop):
    return {
        "shop_name" : shop["shop_name"],
        "shop_catagory": shop["shop_catagory"],
        "shop_description" : shop["shop_description"],
        "shop_url" : shop["shop_url"],
        "shop_rating" : (shop["shop_rating"] if "shop_rating" in shop else 0),
        "shop_reviewsId" : (shop["shop_reviewsId"] if "shop_reviewsId" in shop else []),
        # "shop_issueId" : (shop["shop_issueId"] if "shop_issueId" in shop else []),
        # "shop_photos" : (shop["shop_photos"] if "shop_photos" in shop else []),
        "shop_logo" : (shop["shop_logo"] if "shop_logo" in shop else []),
        "createdBy" : (shop["createdBy"] if "createdBy" in shop else ""),
        "createdAt" : datetime.now(),
    }

def helperShopDisplay(shop):
    return {
        "id" : str(shop["_id"]),
        "shop_name" : shop["shop_name"],
        "validcatagories": ["Clothing", "Electronic", "Shoes", "Tools", "Cosmatic", "Others"],
        "shop_catagory": shop["shop_catagory"],
        "shop_description" : shop["shop_description"],
        "shop_url" : shop["shop_url"],
        "shop_rating" : (shop["shop_rating"] if "shop_rating" in shop else 0),
        "shop_reviews" : (shop["shop_reviews"] if "shop_reviews" in shop else []),
        "shop_issues" : (shop["shop_issues"] if "shop_issues" in shop else []),
        "shop_photos" : (shop["shop_photos"] if "shop_photos" in shop else []),
        "shop_logo" : (shop["shop_logo"] if "shop_logo" in shop else []),
        "createdBy" : (shop["createdBy"] if "createdBy" in shop else ""),
        "createdAt" : shop["createdAt"]
    }