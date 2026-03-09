function askAI(){

const question = document.getElementById("aiInput").value

fetch("/ai",{

method:"POST",

headers:{'Content-Type':'application/json'},

body:JSON.stringify({

question:question

})

})

.then(res=>res.text())

.then(data=>{

document.getElementById("aiOutput").textContent = data

})

}