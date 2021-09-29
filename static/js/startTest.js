var questions = [];
var options1 = [];
var options2 = [];
var options3 = [];
var options4 = [];
var corrects = [];
var userResponses = [];
var points = [];
var tags = [];
var tLimit = 0;
var curr = 0;
var question, option1, option2, option3, option4, pointsDiv, tagdiv;
var tags = [];
var flg;
var option1label, option2label, option3label, option4label;
var mainDiv, testDiv;
var courseId;
function myFunc(params){
    if(params.length == 0){
        var button = document.getElementById('startTest');
        button.disabled = true;
        alert('No question Found for this test');
    } else {
        for(let i=0;i<params.length;i++)
        {
            questions.push(params[i]['question']);
            options1.push(params[i]['option1']);
            options2.push(params[i]['option2']);
            options3.push(params[i]['option3']);
            options4.push(params[i]['option4']);
            corrects.push(params[i]['correct']);
            points.push(params[i]['points']);
            tags.push(params[i]['tags']);
            userResponses.push(0);
        }
    }
    return 'kaustubh';
}
function myTimeL(params){
    tLimit = params;
    return 'kaustubh';
}
function myScr(params){
    if(params != -1){
        var scrP = document.getElementById('score');
        scrP.innerHTML = "Score: "+params;
        var button = document.getElementById('startTest');
        button.disabled = true;
        alert('You have already submited this test');
    }
    return 'kaustubh';
}
function myCourseId(params){
    courseId = params;
    return 'kaustubh'
}
function startTest(){
    question = document.getElementById('question');
    option1 = document.getElementById('option1');
    option2 = document.getElementById('option2');
    option3 = document.getElementById('option3');
    option4 = document.getElementById('option4');
    option1label = document.getElementById('option1Label');
    option2label = document.getElementById('option2Label');
    option3label = document.getElementById('option3Label');
    option4label = document.getElementById('option4Label');
    tagdiv = document.getElementById('tagDiv');
    pointsDiv = document.getElementById('points');

    question.innerHTML = questions[curr];
    option1label.innerHTML = options1[curr];
    option2label.innerHTML = options2[curr];
    option3label.innerHTML = options3[curr];
    option4label.innerHTML = options4[curr];
    pointsDiv.innerHTML = "Points : "+points[curr];
    removeAllChildNodes(tagdiv);

    let p = document.createElement('p');
    p.style.display = 'inline-block';
    p.innerHTML = "Tags : ";
    tagdiv.appendChild(p);

    const myArr = tags[curr].split(" ");
    for(let i=0;i<myArr.length;i++){
        let tag = document.createElement('p');
        tag.setAttribute('class','tags');
        tag.innerHTML = myArr[i];
        tagdiv.appendChild(tag);
    }

    mainDiv = document.getElementById('main-basic');
    testDiv = document.getElementById('main-test');

    mainDiv.style.display="none";
    testDiv.style.display="block";

    activateTimer(tLimit);
}
function previous(){
    if(curr > 0){
        let ansdiv = document.querySelector('input[name="option"]:checked');
        let ans = "0";
        if(ansdiv != null)
           ans = ansdiv.value;
        userResponses[curr] = parseInt(ans);
        curr--;
        if(userResponses[curr]!=0){
            let selectedOption = document.getElementById('option'+userResponses[curr]);
            selectedOption.checked = true;
        } else {
            let selectedOption = document.getElementById('option'+1);
            selectedOption.checked = false;
            selectedOption = document.getElementById('option'+2);
            selectedOption.checked = false;
            selectedOption = document.getElementById('option'+1);
            selectedOption.checked = false;
            selectedOption = document.getElementById('option'+1);
            selectedOption.checked = false;
        }
        removeAllChildNodes(tagdiv);

        let p = document.createElement('p');
        p.style.display = 'inline-block';
        p.innerHTML = "Tags : ";
        tagdiv.appendChild(p);

        const myArr = tags[curr].split(" ");
        for(let i=0;i<myArr.length;i++){
            let tag = document.createElement('p');
            tag.setAttribute('class','tags');
            tag.innerHTML = myArr[i];
            tagdiv.appendChild(tag);
        }
        question.innerHTML = questions[curr];
        option1label.innerHTML = options1[curr];
        option2label.innerHTML = options2[curr];
        option3label.innerHTML = options3[curr];
        option4label.innerHTML = options4[curr];
        pointsDiv.innerHTML = "Points : "+points[curr];
    }
    return 'kaustubh'
}
function nextQuest(){
    if(curr < questions.length-1){
        let ansdiv = document.querySelector('input[name="option"]:checked');
        let ans = "0";
        if(ansdiv != null)
           ans = ansdiv.value;
        userResponses[curr] = parseInt(ans);
        curr++;
        if(userResponses[curr]!=0){
            var selectedOption = document.getElementById('option'+userResponses[curr]);
            selectedOption.checked = true;
        } else {
            let selectedOption = document.getElementById('option'+1);
            selectedOption.checked = false;
            selectedOption = document.getElementById('option'+2);
            selectedOption.checked = false;
            selectedOption = document.getElementById('option'+1);
            selectedOption.checked = false;
            selectedOption = document.getElementById('option'+1);
            selectedOption.checked = false;
        }
        removeAllChildNodes(tagdiv);

        let p = document.createElement('p');
        p.style.display = 'inline-block';
        p.innerHTML = "Tags : ";
        tagdiv.appendChild(p);

        const myArr = tags[curr].split(" ");
        for(let i=0;i<myArr.length;i++){
            let tag = document.createElement('p');
            tag.setAttribute('class','tags');
            tag.innerHTML = myArr[i];
            tagdiv.appendChild(tag);
        }
        question.innerHTML = questions[curr];
        option1label.innerHTML = options1[curr];
        option2label.innerHTML = options2[curr];
        option3label.innerHTML = options3[curr];
        option4label.innerHTML = options4[curr];
        pointsDiv.innerHTML = "Points : "+points[curr];
    }
    return 'kaustubh';
}
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
async function submitTest(){
    let ansdiv = document.querySelector('input[name="option"]:checked');
        let ans = "0";
        if(ansdiv != null)
           ans = ansdiv.value;
    userResponses[curr] = parseInt(ans);
    let score = 0;
    for(let i=0;i<corrects.length;i++){
        if(corrects[i]==userResponses[i]){
            score+=points[i];
        }
    }
    myarr = {
        "score":score,
        "courseId": courseId 
    }
    await fetch('/saveResponse', {
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
            flg=false;
            testDiv.style.display = "none";
            var button = document.getElementById('startTest');
            button.disabled = true;
            var scrP = document.getElementById('score');
            scrP.innerHTML = "Score: "+score;
            mainDiv.style.display = "flex";
        } else {
            alert('Failed to save');
        }
    });

}
async function activateTimer(time){
    flg=true;
    var countDownDate = new Date(new Date().getTime() + time*60000);
    var x = setInterval(function() {
        if(!flg){
            clearInterval(x);
        }
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.getElementById("timelimit").innerHTML =  hours + ":"  + minutes + ":" + seconds;
        if (distance < 0) {
          clearInterval(x);
          submitTest();
          alert('Time Over');
        }
    }, 1000);
}