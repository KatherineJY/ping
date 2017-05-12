function addOnLoad( newFunction ){
    var oldOnLoad = window.onload;
    if ( typeof oldOnLoad == "function" ){
        window.onload = function(){
            oldOnLoad();
            newFunction();
        }
    }
    else {
        window.onload = newFunction;
    }
}

function setOnclick(){
    var foucus = document.querySelectorAll(".username-holder span");
    for( var item of foucus ){
        item.onclick = function(){
            var parentNode = this.parentNode.parentNode.parentNode;
            parentNode.style.display = 'none';
        }
    }
}

addOnLoad( setOnclick );