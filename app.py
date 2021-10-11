from flask import Flask, send_from_directory, render_template, request, url_for, redirect, session
import json
from flask_sqlalchemy import SQLAlchemy
import hashlib
import random
import os
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///db/courseapp.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
app.secret_key = 'ab-akshit-course-site-cd'

class LoginData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(200), nullable=False)
    password = db.Column(db.String(2000), nullable=False)
    category = db.Column(db.String(10), default="student")
    def __repr__(self) -> str:
        return f"{self.id} : {self.username}"

class CourseData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200),nullable=False)
    description = db.Column(db.String(2000),nullable=False)
    author = db.Column(db.String(200),nullable=False)
    authorId = db.Column(db.Integer,nullable=False)
    timeLimit = db.Column(db.Integer,default=0)

    def __repr__(self) -> str:
        return f"{self.id} : {self.name}"

class QuizData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    courseId = db.Column(db.Integer,nullable=False)
    question = db.Column(db.String(200),nullable=False)
    option1 = db.Column(db.String(200),nullable=True)
    option2 = db.Column(db.String(200),nullable=True)
    option3 = db.Column(db.String(200),nullable=True)
    option4 = db.Column(db.String(200),nullable=True)
    correct_option = db.Column(db.Integer,nullable=False)
    tags = db.Column(db.String(2000),nullable=True)
    points = db.Column(db.Integer,default=1)
    def __repr__(self) -> str:
        return f"{self.id} : {self.question}"

class MarksData(db.Model):
    id = db.Column(db.Integer,primary_key = True)
    studentId = db.Column(db.Integer,nullable=False)
    studentName = db.Column(db.Integer,nullable=False)
    courseId = db.Column(db.Integer,nullable=False)
    score = db.Column(db.Integer,nullable=False)
    def __repr__(self) -> str:
        return f"{self.id} : {self.question}"

@app.route('/')
def home():
    if('user' in session):
        if(session['category'] == 'teacher'):
            return redirect(url_for('teacher'))
        else:
            return redirect(url_for('dashboard'))
    else:
        return redirect(url_for('login'))  

@app.route('/favicon.ico') 
def favicon(): 
    return send_from_directory(os.path.join(app.root_path, 'static'), 'favicon/favicon.ico', mimetype='image/vnd.microsoft.icon')


@app.route('/register',methods = ['POST','GET'])
def register():
    if request.method == 'POST':
        data = request.form
        username = data['username']
        if(' ' in username):
            err = {"error":"Username Should not have Spaces"}
            return render_template('register.html',data=err)
        password = hashlib.sha256(str(data['password']).encode()).hexdigest()
        category = data['type']
        user = db.session.query(LoginData.id).filter_by(username=username).first()
        if(user==None):
            logindata = LoginData(username=username,password=password,category=category)
            db.session.add(logindata)
            db.session.commit()
            session['user']=username
            session['category']=category
            session['id'] = logindata.id
            if category == 'teacher':
                return redirect(url_for('teacher'))
            else:
                return redirect(url_for('dashboard'))
        else:
            err = {"error":"Username Already Exist"}
            return render_template('register.html',data=err)
    return render_template('register.html',data={})

@app.route('/login',methods = ['POST','GET'])
def login():
    if request.method == 'POST':
        data = request.form
        username = data['username']
        if(' ' in username):
            err = {"error":"Username Should not have Spaces"}
            return render_template('login.html',data=err)
        user = LoginData.query.filter_by(username=username).first()
        if(user==None):
            err = {"error":"No Userfound for this username"}
            return render_template('login.html',data=err)
        else:
            password = hashlib.sha256(str(data['password']).encode()).hexdigest()
            if password == user.password:
                session['user']=username
                session['category']=user.category
                session['id'] = user.id
                if user.category == 'teacher':
                    return redirect(url_for('teacher'))
                else:
                    return redirect(url_for('dashboard'))
            else:
                err = {'error':"Wrong Pasword"}
                return render_template('login.html',data=err)
    return render_template('login.html',data={})

@app.route('/dashboard')
def dashboard():
    if('user' in session):
        data = []
        courses = CourseData.query.all()
        for x in courses:
            dTemp = {}
            dTemp['name'] = x.name
            dTemp['description'] = x.description
            dTemp['author'] = x.author
            dTemp['authoId'] = x.authorId
            dTemp['id'] = x.id
            data.append(dTemp)
        return render_template('index.html',username=session['user'],data=json.dumps(data))
    else:
        return redirect(url_for('login'))

