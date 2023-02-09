import requests
import json

BASE_URL="https://8000-spydirwebb-django-canuz7re0z4.ws-us85.gitpod.io"

def pretty_print_request(request):
    print( '\n{}\n{}\n\n{}\n\n{}\n'.format(
        '-----------Request----------->',
        request.method + ' ' + request.url,
        '\n'.join('{}: {}'.format(k, v) for k, v in request.headers.items()),
        request.body)
    )

def pretty_print_response(response):
    print('\n{}\n{}\n\n{}\n\n{}\n'.format(
        '<-----------Response-----------',
        'Status code:' + str(response.status_code),
        '\n'.join('{}: {}'.format(k, v) for k, v in response.headers.items()),
        response.text)
    )        

def test_get_headers_body_json():
    API = BASE_URL + "/users"

    # headers
    headers = {'Content-Type': 'application/json'}

    # Body

    # convert dict to json string by json.dumps() for body data. 
    resp = requests.get(API)

    pretty_print_request(resp.request)
    pretty_print_response(resp)

def test_post_jwt():
    API = BASE_URL + "/api/token/"

    # headers
    headers = {'Content-Type': 'application/json'}

    # body
    payload = {
        'username': 'spydirwebb',
        'password': 'Spiderman1'
    }
    # post
    resp = requests.post(API, data=json.dumps(payload,indent=4))  

    # print
    pretty_print_request(resp.request)
    pretty_print_response(resp)

test_post_jwt()