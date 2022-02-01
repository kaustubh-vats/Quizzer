var rank,username,points,container;
document.addEventListener('DOMContentLoaded',()=>{
    const grid = document.querySelector('.main-content');
    const footer = document.querySelector('footer');
    const header = document.querySelector('#header');
    if(grid != null){
        grid.style.minHeight = `calc(100vh - ${(footer.offsetHeight + header.offsetHeight)}px)`;
    }
});
function myFunc(params){
    var base = document.querySelector('.main-content');
    var warn = null;
    if(params.length == 0){
        if(warn != null){
            warn.style.display = "block";
        }
        warn= document.createElement('h1');
        warn.setAttribute('id','center-text');
        warn.innerHTML="No Results to Display";
        base.appendChild(warn);
    }
    else{
        if(warn!=null){
            warn.style.display = 'none';
        }
        for(let i=0;i<params.length;i++){
            container = document.createElement('div');
            container.setAttribute('class','display-data hover-class');
            rank = document.createElement('p');
            username = document.createElement('a');
            points = document.createElement('p');

            username.setAttribute('href','\\profile?username='+params[i]['username'])
            rank.setAttribute('class','rank');
            username.setAttribute('class','username');
            points.setAttribute('class','points');

            rank.innerHTML = params[i]['rank'];
            username.innerHTML = params[i]['username'];
            points.innerHTML = params[i]['points'];

            container.appendChild(rank);
            container.appendChild(username);
            container.appendChild(points);

            base.appendChild(container);
        }
    }
}