@app.route('/teacher')
def teacher():
    if('user' in session):
        course_list = CourseData.query.filter_by(authorId = session['id']).all()
        mydict = []
        for x in course_list:
            dTemp = {}
            dTemp['name'] = x.name
            dTemp['description'] = x.description
            dTemp['author'] = x.author
            dTemp['authoId'] = x.authorId
            dTemp['id'] = x.id
            mydict.append(dTemp)
            
        return render_template('teacher.html',username=session['user'],course_list=json.dumps(mydict))
    else:
        return redirect(url_for('login'))

@app.route('/logout')
def logout():
    if('user' in session):
        session.clear()
    return redirect(url_for('login'))

@app.route('/leaderboard')
def leaderboard():
    if 'user' in session:
        course = request.args.get('course')
        data = []
        if(course==None):
            marksData = db.engine.execute('SELECT studentName, sum(score) FROM marks_data GROUP BY studentname Order By sum(score) DESC')
            rank = 1
            for row in marksData:
                tData = {}
                tData['username'] = row[0]
                tData['rank'] = rank
                tData['points'] = row[1]
                data.append(tData)
                rank=rank+1
            return render_template('leaderboard.html',data=data)
        else:
            marksData = db.engine.execute(f'SELECT studentName, score from marks_data where courseId = {course} order by score desc')
            rank = 1
            for row in marksData:
                tData = {}
                tData['username'] = row[0]
                tData['rank'] = rank
                tData['points'] = row[1]
                data.append(tData)
                rank=rank+1
            return render_template('leaderboard.html',data=data)

    else:
        return redirect(url_for('login'))

@app.route('/addnew',methods=['GET','POST'])
def addnew():
    if 'user' in session and session['category']=='teacher':
        course = request.args.get('course')
        data = []
        if course == None:
            return render_template('addnew.html',data=data,name="",timelimit="",desc="",courseId="")
        else:
            coursedata = CourseData.query.filter_by(id=course).first();
            if(coursedata.author == session['user']):
                quizdata = QuizData.query.filter_by(courseId=course).all();
                for x in quizdata:
                    dTemp = {}
                    dTemp['question'] = x.question
                    dTemp['option1'] = x.option1
                    dTemp['option2'] = x.option2
                    dTemp['option3'] = x.option3
                    dTemp['option4'] = x.option4
                    dTemp['correct'] = x.correct_option
                    dTemp['points'] = x.points
                    dTemp['tags'] = x.tags
                    data.append(dTemp)
                return render_template('addnew.html',data=data,name=coursedata.name,timelimit=coursedata.timeLimit,desc=coursedata.description,courseId=str(course))
            else:
                err = 'Unauthorized Access'
                render_template("error.html",error=err)
        
    else:
        err = 'Unauthorized Access'
        render_template("error.html",error=err)

@app.route('/save',methods = ['POST'])
def saveCourse():
    if 'user' in session and session['category']=='teacher':
        if request.method == 'POST':
            data = request.json
            courseData = None
            if 'id' in data:
                courseData = CourseData.query.filter_by(id=int(data['id'])).first()
                if(courseData.author != session['user']):
                    return {"response":"failed"}
                courseData.name = data['name']
                db.session.commit()
                courseData.description == data['description']
                db.session.commit()
                courseData.timeLimit = int(float(data['timelimit']))
                db.session.commit()
                QuizData.query.filter_by(courseId = int(data['id'])).delete()
                db.session.commit()
            else:
                courseData = CourseData(name=data['name'], description=data['description'], author=session['user'], authorId = session['id'],timeLimit = int(float(data['timelimit'])))
                db.session.add(courseData)
                db.session.commit()

            for x in data['data']:
                quizData = QuizData(courseId = courseData.id, question = x['question'], option1=x['option1'], option2=x['option2'], option3=x['option3'],option4 = x['option4'],correct_option=x['correct'],points=x['points'],tags=x['tags'])
                db.session.add(quizData)
                db.session.commit()

            return {"response":"success"}
        else:
            return {"response":"fail"}
    else:
        return {"response":"fail"}

