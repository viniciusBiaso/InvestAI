from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

import os
from dotenv import load_dotenv

load_dotenv()

# Default to SQLite if DATABASE_URL not set (for safety), but prefer Postgres
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./users.db")
# If using Supabase/Postgres, ensure the URL starts with postgresql://
if SQLALCHEMY_DATABASE_URL.startswith("postgres://"):
    SQLALCHEMY_DATABASE_URL = SQLALCHEMY_DATABASE_URL.replace("postgres://", "postgresql://", 1)

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, 
    # check_same_thread is ONLY for SQLite. We must remove it for Postgres.
    # We can use connect_args={} for Postgres or conditionally set it.
    connect_args={"check_same_thread": False} if "sqlite" in SQLALCHEMY_DATABASE_URL else {}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
