#import hashlib
import os
import json
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import ValidationError, DataRequired, Email, EqualTo
from flask_wtf.file import FileField, FileRequired, FileAllowed

from flask import Flask, render_template, redirect, url_for, request,jsonify, session as sess_fl,flash,send_from_directory,abort
from flask import current_app
from sqlalchemy import create_engine,insert,or_
import sqlalchemy as sa
from sqlalchemy.orm import sessionmaker
from app.models import Base, Users, Props, Menu, Orders
from flask_login import LoginManager, UserMixin, login_required,current_user, login_user,logout_user
from werkzeug.security import check_password_hash, generate_password_hash
#from flask_uploads import UploadSet, configure_uploads, IMAGES
#from werkzeug.utils import secure_filename
#from app.form import RegistrationForm, patch_request_class

from config import DevelopmentConfig,RootPath, Config

basedir = os.path.abspath(os.path.dirname(__file__))

engine = create_engine('sqlite:///app/database.db', echo=True)
Base.metadata.bind = engine

DBSession = sessionmaker(bind=engine)
sess_SA = DBSession()

app = Flask(__name__, template_folder='templates', static_folder='static')
app.config.from_object(DevelopmentConfig)
secret_key = os.environ.get('SECRET_KEY') #'123456789'
print(app.secret_key)
login_manager = LoginManager(app)
login_manager.login_view = 'login'

base_data = {}

class User(UserMixin):
    pass

@login_manager.user_loader
def load_user(id):
  return sess_SA.get(Users, int(id))

class RegistrationForm(FlaskForm):
    login = StringField('login', validators=[DataRequired()])
    # email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    password2 = PasswordField(
        'Repeat Password', validators=[DataRequired(), EqualTo('password')])
    name = StringField('name', validators=[DataRequired()])
    surname = StringField('surname', validators=[DataRequired()])
    clas = StringField('clas', validators=[DataRequired()])
    litera = StringField('litera', validators=[DataRequired()])
    submit = SubmitField('Register')

    def validate_username(self, username):
        print(username.data)
        user = sess_SA.query(Users).filter(Users.login == username.data).first()
        if user is not None:
            raise ValidationError('Please use a different username.')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if current_user.is_authenticated:
        return redirect(url_for('login'))
    form = RegistrationForm()
    print(form.validate_on_submit())
    if form.validate_on_submit():
        print(form.login.data)
        user = Users(login=form.login.data,password = generate_password_hash(form.password.data),role='ученик')#, email=form.email.data 
        props = Props(name=form.name.data,surname=form.surname.data,clas=form.clas.data,litera=form.litera.data)
        print(user.login,user.password,'pass')
        sess_SA.add(user)
        sess_SA.commit()
        user1 = sess_SA.query(Users).filter(Users.login == form.login.data).one()
        props = Props(name=form.name.data,surname=form.surname.data,clas=form.clas.data,litera=form.litera.data,user_id=user1.id)
        sess_SA.add(props) #execute(insert(Users),user)
        sess_SA.commit()
        flash('Congratulations, you are now a registered user!')
        return redirect(url_for('menu'))
    return render_template('signup.html', title='Register', form=form)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        login = request.form['login']
        password = request.form['password']
        user = sess_SA.scalar(sa.select(Users).where(Users.login == login))
        #user = sess_SA.query(Users).filter(Users.login == username).one()#sess_SA.query(Users).filter_by(Users.login == username).one()
        print(login,password)
        
        if user and check_password_hash(user.password, password):
            print(user)
            #load_user(user.id)
            login_user(user)
            return redirect('/')
    return render_template('login.html')

@app.route('/logout')
def logout():
    
    logout_user()
    return redirect(url_for('index'))


@app.route('/')
def menu():
    #user_alerg_input = ["nuts","eggs"]

    eda = sess_SA.query(Menu).all()
    print(current_user.id)
    userdata = sess_SA.query(Props).filter(Props.user_id == current_user.id).one()
    ##setattr(userdata, 'allergenies', json.dumps(user_alerg_input))
    print(getattr(userdata,"allergenies"))
    #sess_SA.commit()

    user_alerg_input = getattr(userdata,'allergenies')
    print('ds',json.loads(user_alerg_input)[0])
    username = {}
    username["surname"] = getattr(userdata, "surname")
    username["name"] = getattr(userdata, "name")
    print(username['name'])
    data = {}
    data['menu'] = []
    user_alerg=json.loads(getattr(userdata,"allergenies"))
    print(user_alerg)
    for menu in eda:
        menu_row = {}
        menu_alerg = json.loads(getattr(menu, "allergenies"))
        view = True
        for al_u in user_alerg:
            for al_m in menu_alerg:
                if al_u == al_m:
                    view=False
        if view:
            for key in Menu.__table__.columns.keys():
                menu_row[key] = getattr(menu, key)
            
            data['menu'].append(menu_row)
        
    print('menu',len(data['menu']),len(eda))
    if current_user.is_authenticated:
        return render_template('new.html',data=data,username=username)
    else:
        return render_template('main.html')
@app.route('/povar')
def b():
    return render_template('povar.html')
    
    