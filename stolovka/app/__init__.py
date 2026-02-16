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
from app.models import Base, Users, Props, Menu, Orders, Products, Order_products
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
        print('spamten',login,password)
        
        if user and check_password_hash(user.password, password):
            print(user)
            #load_user(user.id)
            login_user(user)
            if current_user.role == 'админ':
                return redirect('/admin')
            elif current_user.role == 'повар':
                return redirect('/povar')
            else:
                return redirect('/')

    return render_template('auth.html')

@app.route('/logout')
def logout():
    
    logout_user()
    return redirect(url_for('menu'))


@app.route('/')
def menu():
    #user_alerg_input = ["nuts","eggs"]
    if current_user.is_authenticated:
        eda = sess_SA.query(Menu).all()
        print('spamtenna', current_user.id)
        userdata = sess_SA.query(Props).filter(Props.user_id == current_user.id).one()
        ##setattr(userdata, 'allergenies', json.dumps(user_alerg_input))
        print('spamtennnnnnn',getattr(userdata,"allergenies"))
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
        
        return render_template('student.html',title = 'Главная',data=data,username=username)
    else:
        return render_template('main.html',title='Школьная столовая')
@app.route('/povar')
def b():
    userdata = sess_SA.query(Props).filter(Props.user_id == current_user.id).one()
    username = {}
    username["surname"] = getattr(userdata, "surname")
    username["name"] = getattr(userdata, "name")
    # add_product(request.form['name'])
    return render_template('povar.html',)

@app.route('/admin', methods=['GET', 'POST'])
def admin():
    # form = RegistrationForm()
    # print(form.validate_on_submit())
    # if form.validate_on_submit():
    #     if current_user.role == 'повар':
    #         return redirect(url_for('/'))
    #     elif current_user.role == 'ученик':
    #         return redirect(url_for('/'))
    #     else:
    #         print(form.login.data)
    #         user = Users(login=form.login.data,password = generate_password_hash(form.password.data))#, email=form.email.data 
    #         props = Props(name=form.name.data,surname=form.surname.data,clas=1,role='повар')
    #         print(user.login,user.password,'pass')
    #         sess_SA.add(user)
    #         sess_SA.commit()
    #         user1 = sess_SA.query(Users).filter(Users.login == form.login.data).one()
    #         props = Props(name=form.name.data,surname=form.surname.data,user_id=user1.id)
    #         sess_SA.add(props) #execute(insert(Users),user)
    #         sess_SA.commit()
    #         flash('Congratulations, you are now a registered user!')

    #         menu = Menu()

            return render_template('admin.html', title='Register')
    
# @app.route('/add',methods=['GET','POST'])   
# def add():

#     new_item = {}
#     if request.method == 'POST':
#         if request.form:
            
#             new_item['name']=request.form['name']               
#             new_item['type']=request.form['type'] 
#             new_item['desc']=request.form['desc'] 
#             new_item['products']=request.form['products'] 
#             new_item['cost']=request.form['cost'] 
#             sess_SA.execute(insert(Menu),[new_item])
#             sess_SA.commit()
#     return render_template('admin.html',edit_val=new_item)

# @app.route('/add_product',methods=['GET','POST'])   
# def add_product():

#     new_item = {}
#     if request.method == 'POST':
#         if request.form:
#             new_item['name']=request.form['name']               
#             new_item['ed']=request.form['ed'] 
#             sess_SA.execute(insert(Products),[new_item])
#             sess_SA.commit()
#     return jsonify(status = 'ok',edit_val = new_item)
    
