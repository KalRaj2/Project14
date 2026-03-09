function runCode(){

fetch("/run",{

method:"POST",

headers:{'Content-Type':'application/json'},

body:JSON.stringify({

name:currentFile

})

})

.then(res=>res.text())

.then(output=>{

alert(output)

})

}