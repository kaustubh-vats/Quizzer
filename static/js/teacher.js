function myFunc(param){
    var grid = document.querySelector('.grid');
    for(let i=0;i<param.length;i++){
        var anchor = document.createElement('a');
        anchor.setAttribute('href','\\addnew?course='+param[i]['id'])
        var card = document.createElement('div');
        card.setAttribute('class','coursecard')
        var img = document.createElement('img');
        img.setAttribute('src',"/static/imgs/courselogo.svg");
        img.setAttribute('class','card-img');
        img.setAttribute('alt','Couse Image failed to display');
        var title = document.createElement('p');
        title.innerHTML=param[i]['name'];
        title.setAttribute('class','course-name');
        var desc = document.createElement('p');
        desc.innerHTML=param[i]['description'];
        desc.setAttribute('class','course-desc');
        card.appendChild(img);
        card.appendChild(desc);
        card.appendChild(title);
        anchor.appendChild(card);
        grid.appendChild(anchor);
    }
    return 'kaustubh';
}
