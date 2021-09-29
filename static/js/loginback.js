function myFunc(vars){
    if(!(vars && Object.keys(vars).length === 0 && vars.constructor === Object)){
        var form = document.getElementById("form");
        var elem = document.createElement('p');
        elem.setAttribute('class','warning')
        elem.innerHTML = vars['error']
        form.appendChild(elem)
    }
    return vars;
}