function Login(){
    var login = document.getElementById("login").value;
    var password = document.getElementById("password").value;
    const request = new XMLHttpRequest();
    const url = "http://localhost/Auth/LogIn";
    request.open("PUT", url, true);
    request.setRequestHeader("Content-type", "application/json");
    request.withCredentials = true;
    request.addEventListener("readystatechange",()=>{
     if(request.readyState == 4)
     {
        if(request.status == 200){
            window.location.replace("http://localhost/Main");
        }
        else if(request.status == 401) {
            alert("Неверно указан логин или пароль");
        }
    }
    });
    var data = JSON.stringify({"login":login,"password":password});
    request.send(data);
}

function Registration(){
 location.replace("http://localhost/Registration/");
}
