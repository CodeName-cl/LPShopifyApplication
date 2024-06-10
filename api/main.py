import requests
from fastapi import FastAPI, Header
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()


# add cors
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/bsale/proxy")
def bsale_proxy_get(access_token: str = Header(None)):
    print("access_token", access_token)
    # TODO: move url to argument to make it more general
    response = requests.get(
        "https://api.bsale.cl/v1/offices.json",
        headers={"access_token": access_token}
    )
    return response.json()


@app.post("/bsale/proxy")
def bsale_proxu_post():
    return {"Hello": "World"}
