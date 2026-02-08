from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import Column, ForeignKey, Integer, String, Boolean, DateTime , Date,Text
# для определения таблицы и модели
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.sql import func
#from sqlalchemy.ext.declarative import declarative_base

# для создания отношений между таблицами
from sqlalchemy.orm import relationship, Session

# для настроек
from sqlalchemy import create_engine
from flask_login import UserMixin

# создание экземпляра declarative_base
class Base(DeclarativeBase): pass

class Users(UserMixin,Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    login = Column(String(250), nullable=False)
    password = Column(String(250), nullable=False)
    role = Column(String(20),nullable=False)
    props = relationship( "Props", back_populates="users", cascade="all, delete", passive_deletes=False)
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
        print('')

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    

class Props(Base):
    __tablename__ = 'props'
    id = Column(Integer, primary_key=True)
    name = Column(String(15))
    surname = Column(String(50))
    clas = Column(String(2))
    litera = Column(String(1))
    allergenies = Column(String(250))
    created_at =  Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    users = relationship("Users", back_populates="props")
  
# engine = create_engine('sqlite:///database.db')
# Base.metadata.create_all(engine)