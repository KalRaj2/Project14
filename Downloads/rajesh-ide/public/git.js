function gitStatus(){

fetch("/git-status")

.then(res=>res.json())

.then(data=>{

document.getElementById("gitoutput").textContent =
JSON.stringify(data,null,2)

})

}

function gitCommit(){

const msg = document.getElementById("commitmsg").value

fetch("/git-commit",{

method:"POST",

headers:{'Content-Type':'application/json'},

body:JSON.stringify({

message:msg

})

})

.then(res=>res.text())

.then(data=>{

alert(data)

})

}