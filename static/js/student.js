function myFunc(param){
    var grid = document.querySelector('.grid');
    if(param.length==0){
        alert("No courses Found");
    } else {
        for(let i=0;i<param.length;i++){
            var anchor = document.createElement('a');
            anchor.setAttribute('href','\\startTest?course='+param[i]['id'])
            var card = document.createElement('div');
            card.setAttribute('class','coursecard')
            var img = document.createElement('img');
            img.setAttribute('src',"/static/imgs/courselogo.svg");
            img.setAttribute('class','card-img');
            img.setAttribute('alt','Couse Image failed to display');
            var title = document.createElement('p');
            title.innerHTML=param[i]['name'] + " by: " + param[i]['author'];;
            title.setAttribute('class','course-name');
            var desc = document.createElement('p');
            desc.innerHTML=param[i]['description']
            desc.setAttribute('class','course-desc');
            card.appendChild(img);
            card.appendChild(desc);
            card.appendChild(title);
            anchor.appendChild(card);
            grid.appendChild(anchor);
        }
    }
}