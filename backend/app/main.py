from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import scoring, applications

app = FastAPI(
    title="AI与信審査システム API",
    description="機械学習を用いた与信スコアリングAPI",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(scoring.router, prefix="/api/scoring", tags=["scoring"])
app.include_router(applications.router, prefix="/api/applications", tags=["applications"])


@app.get("/health")
def health_check():
    return {"status": "ok"}
