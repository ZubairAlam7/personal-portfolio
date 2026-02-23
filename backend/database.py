import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Vercel's read-only file system requires writing DB to /tmp/
if os.environ.get("VERCEL") == "1":
    DATABASE_URL = "sqlite:////tmp/portfolio.db"
else:
    DATABASE_URL = "sqlite:///./portfolio.db"

engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
