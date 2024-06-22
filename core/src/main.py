from fastapi import FastAPI

from web import engine_routes
from web import chat_routes


app = FastAPI()
app.include_router(engine_routes.router)
app.include_router(chat_routes.router)


@app.get("/")
async def root():
    return {"message": "Hello World"}


# To run:
# uvicorn src.web.main:app --reload

# if __name__ == "__main__":
#     uvicorn.run('main:app', host="127.0.0.1", port=8000, reload=True)