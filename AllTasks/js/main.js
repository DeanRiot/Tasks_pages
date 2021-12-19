function toHome(){
    location.replace("http://localhost/Main")
}

function addTask(to, task, type)
{
    var node = document.createElement("details");
    node.className = "task";
    var summary = document.createElement("summary");
    summary.innerText= task.header;
    var desc = document.createElement("p");
    desc.innerText = task.text;
    var endb = document.createElement("button");
    endb.value = task.id;
    if(!task.status)
    {
        if(type=="All") summary.className = "all-col";
        else if(type=="Today")summary.className = "today-col";
        else if(type=="Old")summary.className = "old-col"; 
        else if(type=="Actual")summary.className = "actual-col";
        endb.setAttribute('onclick','SetStatus(value)');
        endb.innerText = "Завершить";
    }
    else if(type=="Ended" || task.status)
    {
        summary.className = "ended-col";
        endb.setAttribute('onclick','DelTask(value)');
        endb.innerText = "Удалить";
    }
    node.appendChild(summary);
    node.appendChild(desc);
    node.appendChild(endb);
    to.appendChild(node);
}

function Load(type){
    var tasks_left = document.getElementById("col-l");
    var tasks_right = document.getElementById("col-r");
    tasks_left.innerHTML = "";
    tasks_right.innerHTML = "";

    const request = new XMLHttpRequest();
    const url = "http://localhost/Task/"+type;
    request.open("GET", url, true);
    request.setRequestHeader("Content-type", "application/json");
    request.withCredentials = true;
    request.addEventListener("readystatechange",()=>{
     if(request.readyState == 4)
     {
        if(request.status == 200){
            var counter = 0;
            data = JSON.parse(request.responseText);
                data.forEach(node=>{
                    if(counter%2==0){
                        addTask(tasks_left,node,type); 
                    }
                    else{
                        addTask(tasks_right,node,type); 
                    }
                    counter+=1;
                    }) 
        }
        else if(request.status == 401) location.replace("http://localhost/Login");      
    }
    });
    request.send();
}

function SetStatus(value){
    const request = new XMLHttpRequest();
    const url = "http://localhost/Task/Status?id="+value+"&status=true";
    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/json");
    request.withCredentials = true;
    request.addEventListener("readystatechange",()=>{
     if(request.readyState == 4)
     {
        if(request.status == 200){
            Load("Actual");
        }        
        else if(request.status == 401) location.replace("http://localhost/Login");
        }
    });
    request.send();
}

function DelTask(value){
    const request = new XMLHttpRequest();
    const url = "http://localhost/Task/"+value;
    request.open("DELETE", url, true);
    request.setRequestHeader("Content-type", "application/json");
    request.withCredentials = true;
    request.addEventListener("readystatechange",()=>{
     if(request.readyState == 4)
     {
        if(request.status == 200){
            Load("All");
        }        
        else if(request.status == 401) location.replace("http://localhost/Login");
        }
    });
    request.send();
}