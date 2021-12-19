function displayD(){
    var d = document.getElementById("dialog");
    d.className="show";
}

function closeD(){
    var d = document.getElementById("dialog");
    d.className="hide";
}

function add(){
    var head = document.getElementById("task-header").value;
    var text = document.getElementById("task-text").value;
    var date = document.getElementById("end_date").value;

    const request = new XMLHttpRequest();
    const url = "http://localhost/Task/New";
    request.open("PUT", url, true);
    request.setRequestHeader("Content-type", "application/json");
    request.withCredentials = true;
    request.addEventListener("readystatechange",()=>{
     if(request.readyState == 4)
     {
        if(request.status == 200){
            Load("All");
        }
        else if(request.status == 401) {
            window.location.replace("http://localhost/login");
        }
    }
    });
    var data = JSON.stringify({"id":0,"header":head,"text":text,"status":false,"endDate": date});
    request.send(data);
}