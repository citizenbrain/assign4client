'use strict'

let url="https://assign4.butlerbrian.repl.co/api";


function deleteDoc(item) {

  let xhttp = new XMLHttpRequest();

  xhttp.onload=function(){
    console.log(this.responseText);
    if (this.status === 200)
    {
      document.getElementById("delResult").innerHTML = this.responseText;

      console.log("delete successfully");
    }
    else if (this.status === 204)
      console.log("ID doesn't exist");
    else
      console.log(this.status);
  }
  xhttp.open("DELETE", url+"/"+item, true);
  xhttp.send();
}


function getallDocs() {

  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    
    if (this.readyState === 4 && this.status === 200) {

     let thetable = document.getElementById("getAllID");
     let  jsobjs = JSON.parse(this.responseText);

      for(let i=0;i<jsobjs.length;i++)
      {
        let row = thetable.insertRow(-1);
        
        let cellid = row.insertCell(0);
        let cellname = row.insertCell(1);
        let cellyear = row.insertCell(2);
        let cellrating = row.insertCell(3);

        cellid.innerHTML = jsobjs[i].groceryID;
        cellname.innerHTML = jsobjs[i].foodItem;
        cellyear.innerHTML = jsobjs[i].numberItems;
        cellrating.innerHTML = jsobjs[i].itemPrice;
      }
    }
  };

  xhttp.open("GET", url, true);
  xhttp.send();
}


function getoneDoc(docId) {
  
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {

    if (this.readyState === 4 && this.status === 200) {
      let respo = JSON.parse(this.responseText);

      document.getElementById("getOneItem").innerHTML = respo["foodItem"];
      document.getElementById("getOneNum").innerHTML = respo["numberItems"];
      document.getElementById("getOnePrice").innerHTML = "$" + respo["itemPrice"];
      document.getElementById("resultGetOne").innerHTML = "Record found";
    }   else if (this.status === 404)
    {
        document.getElementById("resultGetOne").innerHTML = "Record NOT Found";
    }
     else 
    {
    document.getElementById("resultGetOne").innerHTML = this.status +","+ this.responseText;
    }
  }
  xhttp.open("GET", url+"/"+docId, true);
  xhttp.send();
}


function addoneDoc(grocItemAdd, grocPriceAdd, grocNumAdd)
{
  let xhttp = new XMLHttpRequest();

  xhttp.onload=function(){
    if (this.status === 200)
    {
      document.getElementById("resultAdd").innerHTML = this.responseText;
      console.log("insert done");
    } 
    else if (this.status === 400)
      document.getElementById("resultAdd").innerHTML = this.responseText;
    else
      document.getElementById("resultAdd").innerHTML = this.responseText;
  }
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  let data="grocName="+grocItemAdd+"&grocPrice="+grocPriceAdd+"&grocNum="+grocNumAdd;
  console.log(data);
  xhttp.send(data);
}

function updateoneDoc(grocId, grocItem, grocPrice, grocNum) {

  let xhttp = new XMLHttpRequest();

  xhttp.onload=function(){
    if (this.status === 200)
    {
      document.getElementById("resultUpdate").innerHTML = this.responseText;
    } 
    else
      document.getElementById("resultUpdate").innerHTML = this.status+", "+ this.responseText;
  }
  xhttp.open("PUT", url+"/"+grocId, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  let data = "grocName="+grocItem+"&grocPrice="+grocPrice+"&grocNum="+grocNum;
  console.log(data);
  xhttp.send(data);
}



