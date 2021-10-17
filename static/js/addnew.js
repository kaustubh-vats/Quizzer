var question, option1, option2, option3, option4, correct, labelSelect, deletebutton, mainC, points, tags;
var selectoption1, selectoption2, selectoption3, selectoption4;
var myjsonarray = []
var id = []
var myCourseId = undefined;
function setCourseId(param){
    if(param == undefined) return ;
    myCourseId = param;
    mainC = document.querySelector('.main-content');
    let button = document.createElement('a');
    button.setAttribute('href','/leaderboard?course='+myCourseId);
    button.innerHTML = "Leaderboards"
    mainC.appendChild(button);
    return 'kaustubh';
}
function setCourseDesc(param1, param2, param3){
    if(param1 == undefined || param1 == "") return ;
    document.getElementById("name").value = param1;
    document.getElementById("desc").value = param2;
    document.getElementById("timelimit").value = param3;
    return 'kaustubh';
}
function myFunc(params){
    mainC = document.querySelector('.main-content');
    for(let i=0;i<params.length;i++){
        question = document.createElement('input');
        option1 = document.createElement('input');
        option2 = document.createElement('input');
        option3 = document.createElement('input');
        option4 = document.createElement('input');
        correct = document.createElement('select');
        labelSelect = document.createElement('label');
        deletebutton = document.createElement('button');
        points = document.createElement('input');
        tags = document.createElement('input');

        question.setAttribute('type','text');
        option1.setAttribute('type','text');
        option2.setAttribute('type','text');
        option3.setAttribute('type','text');
        option4.setAttribute('type','text');
        points.setAttribute('type','Number');
        tags.setAttribute('type','text');

        question.setAttribute('placeholder','Enter Question');
        option1.setAttribute('placeholder','Enter Option A');
        option2.setAttribute('placeholder','Enter Option B');
        option3.setAttribute('placeholder','Enter Option C');
        option4.setAttribute('placeholder','Enter Option D');
        points.setAttribute('placeholder','Points for this question');
        tags.setAttribute('placeholder','Enter space separated question tags');
        labelSelect.innerHTML = "Correct Answer";

        var selectoption1 = document.createElement('option');
        var selectoption2 = document.createElement('option');
        var selectoption3 = document.createElement('option');
        var selectoption4 = document.createElement('option');
        selectoption1.setAttribute('value','1');
        selectoption2.setAttribute('value','2');
        selectoption3.setAttribute('value','3');
        selectoption4.setAttribute('value','4');
        deletebutton.setAttribute('onclick','deletequestion(this)');
 
        selectoption1.innerHTML = "A";
        selectoption2.innerHTML = "B";
        selectoption3.innerHTML = "C";
        selectoption4.innerHTML = "D";

        correct.appendChild(selectoption1);
        correct.appendChild(selectoption2);
        correct.appendChild(selectoption3);
        correct.appendChild(selectoption4);

        correct.setAttribute('id','correct'+i);
        question.setAttribute('id','question'+i);
        option1.setAttribute('id','option1'+i);
        option2.setAttribute('id','option2'+i);
        option3.setAttribute('id','option3'+i);
        option4.setAttribute('id','option4'+i);
        deletebutton.setAttribute('id','delete'+i);
        labelSelect.setAttribute('id','label'+i);
        points.setAttribute('id','points'+i);
        tags.setAttribute('id','tags'+i);
        deletebutton.setAttribute('data-myval',i.toString());
        deletebutton.innerHTML = "Delete";

        question.value = params[i]['question'];
        option1.value = params[i]['option1'];
        option2.value = params[i]['option2'];
        option3.value = params[i]['option3'];
        option4.value = params[i]['option4'];
        points.value = params[i]['points'];
        tags.value = params[i]['tags'];
        

        if(params[i]['correct'] == 1){
            selectoption1.selected = true;
        } else if(params[i]['correct'] == 2){
            selectoption2.selected = true;
        } else if(params[i]['correct'] == 3){
            selectoption3.selected = true;
        } else if(params[i]['correct'] == 4){
            selectoption4.selected = true;
        }

        labelSelect.setAttribute('for','correct'+i);

        mainC.appendChild(question);
        mainC.appendChild(option1);
        mainC.appendChild(option2);
        mainC.appendChild(option3);
        mainC.appendChild(option4);
        mainC.appendChild(points);
        mainC.appendChild(tags);
        mainC.appendChild(labelSelect);
        mainC.appendChild(correct);
        mainC.appendChild(deletebutton);

        id.push(i.toString());
    }
    return 'kaustubh';
}
function deletequestion(elem){
    var data = elem.getAttribute('data-myval');
    
    question = document.getElementById('question'+data);
    option1 = document.getElementById('option1'+data);
    option2 = document.getElementById('option2'+data);
    option3 = document.getElementById('option3'+data);
    option4 = document.getElementById('option4'+data);
    correct = document.getElementById('correct'+data);
    labelSelect = document.getElementById('label'+data);
    points = document.getElementById('points'+data);
    tags = document.getElementById('tags'+data);

    question.remove();
    option1.remove();
    option2.remove();
    option3.remove();
    option4.remove();
    labelSelect.remove();
    correct.remove();
    points.remove();
    tags.remove();
    elem.remove();

    var filtered = id.filter(function(value, index, arr){ 
        return value != data;
    });
    id = filtered;
}

