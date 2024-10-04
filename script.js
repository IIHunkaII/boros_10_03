const backendurl = "https://retoolapi.dev/SZwUUA/data";

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("get").addEventListener("click", async function(){
        await fetch(backendurl)
        .then(response => response.json())
        .then(data => insertData(data));
    });

    document.getElementById("update").addEventListener("click", async function(){
        // kiolvasssuk az urlap adatokat 
        let id = document.getElementById("id").value;
        let nev = document.getElementById("nev").value;
        let email = document.getElementById("email").value;
        let bool = document.getElementById("bool").checked;
 
        // osszeallitjuk a kuldendo objektumot
        let futar = {id:id, nev:nev, email:email, bool:bool};
        console.log(futar);
        // ha megvan osszeallitjuk az urlt
        let modositourl = backendurl + "/" + id;
        // beallitjuk az url-t 
        let myHeader = new Headers();
        
        // beallitjuk a fejlecet
        myHeader.append("Content-Type", "application/json");
        
        // elkuldjuk
        
        await fetch(modositourl, {
        
            method: "PUT",
            Headers: myHeader,
            body: JSON.stringify(futar)
        })
        // eredmenyrol visszajelzest adunk 
        if(response.ok){
            alert("Sikeres");
        }
        else{
            alert("Sikertelen");
        }
    })
});

function insertData(data){
    var htmlcontent = '';

    for (let i = 0; i < data.length; i++) {
        htmlcontent += `<div class="card m-4" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${data[i].nev}</h5>
          <h6 class="card-subtitle mb-2 text-body-secondary">${data[i].email}</h6>
          <p class="card-text">${data[i].bool}</p>
          <a class="btn btn-outline-warning" onclick="updateData(${data[i].id})">Update</a>
          <a class="btn btn-outline-danger">Delete</a>
        </div>
      </div>`;
    }
    document.getElementById("cardDiv").innerHTML = htmlcontent;
    }

async function updateData(id){
    await fetch(backendurl + "/" + id)
    .then(response => response.json())
    .then(data => {
        
        document.getElementById("id").value = data.id;
        document.getElementById("nev").value = data.nev;
        document.getElementById("email").value = data.email;
        document.getElementById("bool").checked = data.bool;
    })
}
