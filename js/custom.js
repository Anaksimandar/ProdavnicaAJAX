
let xttp = new XMLHttpRequest();
document.getElementById('myCart').innerHTML = getCookie('saved_items');
xttp.onreadystatechange = function(){
    if(this.status == 200 && this.readyState ==4){
        
        let obj = JSON.parse(this.responseText);
        
        var products = document.getElementById("products");
        var tekst = "";
        for(let i = 0;i < obj.length;i++){
            tekst += "<div class='col-4'>"+
                "<div class='card'>"+
                    "<img class = 'card-img' src ='"+obj[i].avatar+"'>"+
                    "<div class='card-body'>" +
                        "<h5 class = 'card-title text-center '>" + obj[i].product_name + "</h2>"+
                        "<p class='card-body'> "+"$"+ obj[i].product_price + "</p>"+
                        "<button onclick = 'addtochart(this)' data_product_id="+obj[i].id+" class= 'btn btn-primary m-4'"+">Add to Cart</button>"+
                        "<button onclick='seemore(this)' data_product_id="+obj[i].id+" class= 'btn btn-info'"+ "data-bs-toggle='modal' data-bs-target='#seeMoreModal'"+ ">See More</button>"+
                     "</div>"+
                "</div>"
            +"</div>";
        }
        products.innerHTML = tekst;
        
        
        
    }
}

xttp.open("get", url="https://60db3f05801dcb0017290ffe.mockapi.io/api/products",async="true");
xttp.send();
/*
Kreiranje obj xttp;
dodavanje dogadjaja onstatechange(aktivira se kad se pormeni atrbut xttp obj, readyState)
dodajemo prom obj vrednosti xttp atributa responseText


*/
function seemore(e){
    let id = e.getAttribute("data_product_id");
    
    let xttp = new XMLHttpRequest();

    xttp.onreadystatechange = function(){
        if(this.status == 200 && this.readyState ==4){
            let obj = JSON.parse(this.responseText);
            var telo = document.getElementById("modal-info");
           
            telo.innerHTML = "<p>Product name:"+obj.product_name+"</p>"+
            "<p>Product info:"+obj.product_info+"</p> <br>";
        
        
        }
    }
    xttp.open("get", url="https://60db3f05801dcb0017290ffe.mockapi.io/api/products/"+id,async="true");
    xttp.send();
    
}
var item_added = false;
var ukupno = 0;
function addtochart(e){
    
    let id = e.getAttribute("data_product_id");
    
    if(!item_added){
        document.getElementById("myCart").innerHTML +=
            "<div class='row'>"+
                "<div class='col-9'>Your card items:</div>"+
                "<div class='col-3'>Total:<span id='ukupno'>"+ukupno+"</span></div>"
                

            +"</div>";
            item_added = true;
            
            
    }

    //let xttp = new XMLHttpRequest();
    
    xttp.onreadystatechange = function(){
        if(this.status == 200 && this.readyState ==4){
            let obj = JSON.parse(this.responseText);
            var korpa = document.getElementById("myCart");
            
            korpa.innerHTML += "<div id='cart-id"+obj.id+"' class='row'>"+
                                    "<div class='col-4'>"+ obj.product_name+"</div>"+
                                    "<div class='col-3'>"+ obj.product_price+"</div>"+
                                    "<div class='col-2'>"+ obj.product_info+"</div>"+
                                    "<div class='col-2'>"+"<button onclick='remove_cart(this)' data-product_price = '"+obj.product_price+"' data-product_id = '"+obj.id+"'"+" class='btn btn-danger'>Remove</button>"+"</div>"

                                +"</div>"
            ukupno += parseFloat(obj.product_price);
            document.getElementById('ukupno').innerHTML = ukupno;
            console.log(ukupno);
            setCookie('saved_items',document.getElementById('myCart').innerHTML,5);

        }
    }
    xttp.open("get", url="https://60db3f05801dcb0017290ffe.mockapi.io/api/products/"+id,async="true");
    xttp.send();
}
function remove_cart(e){
    let product_id = e.getAttribute('data-product_id');
    let product_price = e.getAttribute('data-product_price');
    document.getElementById('cart-id'+product_id).remove();
    var proizvod_cena = e.getAttribute('data-product_price');
    ukupno = parseFloat(document.getElementById('ukupno').innerText)-proizvod_cena;
    document.getElementById('ukupno').innerHTML = ukupno;
    setCookie('saved_items',document.getElementById('myCart').innerHTML,5);



    
    
}
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }