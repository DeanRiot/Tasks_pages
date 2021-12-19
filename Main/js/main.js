function toAll(){
    location.replace("http://localhost/AllTasks")
}

function addTask(to, task)
{
    var node = document.createElement("details");
    node.className = "task";
    var summary = document.createElement("summary");
    summary.innerText= task.header;
    var desc = document.createElement("p");
    desc.innerText = task.text;
    var endb = document.createElement("button");
    endb.setAttribute('onclick','SetStatus(value)');
    endb.innerText = "Завершить";
    endb.value = task.id;
    if(to.id == "today-tasks"){
        summary.className = "today-col"
    }
    else if(to.id == "old-tasks"){
        summary.className = "old-col";
    }
    else if(to.id == "actual-tasks"){
        summary.className = "actual-col";
    }
    else{
        summary.className = "ended-col";
        endb.setAttribute('onclick','DelTask(value)');
        endb.innerText = "Удалить";
    }
    node.appendChild(summary);
    node.appendChild(desc);
    node.appendChild(endb);
    to.appendChild(node);
}

function Load(){
    var today_tasks = document.getElementById("today-tasks");
    var old_tasks = document.getElementById("old-tasks");
    var actual_tasks = document.getElementById("actual-tasks");
    var ended_tasks = document.getElementById("ended-tasks");
    today_tasks.innerHTML = "";
    old_tasks.innerHTML = "";
    actual_tasks.innerHTML = "";
    ended_tasks.innerHTML = "";
    const request = new XMLHttpRequest();
    const url = "http://localhost/Task/Preview";
    request.open("GET", url, true);
    request.setRequestHeader("Content-type", "application/json");
    request.withCredentials = true;
    request.addEventListener("readystatechange",()=>{
     if(request.readyState == 4)
     {
        if(request.status == 200){
            data = JSON.parse(request.responseText);
            if(data.today.length==0){
                today_tasks.className ="tasks-container-hide";
            }
            else{
                data.today.forEach(today=>{
                    addTask(today_tasks,today);      
                }) 
            }
            if(data.old.length==0){
                old_tasks.className ="tasks-container-hide";
            }
            else{ data.old.forEach(old=>{
                addTask(old_tasks,old);
                })
            }
            if(data.process.length==0){
                actual_tasks.className = "tasks-container-hide";
            }
            else{
                data.process.forEach(proc=>{
                    addTask(actual_tasks,proc);
                    })
            }
            if(data.ended.length==0){
                ended_tasks.className = "tasks-container-hide";
            }
            else{
                data.ended.forEach(ended=>{
                    addTask(ended_tasks,ended); 
                    }) 
            }      
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
            Load();
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
            Load();
        }        
        else if(request.status == 401) location.replace("http://localhost/Login");
        }
    });
    request.send();
}