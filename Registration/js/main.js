function Registration(){
    var login = document.getElementById("login").value;
    var password = document.getElementById("password").value;
    var password2 = document.getElementById("password2").value;
    if(password==password2){
    const request = new XMLHttpRequest();
    const url = "http://localhost/Auth/Registration";
    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/json");
    request.withCredentials = true;
    request.addEventListener("readystatechange",()=>{
     if(request.readyState == 4)
     {
        if(request.status == 200){
            window.location.replace("http://localhost/Main");
        }
        else if(request.status == 409) {
            alert("Пользователь "+login+" существует");
        }
    }
    });
    var data = JSON.stringify({"login":login,"password":password});
    request.send(data);
    }
    else{
        alert("Пароли не совпадают");
    }
    
}

function toLogin(){
 location.replace("http://localhost/login/");
}
