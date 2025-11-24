from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import json
import os
from datetime import datetime
from api import questions, answers, scoring, pdf_gen

# Load configuration
app = FastAPI(
    title="DigiMaturity API",
    description="Digital Maturity Assessment Platform API",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(questions.router, prefix="/api", tags=["Questions"])
app.include_router(answers.router, prefix="/api", tags=["Answers"])
app.include_router(scoring.router, prefix="/api", tags=["Scoring"])
app.include_router(pdf_gen.router, prefix="/api", tags=["PDF"])

@app.get("/")
async def root():
    return {
        "message": "DigiMaturity API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
async def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
