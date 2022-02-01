const navSlide = () =>{
    const burger = document.querySelector('.burger');  
    const nav = document.querySelectorAll('.nav-links li');
    const bar = document.querySelector('.nav-links');
    burger.addEventListener('click',()=>{
        bar.classList.toggle('nav-active');
        nav.forEach((link,index) => {
            if(link.style.animation){
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index/7 + 0.5}s`;
            }
        });
        burger.classList.toggle('toggle');
    });
}
const footerset = () =>{
    const grid = document.querySelector('.grid');
    const footer = document.querySelector('footer');
    const header = document.querySelector('#header');
    if(grid != null){
        grid.style.minHeight = `calc(100vh - ${(footer.offsetHeight + header.offsetHeight + 60)}px)`;
    }
}
navSlide();
footerset();