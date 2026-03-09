fetch("/files")
.then(res=>res.json())
.then(data=>{

const list = document.getElementById("filelist")

function render(items,parent){

items.forEach(item=>{

const li = document.createElement("li")

li.innerText = item.name

parent.appendChild(li)

if(item.type==="file"){

li.onclick = ()=>openFileInTab(item.name)

}

if(item.type==="folder"){

const ul = document.createElement("ul")

li.appendChild(ul)

render(item.children,ul)

}

})

}

render(data,list)

})