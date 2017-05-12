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

function createNumber(idx){
    var item = document.createElement("div");
    item.className = "time-choose";
    if( idx < 10 ) idx = '0'+idx;
    var p = document.createTextNode(idx);
    item.appendChild( p );
    return item;
}

function createChooseBoard(name,st,num){
    var current = document.getElementById(name);
    var chooseBoard = current.childNodes[3];
    for(var i=st;i<=num;i++){
        var item = createNumber(i);
        chooseBoard.appendChild( item );
    }
}

function createAllChooseBoard(){
    createChooseBoard("month",1,12);
    createChooseBoard("day",1,31);
    createChooseBoard("hour",0,24);
    createChooseBoard("minute",0,60);
}

function setOnClick(){
    var timeItems = document.querySelectorAll(".time-choose");
    for( var item of timeItems ){
        item.onclick = function(){
            var value = this.innerText;
            this.parentNode.parentNode.childNodes[1].innerHTML = value;            
        }
    }
}

function buildMap(){
    function G(id) {
        return document.getElementById(id);
    }

    var map = new BMap.Map("l-map");
    var myCity = new BMap.LocalCity();
    var cityname;
    myCity.get(mylocate);

    function mylocate(result) {
        map.centerAndZoom(result.center, 12);
        cityname = result.name;
    }

    var ac = new BMap.Autocomplete( 
    {
        "input": "suggestId1",
        "location": map
    });
    var ac2 = new BMap.Autocomplete( 
    {
        "input": "suggestId2",
        "location": map
    });

    function onhighlight_fun(e) {
        var str = "";
        var _value = e.fromitem.value;
        var value = "";
        if (e.fromitem.index > -1) {
            value = _value.province + _value.city + _value.district + _value.street + _value.business;
        }
        str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

        value = "";
        if (e.toitem.index > -1) {
            _value = e.toitem.value;
            value = _value.province + _value.city + _value.district + _value.street + _value.business;
        }
        str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
        G("searchResultPanel").innerHTML = str;
    }

    function onconfirm_fun(e) {
        var _value = e.item.value;
        myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
        G("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;

        setPlace();
    }

    ac.addEventListener("onhighlight", function (e) { onhighlight_fun(e); });
    ac2.addEventListener("onhighlight", function (e) { onhighlight_fun(e); });

    var myValue;
    ac.addEventListener("onconfirm", function (e) { onconfirm_fun(e); });
    ac2.addEventListener("onconfirm", function (e) { onconfirm_fun(e); });

    function setPlace() {
        map.clearOverlays(); //清除地图上所有覆盖物
        function myFun() {
            var pp = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
            map.centerAndZoom(pp, 18);
            map.addOverlay(new BMap.Marker(pp)); //添加标注
        }
        var local = new BMap.LocalSearch(map, { //智能搜索
            onSearchComplete: myFun
        });
        local.search(myValue);
    }
}

addOnLoad( createAllChooseBoard );
addOnLoad( setOnClick );
addOnLoad( buildMap );

