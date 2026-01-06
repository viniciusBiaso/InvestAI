
import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

# Load env vars
load_dotenv()

# Get URL
database_url = os.getenv("DATABASE_URL")
if not database_url:
    print("❌ ERROR: DATABASE_URL not set in .env")
    exit(1)

# Fix deprecated schema if present (Supabase gives postgres://, SQLAlchemy wants postgresql://)
if database_url.startswith("postgres://"):
    database_url = database_url.replace("postgres://", "postgresql://", 1)

print(f"🔄 Connecting to: {database_url.split('@')[1]}") # Print only host for security

try:
    # Connect
    engine = create_engine(database_url)
    with engine.connect() as connection:
        result = connection.execute(text("SELECT version();"))
        version = result.fetchone()[0]
        print("✅ SUCCESS: Connected to Supabase!")
        print(f"📊 Version: {version}")
except Exception as e:
    print("❌ CONNECTION FAILED")
    print(e)
