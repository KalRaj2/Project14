let editor
let currentFile=""

require.config({paths:{'vs':'https://unpkg.com/monaco-editor@0.34.1/min/vs'}})

require(['vs/editor/editor.main'],function(){

editor = monaco.editor.create(document.getElementById("editor"),{

value:"",

language:"javascript",

theme:"vs-dark"

})

})

function saveFile(){

fetch("/save",{

method:"POST",

headers:{'Content-Type':'application/json'},

body:JSON.stringify({

name:currentFile,

content:editor.getValue()

})

})
function openFileInTab(name){

currentFile = name

fetch("/open?name="+name)

.then(res=>res.text())

.then(data=>{

editor.setValue(data)

addTab(name)

})

}

}