from serpapi import GoogleSearch

def scrape_google_shopping(query):
    params = {
    "api_key": " 77cf3efdd5e64cd5591071dc07db1172f3f44c4529dffc334f0d3d22210e0b8d",
    "engine": "google_shopping",
    "google_domain": "google.com",
    "q": query,
    "gl": "in",
    "hl": "en",
    "num": "3",
    "device": "mobile",
    "no_cache": "true"
    } 
    search = GoogleSearch(params)
    results = search.get_dict()
    return results["shopping_results"]

def get_res_usrqry(query):
    product_info = scrape_google_shopping(query)
    return product_info