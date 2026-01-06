from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
from typing import Optional
from pydantic import BaseModel

import models, auth, database

# Create tables
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

# Startup Event: Seed Admin
@app.on_event("startup")
def startup_db_client():
    # Recreate DB for schema update if needed (For prod, use Alembic)
    # models.Base.metadata.drop_all(bind=database.engine) 
    models.Base.metadata.create_all(bind=database.engine)
    
    db = database.SessionLocal()
    try:
        admin_email = "admin@investai.com"
        existing_admin = db.query(models.User).filter(models.User.email == admin_email).first()
        if not existing_admin:
            print("Creating Admin User...")
            hashed_pw = auth.get_password_hash("admin123")
            admin = models.User(
                name="Super Admin",
                email=admin_email,
                hashed_password=hashed_pw,
                profile="admin",
                is_verified=True
            )
            db.add(admin)
            db.commit()
            print("Admin User Created: admin@investai.com / admin123")
    finally:
        db.close()

# Pydantic Models
class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    profile: Optional[str] = None
    is_verified: bool = False
    
    class Config:
        orm_mode = True

# Dependency
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = auth.jwt.decode(token, auth.SECRET_KEY, algorithms=[auth.ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except auth.JWTError:
        raise credentials_exception
    
    user = db.query(models.User).filter(models.User.email == email).first()
    if user is None:
        raise credentials_exception
    return user

@app.post("/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = auth.get_password_hash(user.password)
    # Profile starts as None (requires onboarding)
    # is_verified starts as False (requires email check)
    db_user = models.User(
        email=user.email, 
        name=user.name, 
        hashed_password=hashed_password, 
        profile=None,
        is_verified=False
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    print(f"--- MOCK EMAIL SENT TO {user.email} ---")
    print(f"--- VERIFY LINK: http://localhost:5173/verify-email?email={user.email} ---")
    return db_user

@app.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    # Note: OAuth2PasswordRequestForm expects 'username', but we treat it as 'email'
    user = db.query(models.User).filter(models.User.email == form_data.username).first()
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/forgot-password")
def forgot_password(email: str):
    # Mock endpoint
    return {"message": "If this email exists, a reset link has been sent."}

@app.put("/users/me/profile", response_model=UserResponse)
def update_profile(profile: str, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    current_user.profile = profile
    db.commit()
    db.refresh(current_user)
    return current_user

@app.post("/verify-email")
def verify_email(email: str, db: Session = Depends(get_db)):
    # Mock endpoint to force verification
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.is_verified = True
    db.commit()
    return {"message": "Email verified successfully"}

@app.get("/users/me", response_model=UserResponse)
def read_users_me(current_user: models.User = Depends(get_current_user)):
    return current_user

# --- CHAT ENDPOINTS ---

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str
    
@app.post("/chat/message", response_model=ChatResponse)
def chat_message(request: ChatRequest, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    # 1. Retrieve User Profile
    profile = current_user.profile or "undefined"
    
    # 2. Simulate AI Analysis (Mock Logic)
    # In a real app, this would be a call to openai.ChatCompletion or similar
    
    import time
    time.sleep(1.5) # Simulate thinking
    
    user_msg = request.message.lower()
    
    # System Prompt Injection Simulation
    ai_context = f"[SYSTEM: User is {profile}. Focus on risk management.]"
    
    response_text = ""
    
    if "analisar" in user_msg or "carteira" in user_msg:
        if profile == "conservative":
            response_text = f"""
**Análise de Carteira (Perfil Conservador)**

Notei que você prioriza segurança. Sua carteira atual está bem posicionada, mas considere:

1.  **Aumentar Renda Fixa**: Títulos do Tesouro IPCA+ oferecem proteção contra inflação.
2.  **Reduzir Volatilidade**: Evite exposição excessiva a criptoativos neste momento.

| Ativo | Recomendação | Risco |
| :--- | :--- | :--- |
| Tesouro Selic | Manter/Aumentar | Baixo |
| Ações Dividendos | Manter | Médio |
| Bitcoin | Reduzir | Alto |

*Lembre-se: O foco é preservar seu patrimônio.*
            """
        elif profile == "aggressive":
             response_text = f"""
**Análise de Carteira (Perfil Agressivo)**

Você busca maximizar retornos. Vejo oportunidades interessantes:

*   **Diversificação em Cripto**: O mercado apresenta correções que podem ser pontos de entrada.
*   **Ações de Crescimento**: Setor de tecnologia segue volátil, porém promissor.

> **Alerta de Risco**: Sua exposição atual exige estômago para oscilações de até -20% no curto prazo. Esteja preparado.
            """
        else: # Moderate/Undefined
             response_text = """
**Análise Geral**

Sua carteira parece equilibrada. Para otimizar:
*   Mantenha 40% em Renda Fixa para liquidez.
*   Explore Fundos Imobiliários (FIIs) para renda passiva.
            """

    elif "cdi" in user_msg:
        response_text = "O **CDI (Certificado de Depósito Interbancário)** é a taxa que os bancos cobram para emprestar dinheiro entre si. Ele baliza a maioria dos investimentos de Renda Fixa no Brasil. Hoje, se seu investimento rende 100% do CDI, ele está acompanhando a taxa básica de juros da economia."
        
    elif "ajuda" in user_msg or "oi" in user_msg:
        response_text = f"Olá, {current_user.name}! Sou seu **Advisor AI Pessoal**. \n\nComo seu perfil é **{profile.upper()}**, posso te ajudar a:\n\n*   Analisar riscos da sua carteira.\n*   Explicar termos complexos.\n*   Sugerir rebalanceamentos.\n\nO que vamos ver hoje?"
        
    else:
        response_text = f"Entendi sua dúvida sobre '{request.message}'. \n\nConsiderando seu perfil **{profile}**, recomendo cautela. Investimentos neste setor exigem análise detalhada dos fundamentos. \n\nPosso gerar um relatório mais profundo se quiser."

    return {"response": response_text.strip()}

# CORS (Allow Frontend)
from fastapi.middleware.cors import CORSMiddleware
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