@app.route('/delCourse',methods = ['POST'])
def deleteCourse():
    if 'user' in session and session['category']=='teacher':
        if request.method == 'POST':
            data = request.json
            courseData = CourseData.query.filter_by(id=int(data['id'])).first()
            if(courseData.author == session['user']):
                QuizData.query.filter_by(courseId=int(data['id'])).delete()
                db.session.commit()
                CourseData.query.filter_by(id=int(data['id'])).delete()
                db.session.commit()
                return {"response":"success"}
            else:
                return {"response":"fail"}
        else:
            return {"response":"fail"}
    else:
        return {"response":"fail"}

@app.route('/profile')
def profile():
    if 'user' in session:
        username = request.args.get('username')
        marks = 0
        if username==None:
            marksDb = MarksData.query.filter_by(studentId=session['id']).all()
            username = session['user']
        else:
            marksDb = MarksData.query.filter_by(studentName=username).all()
            userdata = LoginData.query.filter_by(username=username).first()
            if userdata == None:
                err = 'No Such User Found'
                return render_template('error.html',error=err)

        for x in marksDb:
            marks += float(x.score)

        return render_template('profile.html',username=username,marks=marks,courses=len(marksDb))
    else:
        return redirect(url_for('login'))

@app.route('/startTest')
def startTest():
    if 'user' in session:
        if session['category'] == 'student':
            courseId = request.args.get('course')
            courseData = CourseData.query.filter_by(id = courseId).first()
            if courseData == None:
                err = 'No Such Course Found'
                return render_template('error.html',error=err)
            duration = courseData.timeLimit
            courseName = courseData.name
            author = courseData.author
            mcqs = QuizData.query.filter_by(courseId = courseId).all()
            data = []
            marks = MarksData.query.filter_by(courseId=courseId, studentName=session['user']).first()
            if marks == None:
                for x in mcqs:
                    dTemp = {}
                    dTemp['id'] = x.id
                    dTemp['question'] = x.question
                    dTemp['option1'] = x.option1
                    dTemp['option2'] = x.option2
                    dTemp['option3'] = x.option3
                    dTemp['option4'] = x.option4
                    dTemp['correct'] = x.correct_option
                    dTemp['points'] = x.points
                    dTemp['tags'] = x.tags
                    data.append(dTemp)
                random.shuffle(data)
                return render_template('startTest.html',timelimit=duration,courseId=courseId,data = data,marks=-1,author=author,courseName=courseName)
            else:
                dTemp = {}
                dTemp['id'] = 'demo'
                dTemp['question'] = 'demo'
                dTemp['option1'] = 'demo'
                dTemp['option2'] = 'demo'
                dTemp['option3'] = 'demo'
                dTemp['option4'] = 'demo'
                dTemp['correct'] = 'demo'
                dTemp['points'] = 'demo'
                dTemp['tags'] = 'demo'
                data.append(dTemp)
                return render_template('startTest.html',data=data,timelimit=duration, courseId=courseId,marks = marks.score,author=author,courseName=courseName)
        else:
            err = 'Unauthorized Acceess'
            return render_template('error.html',error=err)
    else:
        return redirect(url_for('login'))

@app.route('/saveResponse',methods=['POST'])
def saveResponse():
    if 'user' in session:
        if request.method == 'POST':
            data = request.json
            courseId = data['courseId']
            scr = 0
            for itr in data['resp']:
                quizdata = QuizData.query.filter_by(id = itr['id']).first()
                if(quizdata.correct_option == itr['resp']):
                    scr = scr + quizdata.points
            marksdata = MarksData(studentId=session['id'], studentName=session['user'], courseId = courseId, score = scr)
            db.session.add(marksdata)
            db.session.commit()
            return {'response':'success','score':str(scr)}
        else:
            return {'response':'fail'}
    else:
        return {'response':'fail'}

@app.errorhandler(404)
def page_not_found(e):
    return render_template('forbidden.html',errorcode="404",errormessage="Look like you're lost",errordetails="the page you are looking for not avaible!"), 404

@app.errorhandler(500)
def page_not_found(e):
    return render_template('forbidden.html',errorcode="500",errormessage="It's Not you It's Us",errordetails="Internal Server error, We regret your inconvinience"), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True)
