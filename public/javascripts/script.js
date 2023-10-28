var socket = io();
var username = document.querySelector("#username");
let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".messageArea");
var usernameList = document.querySelector("#usernameList");
var onlineNum = document.querySelector(".onlineNum");
var userBox = document.querySelector(".userBox");
var peoples = document.querySelector(".peoples");

let name;
let user = ``;

do {
    name = prompt("Enter your name ....");
} while (!name);

username.innerText = name;

socket.emit("name", name);

textarea.addEventListener("keyup", e=>{
    if(e.key === 'Enter'){
        if(e.target.value.trim().length > 0){
            sendMessage(e.target.value);
            e.target.value = "";
        }
    }
})

function sendMessage(msg){
    let obj = {
        name : name,
        message : msg.trim()
    }
    
    appendMessage(obj , "outgoing");
    scrollToBottom();
    
    socket.emit("message", obj);
}

socket.on("message", data =>{
    appendMessage(data , "incoming");
    scrollToBottom();
})

function appendMessage(msg , type){
    let messageDiv = document.createElement("div");
    let className = type;
    messageDiv.classList.add(className, "message");
    
    let contents = `
        <h4>${msg.name}</h4>
        <p>${msg.message}</p>
        `
        
    messageDiv.innerHTML = contents;
    messageArea.appendChild(messageDiv);
}

socket.on("name", data=>{
    // console.log(data);
    user = "";
    data.forEach(elem => {
        user += `<li class="user"><a href="#"><h3>${elem}</h3></a></li>`;
    });
    usernameList.innerHTML = user;
    // console.log(user);
})

socket.on("online", data =>{
    // console.log(data);   
    onlineNum.innerText = data;
})


function userListHide(){
    let flag = 0;
    
    peoples.addEventListener("click",()=>{
        if(flag === 0){
            userBox.style.height = "0";
            userBox.style.padding = "0";
            document.querySelector("#arrow").style.rotate = "-90deg";
            flag = 1;
        }
        else{
            userBox.style.height = "92%";
            userBox.style.padding = "1vh 0";
            document.querySelector("#arrow").style.rotate = "0deg";
            flag = 0;
        }
    })
}

userListHide();

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight;
}