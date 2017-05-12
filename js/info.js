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

function addFoucus(){
    var foucus = document.querySelectorAll(".username-holder span");
    for( var item of foucus ){
        item.onclick = function(){
            var parentNode = this.parentNode.parentNode.parentNode;
            if( parentNode.className == "info-box" ){
                parentNode.className = "info-box info-active";
                this.innerHTML = "取消关注";
            }
            else{
                parentNode.className = "info-box";
                this.innerHTML = "关注";
            }
        }
    }
}

function getHTTPObject() {
    if (typeof XMLHttpRequest == "undefined") {
        XMLHttpRequest = function () {
            try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); }
            catch (e) { }
            try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
            catch (e) { }
            try { return new ActiveXObject("Msxml2.XMLHTTP"); }
            catch (e) { }
            return false;
        }
    }
    return new XMLHttpRequest();
}

function getNewContent(curUrl, pos) {
    var request = getHTTPObject();
    if (request) {
        request.open("GET", curUrl, true);
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                var txt = request.responseText;
                var places = txt.split("|");
                var len = places.length;
                var posNode = document.getElementById(pos + "-all");
                while (posNode.hasChildNodes()) {
                    posNode.removeChild(posNode.firstChild);
                }
                for (i = 0; i < len; i++) {
                    var otherPlace = document.createElement("div");
                    otherPlace.className = "other-place";
                    var para = document.createElement("p");
                    para.innerHTML = places[i];
                    otherPlace.appendChild(para);
                    posNode.appendChild(otherPlace);
                }
                if (pos == "start_more") {
                    start_times += 1000;
                } else {
                    end_times += 1000;
                }
            }
        }
        request.setRequestHeader("Content-Type",
                     "application/x-www-form-urlencoded");
        request.send();
    }
}

function searchFurther(){
    var nearStart = document.getElementById("start-btn");
    var nearEnd = document.getElementById("end-btn");
    var count_start = 1;
    var count_end = 1;
    // start_x = document.getElementById("start_x").childNodes[0].data;
    // start_y = document.getElementById("start_y").childNodes[0].data;
    // end_x = document.getElementById("end_x").childNodes[0].data;
    // end_y = document.getElementById("end_y").childNodes[0].data;
    // date = document.getElementById("date").childNodes[0].data;
    // start_times = 1000;
    // end_times = 1000;

    // var url = "start_x=" + start_x + "&&start_y=" + start_y;
    // url = url + "&&end_x=" + end_x + "&&end_y=" + end_y;

    // nearStart.onclick = function () {
    //     var currentUrl = "SearchNearStartAdress?" + url + "&&scope=" + start_times + "&&date=" + date;
    //     getNewContent(currentUrl, "start_more");

    // }

    // nearEnd.onclick = function () {
    //     var currentUrl = "SearchNearEndAdress?" + url + "&&scope=" + end_times + "&&date=" + date;
    //     getNewContent(currentUrl, "end_more");
    // }
    nearStart.onclick = function(){
        var holder = nearStart.parentNode.parentNode;
        var distance = holder.querySelector(".distance span");
        count_start  = count_start + 1;
        distance.innerHTML = count_start;
        var place = holder.querySelectorAll(".place-item");
        place[0].innerHTML = '温江二中';
        place[1].innerHTML = '成都市第五人民医院';
        place[2].innerHTML = '成都中医药大学';
    }

    nearEnd.onclick = function(){
        var distance = nearStart.querySelector(".distance span");
        count_end  = count_end + 1;
        distance.innerHTML = count_end;
    }
}

addOnLoad( addFoucus );
addOnLoad( searchFurther );





