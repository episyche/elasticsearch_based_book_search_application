from django.http import JsonResponse
from django.shortcuts import render
from httplib2 import Response
from rest_framework.views import APIView
from django.conf import settings
import requests
# Create your views here.

search_url = settings.ELASTIC_URL+ settings.ELASTIC_INDEX + "/_search/"
headers = { "Authorization": "ApiKey "+ settings.ELASTIC_API_KEY}

class Search(APIView):
    def post(self , request):
        data = request.data
        keyword = data['keyword']
        search_query = {
            "size" : 150,
            "query": {
                "wildcard": {
                    "book_name.keyword": {
                        "value" : "*"+ keyword +"*"
                    }
                }
            }
        }
        try:
            search_response = requests.post(search_url, headers=headers, json=search_query , verify=False)
            resp = search_response.json()
        except Exception as er:
            print('search err-----' , er)

        value = resp['hits']['total']['value']
        print('---value---------' , value)
        matched_data = []
        for hits_position in range(value):  
            objects = resp['hits']['hits'][hits_position]['_source']
            matched_data.append(objects)
                
        return JsonResponse({'data' : matched_data})


