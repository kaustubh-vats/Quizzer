var questions = [];
var tLimit = 0;
var curr = 0;
var question, option1, option2, option3, option4, pointsDiv, tagdiv;
var flg;
var option1label, option2label, option3label, option4label;
var mainDiv, testDiv;
var courseId;
var nextbutton, prevbutton;
var elem = document.documentElement;
var warn = -1;
var speech = new SpeechSynthesisUtterance();
var camflg = true, nodeviceflg = true, scrflg = true;
window.speechSynthesis.onvoiceschanged = function () {
    let voices = window.speechSynthesis.getVoices();
    voices.forEach((voice, i) => {
        if (voice.name.includes("(Natural) - English (India)")) {
            speech.voice = voice;
            return;
        }
        else if (voice.name.includes("(Natural) - English (United States)")) {
            speech.voice = voice;
        }
        else if (voice.name.includes("English (India)")) {
            speech.voice = voice;
        }
    })
};
function cam() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        alert('Your Device is not having the minimum requirements to start the test');
        nodeviceflg = true;
    }
    else {
        nodeviceflg = false;
        navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(function (stream) {
            camflg = false;
            var video = document.querySelectorAll('video');
            if ("srcObject" in video[0]) {
                video[0].srcObject = stream;
            } else {
                video[0].src = window.URL.createObjectURL(stream);
            }
            if ("srcObject" in video[1]) {
                video[1].srcObject = stream;
            } else {
                video[1].src = window.URL.createObjectURL(stream);
            }
            video[0].onloadedmetadata = function (e) {
                video[0].play();
            };
            video[1].onloadedmetadata = function (e) {
                video[1].play();
            };
        }).catch(function (err) {
            camflg = true;
            alert('Please allow the webcam and microphone permissions to continue');
        });
    }
}
function myWarnings(params) {
    if (params != undefined && params != "") {
        warn = params;
        if (warn < 0) {
            document.getElementById("warnings").style.display = "none";
        }
    } else {
        document.getElementById("warnings").style.display = "none";
    }
    return 'kaustubh'
}
function myFunc(params) {
    cam();
    nextbutton = document.querySelector('#next');
    prevbutton = document.querySelector('#previous');
    if (params.length == 0) {
        var button = document.getElementById('startTest');
        button.disabled = true;
        alert('No question Found for this test');
    } else {
        questions = []
        for (let i = 0; i < params.length; i++) {
            myJSON = {
                "question": params[i]['question'],
                "options": {
                    "1": params[i]['option1'],
                    "2": params[i]['option2'],
                    "3": params[i]['option3'],
                    "4": params[i]['option4']
                },
                "points": params[i]['points'],
                "tags": params[i]['tags'],
                "response": 0,
                "id": params[i]['id']
            }
            questions.push(myJSON)
        }
    }
    return 'kaustubh';
}
function myTimeL(params) {
    if (params) {
        tLimit = Number(params);
    } else {
        document.getElementById("tlimit").innerHTML = "No TimeLimit";
    }
    return 'kaustubh';
}
function myScr(params) {
    if (params != -1) {
        var scrP = document.getElementById('score');
        scrP.innerHTML = "Score: " + params;
        alert('You have already submited this test');
        scrflg = true;
    } else {
        scrflg = false;
    }
    return 'kaustubh';
}
function myCourseId(params) {
    courseId = params;
    return 'kaustubh'
}
function startTest() {
    cam();
    if (nodeviceflg) {
        return;
    }
    if (camflg) {
        return;
    }
    if (scrflg) {
        alert('You have already submitted the test');
        return;
    }
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

    question.innerHTML = questions[curr]['question'];
    option1label.innerHTML = questions[curr]['options']["1"];
    option2label.innerHTML = questions[curr]['options']["2"];
    option3label.innerHTML = questions[curr]['options']["3"];
    option4label.innerHTML = questions[curr]['options']["4"];
    pointsDiv.innerHTML = "Points : " + questions[curr]['points'];
    removeAllChildNodes(tagdiv);

    let p = document.createElement('p');
    p.style.display = 'inline-block';
    p.innerHTML = "Tags : ";
    tagdiv.appendChild(p);

    const myArr = questions[curr]['tags'].split(" ");
    for (let i = 0; i < myArr.length; i++) {
        let tag = document.createElement('p');
        tag.setAttribute('class', 'tags');
        tag.innerHTML = myArr[i];
        tagdiv.appendChild(tag);
    }

    mainDiv = document.getElementById('main-basic');
    testDiv = document.getElementById('main-test');
    prevbutton.style.display = "none";
    if (questions.length <= 1) {
        nextbutton.style.display = "none";
    }
    mainDiv.style.display = "none";
    testDiv.style.display = "block";

    if (tLimit > 0) {
        activateTimer(tLimit);
    } else {
        document.getElementById("timelimit").innerHTML = "No Time Limit";
    }
    if (warn >= 0) {
        document.addEventListener("visibilitychange", warningGenerator);
    }
    openFullscreen();
}
function previous() {
    if (curr > 0) {
        nextbutton.style.display = "inline-block";
        let ansdiv = document.querySelector('input[name="option"]:checked');
        let ans = "0";
        if (ansdiv != null)
            ans = ansdiv.value;
        questions[curr]['response'] = parseInt(ans);
        curr--;
        if (curr == 0) {
            prevbutton.style.display = "none";
        } else {
            prevbutton.style.display = "inline-block";
        }
        if (questions[curr]['response'] != 0) {
            let selectedOption = document.getElementById('option' + questions[curr]['response']);
            selectedOption.checked = true;
        } else {
            let selectedOption = document.getElementById('option' + 1);
            selectedOption.checked = false;
            selectedOption = document.getElementById('option' + 2);
            selectedOption.checked = false;
            selectedOption = document.getElementById('option' + 3);
            selectedOption.checked = false;
            selectedOption = document.getElementById('option' + 4);
            selectedOption.checked = false;
        }
        removeAllChildNodes(tagdiv);

        let p = document.createElement('p');
        p.style.display = 'inline-block';
        p.innerHTML = "Tags : ";
        tagdiv.appendChild(p);

        const myArr = questions[curr]['tags'].split(" ");
        for (let i = 0; i < myArr.length; i++) {
            let tag = document.createElement('p');
            tag.setAttribute('class', 'tags');
            tag.innerHTML = myArr[i];
            tagdiv.appendChild(tag);
        }
        question.innerHTML = questions[curr]['question'];
        option1label.innerHTML = questions[curr]['options']["1"];
        option2label.innerHTML = questions[curr]['options']["2"];
        option3label.innerHTML = questions[curr]['options']["3"];
        option4label.innerHTML = questions[curr]['options']["4"];
        pointsDiv.innerHTML = "Points : " + questions[curr]['points'];
    }
    return 'kaustubh'
}
function nextQuest() {
    if (curr < questions.length - 1) {
        prevbutton.style.display = "inline-block";
        let ansdiv = document.querySelector('input[name="option"]:checked');
        let ans = "0";
        if (ansdiv != null)
            ans = ansdiv.value;
        questions[curr]['response'] = parseInt(ans);
        curr++;
        if (curr == questions.length - 1) {
            nextbutton.style.display = "none";
        } else {
            nextbutton.style.display = "inline-block";
        }
        if (questions[curr]['response'] != 0) {
            var selectedOption = document.getElementById('option' + questions[curr]['response']);
            selectedOption.checked = true;
        } else {
            let selectedOption = document.getElementById('option' + 1);
            selectedOption.checked = false;
            selectedOption = document.getElementById('option' + 2);
            selectedOption.checked = false;
            selectedOption = document.getElementById('option' + 3);
            selectedOption.checked = false;
            selectedOption = document.getElementById('option' + 4);
            selectedOption.checked = false;
        }
        removeAllChildNodes(tagdiv);

        let p = document.createElement('p');
        p.style.display = 'inline-block';
        p.innerHTML = "Tags : ";
        tagdiv.appendChild(p);

        const myArr = questions[curr]['tags'].split(" ");
        for (let i = 0; i < myArr.length; i++) {
            let tag = document.createElement('p');
            tag.setAttribute('class', 'tags');
            tag.innerHTML = myArr[i];
            tagdiv.appendChild(tag);
        }
        question.innerHTML = questions[curr]['question'];
        option1label.innerHTML = questions[curr]['options']["1"];
        option2label.innerHTML = questions[curr]['options']["2"];
        option3label.innerHTML = questions[curr]['options']["3"];
        option4label.innerHTML = questions[curr]['options']["4"];
        pointsDiv.innerHTML = "Points : " + questions[curr]['points'];
    }
    return 'kaustubh';
}
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
async function submitTest() {
    let ansdiv = document.querySelector('input[name="option"]:checked');
    let ans = "0";
    if (ansdiv != null)
        ans = ansdiv.value;
    questions[curr]['response'] = parseInt(ans);
    myRespArr = []
    for (let i = 0; i < questions.length; i++) {
        myTempArr = {
            "id": questions[i]['id'],
            "resp": questions[i]['response']
        }
        myRespArr.push(myTempArr)
    }
    myarr = {
        "resp": myRespArr,
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
        if (text['response'] == 'success') {
            flg = false;
            testDiv.style.display = "none";
            var button = document.getElementById('startTest');
            button.disabled = true;
            scrflg = true;
            var scrP = document.getElementById('score');
            scrP.innerHTML = "Score: " + text['score'];
            mainDiv.style.display = "flex";
            document.removeEventListener("visibilitychange", warningGenerator);
            closeFullscreen();
        } else {
            alert('Failed to save');
        }
    });

}
async function activateTimer(time) {
    flg = true;
    var countDownDate = new Date(new Date().getTime() + time * 60000);
    var x = setInterval(function () {
        if (!flg) {
            clearInterval(x);
        }
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        if (hours < 10) hours = "0" + hours;
        if (minutes < 10) minutes = "0" + minutes;
        if (seconds < 10) seconds = "0" + seconds;
        document.getElementById("timelimit").innerHTML = hours + ":" + minutes + ":" + seconds;
        if (distance < 0) {
            clearInterval(x);
            submitTest();
            alert('Time Over');
        }
        if (distance >= 59000 && distance <= 60000) {
            speech.text = "You have one minutes remaining";
            window.speechSynthesis.speak(speech);
        }
        else if (distance >= 299000 && distance <= 300000) {
            speech.text = "You have five minutes remaining";
            window.speechSynthesis.speak(speech);
        }
    }, 1000);
}

function warningGenerator() {
    if (document.visibilityState != "visible") {
        warn--;
        if (warn <= 0) {
            submitTest();
            speech.text = "You are regularily navigating out of the test. Despite our reminders. so, we have submitted your response";
            window.speechSynthesis.speak(speech);
            alert("You are navigating out of the test.. We have submitted your response");
        } else {
            speech.text = "Don't try to navigate out of the test, You have " + (warn - 1) + " warnings remaining";
            window.speechSynthesis.speak(speech);
            alert("Warning #" + (warn) + "\nYou are navigating out of the test " + (warn - 1) + " warnings left");
        }
    }
}

function openFullscreen() {
    var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);

    if (!isInFullScreen) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    }
}

function closeFullscreen() {
    var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);

    if (isInFullScreen) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }

}