function addNewDom(){
    mainC = document.querySelector('.main-content');
    
    let i = 0;
    if(id.length!=0){
        i=id[id.length-1] + 1;
    }
    option1 = document.createElement('input');
    option2 = document.createElement('input');
    question = document.createElement('input');
    option3 = document.createElement('input');
    option4 = document.createElement('input');
    correct = document.createElement('select');
    labelSelect = document.createElement('label');
    deletebutton = document.createElement('button');
    points = document.createElement('input');
    tags = document.createElement('input');

    question.setAttribute('type','text');
    option1.setAttribute('type','text');
    option2.setAttribute('type','text');
    option3.setAttribute('type','text');
    option4.setAttribute('type','text');
    points.setAttribute('type','Number');
    tags.setAttribute('type','text');

    question.setAttribute('placeholder','Enter Question');
    option1.setAttribute('placeholder','Enter Option A');
    option2.setAttribute('placeholder','Enter Option B');
    option3.setAttribute('placeholder','Enter Option C');
    option4.setAttribute('placeholder','Enter Option D');
    points.setAttribute('placeholder','Points for this question');
    tags.setAttribute('placeholder','Enter space separated question tags');
    labelSelect.innerHTML = "Correct Answer";

    var selectoption1 = document.createElement('option');
    var selectoption2 = document.createElement('option');
    var selectoption3 = document.createElement('option');
    var selectoption4 = document.createElement('option');

    selectoption1.innerHTML = "A";
    selectoption2.innerHTML = "B";
    selectoption3.innerHTML = "C";
    selectoption4.innerHTML = "D";
    

    selectoption1.setAttribute('value','1');
    selectoption2.setAttribute('value','2');
    selectoption3.setAttribute('value','3');
    selectoption4.setAttribute('value','4');
    deletebutton.setAttribute('onclick','deletequestion(this)');
    
    correct.appendChild(selectoption1);
    correct.appendChild(selectoption2);
    correct.appendChild(selectoption3);
    correct.appendChild(selectoption4);

    correct.setAttribute('id','correct'+i);
    question.setAttribute('id','question'+i);
    option1.setAttribute('id','option1'+i);
    option2.setAttribute('id','option2'+i);
    option3.setAttribute('id','option3'+i);
    option4.setAttribute('id','option4'+i);
    labelSelect.setAttribute('id','label'+i);
    deletebutton.setAttribute('id','delete'+i);
    points.setAttribute('id','points'+i);
    tags.setAttribute('id','tags'+i);
    deletebutton.setAttribute('data-myval',i.toString());
    deletebutton.innerHTML = "Delete";

    labelSelect.setAttribute('for','correct'+i);
    points.value = 1;

    mainC.appendChild(question);
    mainC.appendChild(option1);
    mainC.appendChild(option2);
    mainC.appendChild(option3);
    mainC.appendChild(option4);
    mainC.appendChild(points);
    mainC.appendChild(tags);
    mainC.appendChild(labelSelect);
    mainC.appendChild(correct);
    mainC.appendChild(deletebutton);

    id.push(i.toString());
}
function submitForm(){
    var title = document.getElementById("name");
    var desc = document.getElementById("desc");
    var timelimit = document.getElementById("timelimit");
    if(title.value == ""){
        alert('Course Name is missing');
        return;
    }
    if(desc.value == ""){
        alert('Course Description is missing');
        return;
    }
    if(timelimit.value == ""){
        alert('timelimit is missing');
    }
    for(let i=0;i<id.length;i++)
    {
        question = document.getElementById('question'+id[i]);
        option1 = document.getElementById('option1'+id[i]);
        option2 = document.getElementById('option2'+id[i]);
        option3 = document.getElementById('option3'+id[i]);
        option4 = document.getElementById('option4'+id[i]);
        correct = document.getElementById('correct'+id[i]);
        points = document.getElementById('points'+id[i]);
        tags = document.getElementById('tags'+id[i]);
        if(question.value == "" || option1.value == "" || option2.value == "" || option3.value == "" || option4.value == "" || points.value == ""){
            alert("Some Fields are missing");
            return;
        }
        myJson = {
            "question":question.value,
            "option1":option1.value,
            "option2":option2.value,
            "option3":option3.value,
            "option4":option4.value,
            "points":points.value,
            "correct":correct.options[correct.selectedIndex].value,
            "tags":tags.value
        };
        myjsonarray.push(myJson);
    }
    
    if(myCourseId != undefined){
        myarr = {
            'data':myjsonarray,
            'name': title.value,
            'timelimit' :timelimit.value,
            'description':desc.value,
            'id':myCourseId
        }
        sendReq(myarr);
    }
    else {
        myarr = {
            'data':myjsonarray,
            'name': title.value,
            'timelimit' :timelimit.value,
            'description':desc.value
        }
        sendReq(myarr);
    }
}
async function delCourse(){
    if(myCourseId != undefined){
        myarr = {'id':myCourseId}
        await fetch('/delCourse', {
            method: "POST", 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(myarr)
        }).then(function (response) {
            return response.json();
        }).then(function (text) {
            if(text['response']=='success'){
                window.location.replace("/teacher");
            } else {
                alert('Failed to delte');
            }
        });
    } else {
        console.log('This course is not saved yet');
    }
}
async function sendReq(myarr){
    await fetch('/save', {
        method: "POST", 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(myarr)
    }).then(function (response) {
        return response.json();
    }).then(function (text) {
        if(text['response']=='success'){
            alert('Success');
        } else {
            alert('Failed to save');
        }
    });
}