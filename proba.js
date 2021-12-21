var prikaz;
var button;
function incijalizacija(){
    prikaz = document.getElementById('prikaz');
    button = document.getElementById('btn-prikaz');
    button.addEventListener('click',read);


}
function read(){
    
    var http = new XMLHttpRequest();
    console.log(http);
    http.addEventListener('load',ucitan_zahtev);
    http.open('get','server.html',true);
    http.send();
}
function ucitan_zahtev(e){
    var data = e.target;// e predstavlja dogadjaj
    if(data.readyState = 4 && data.status == 200){
        var json = JSON.parse(data.responseText);
        for(i in json){
            console.log(j);
        }
    
    
    
}   
}

addEventListener('load',incijalizacija);